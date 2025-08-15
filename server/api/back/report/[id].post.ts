import jwt from 'jsonwebtoken';
import { pg } from '~/server/utils/db';
import { email } from '~/server/utils/email';

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
    const body = await readBody(event);
    const { action_type, details } = body;

    if (!action_type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Action type is required'
      });
    }

    // Start transaction
    await pg.query('BEGIN');

    try {
      // Insert the action
      await pg.query(
        'INSERT INTO report_actions (report_id, action_type, details, created_by) VALUES ($1, $2, $3, $4)',
        [reportId, action_type, details, decoded.userId]
      );

      // Handle specific action types
      switch (action_type) {
        case 'status_change':
          await pg.query(
            'UPDATE reports SET status = $1, updated_at = NOW() WHERE id = $2',
            [details.new_status, reportId]
          );
          break;

        case 'payout_set':
          await pg.query(
            'UPDATE reports SET payout_amount = $1, updated_at = NOW() WHERE id = $2',
            [details.amount, reportId]
          );
          break;

        case 'email_sent':
          // Get report email and send the email
          const report = await pg.query('SELECT email FROM reports WHERE id = $1', [reportId]);
          if (report.rows.length) {
            await email(report.rows[0].email, details.email_content);
          }
          break;

        case 'severity_change':
          await pg.query(
            'UPDATE reports SET severity = $1, updated_at = NOW() WHERE id = $2',
            [details.new_severity, reportId]
          );
          break;
      }

      // Commit transaction
      await pg.query('COMMIT');

      return {
        success: true,
        action_type,
        message: 'Action completed successfully'
      };
    } catch (error) {
      await pg.query('ROLLBACK');
      throw error;
    }
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
