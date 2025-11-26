import { verifyJWT, extractBearerToken, extractTokenFromCookie } from './jwt.js';

/**
 * Extracts and verifies user authentication from request
 * @param {Request} req - The request object
 * @returns {Promise<Object|null>} - The authenticated user or null
 */
export async function getUserFromRequest(req) {
  try {
    const secret = process.env.NEXT_ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error('NEXT_ACCESS_TOKEN_SECRET is not defined');
      return null;
    }

    // Try Bearer token first (for API requests)
    const bearerToken = extractBearerToken(req);
    if (bearerToken) {
      const decoded = await verifyJWT(bearerToken, secret);
      return decoded;
    }
    
    // Fall back to cookie token (for page navigation)
    const cookieToken = extractTokenFromCookie(req);
    if (cookieToken) {
      const decoded = await verifyJWT(cookieToken, secret);
      return decoded;
    }
    
    return null;
  } catch (error) {
    console.error('User authentication error in middleware:', error.message);
    return null;
  }
}

// Admin-specific check using adminAccessToken cookie
export async function getAdminFromRequest(request) {
    try {
      const token = extractTokenFromCookie(request, 'adminAccessToken');
      if (!token) return null;
      const secret = process.env.NEXT_ADMIN_ACCESS_TOKEN_SECRET;
      if (!secret) {
        console.error('NEXT_ADMIN_ACCESS_TOKEN_SECRET is not defined');
        return null;
      }
      const decoded = await verifyJWT(token, secret);
      // Basic sanity: ensure role is admin
      if (decoded && decoded.role === 'admin') return decoded;
      return null;
    } catch (err) {
      // Token invalid/expired or other error
      return null;
    }
  }