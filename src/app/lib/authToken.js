import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import pg from "./db";

const ACCESS_TOKEN_SECRET = process.env.NEXT_ACCESS_TOKEN_SECRET;

export function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
}

export async function generateRefreshToken(user) {
  const refreshToken = uuidv4();
  // Store refresh token in DB with user reference
  const existing = await pg("refresh_tokens").where({ user_id: user.id }).first();
  if (existing) {
    await pg("refresh_tokens")
      .where({ user_id: user.id })
      .update({
        token: refreshToken,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });
  } else {
    await pg("refresh_tokens").insert({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  }
  return refreshToken;
}

export async function verifyRefreshToken(token) {
    if (!token) {
    return null; 
  }
  const record = await pg("refresh_tokens").where({ token }).first();

  if (!record || new Date(record.expires_at) < new Date()) {
    return null;
  }
  return record.user_id;
}