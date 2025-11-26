/**
 * JWT utilities for Edge Runtime compatibility
 * Uses Web Crypto API for JWT verification
 */

/**
 * Verifies a JWT token using Web Crypto API (Edge Runtime compatible)
 * @param {string} token - The JWT token to verify
 * @param {string} secret - The secret key for verification
 * @returns {Promise<Object|null>} - The decoded payload or null if invalid
 */
export async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [headerB64, payloadB64, signatureB64] = parts;
    
    // Decode header and payload
    const header = JSON.parse(atob(headerB64.replace(/-/g, '+').replace(/_/g, '/')));
    const payload = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    
    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    // Verify signature using Web Crypto API
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const secretKey = encoder.encode(secret);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secretKey,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Decode signature from base64url
    const signature = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')), 
      c => c.charCodeAt(0)
    );
    
    const isValid = await crypto.subtle.verify('HMAC', cryptoKey, signature, data);
    
    return isValid ? payload : null;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

/**
 * Extracts JWT token from Authorization header
 * @param {Request} req - The request object
 * @returns {string|null} - The extracted token or null
 */
export function extractBearerToken(req) {
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

/**
 * Extracts JWT token from cookies
 * @param {Request} req - The request object
 * @param {string} cookieName - The name of the cookie containing the token
 * @returns {string|null} - The extracted token or null
 */
export function extractTokenFromCookie(req, cookieName = 'accessToken') {
  const cookies = req.headers.get('cookie');
  if (!cookies) return null;

  const tokenCookie = cookies
    .split('; ')
    .find(row => row.startsWith(`${cookieName}=`));
  
  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }
  
  return null;
}