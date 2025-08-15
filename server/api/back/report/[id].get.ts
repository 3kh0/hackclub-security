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
    
    // Check if user has access to reports
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

    const reportId = getRouterParam(event, 'id');
    
    // Get full report details
    const result = await pg.query(
      `SELECT r.*, 
              array_agg(
                json_build_object(
                  'id', a.id,
                  'action_type', a.action_type,
                  'details', a.details,
                  'created_at', a.created_at,
                  'created_by', u.email
                )
              ) FILTER (WHERE a.id IS NOT NULL) as actions
       FROM reports r
       LEFT JOIN report_actions a ON r.id = a.report_id
       LEFT JOIN users u ON a.created_by = u.id
       WHERE r.id = $1
       GROUP BY r.id`,
      [reportId]
    );

    if (!result.rows.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Report not found'
      });
    }

    return {
      report: result.rows[0]
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
