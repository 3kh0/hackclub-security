import jwt from 'jsonwebtoken';
import { pg } from '~/server/utils/db';

export default defineEventHandler(async (event) => {
  // Authenticate user
  const authToken = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '');
  
  if (!authToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    });
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET!) as any;
    
    // Check if user has access to reports (admin/security team)
    const user = await pg.query(
      'SELECT id, email, role FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (!user.rows.length || !['admin', 'security'].includes(user.rows[0].role)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Insufficient permissions'
      });
    }

    // Get query parameters for filtering/pagination
    const query = getQuery(event);
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 20;
    const offset = (page - 1) * limit;
    const status = query.status as string;
    const severity = query.severity as string;

    let whereClause = '';
    const params: any[] = [];
    let paramCount = 0;

    if (status) {
      whereClause += ` WHERE status = $${++paramCount}`;
      params.push(status);
    }

    if (severity) {
      whereClause += `${whereClause ? ' AND' : ' WHERE'} severity = $${++paramCount}`;
      params.push(severity);
    }

    // Get reports with pagination
    const reports = await pg.query(
      `SELECT id, title, description, severity, status, submitted_at, email, payout_amount, updated_at
       FROM reports${whereClause} 
       ORDER BY submitted_at DESC 
       LIMIT $${++paramCount} OFFSET $${++paramCount}`,
      [...params, limit, offset]
    );

    // Get total count for pagination
    const countResult = await pg.query(
      `SELECT COUNT(*) FROM reports${whereClause}`,
      params
    );

    return {
      reports: reports.rows,
      pagination: {
        page,
        limit,
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
      }
    };
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }
    throw error;
  }
});
