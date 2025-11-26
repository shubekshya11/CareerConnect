import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import pg from "./db";

const ADMIN_ACCESS_TOKEN_SECRET = process.env.NEXT_ADMIN_ACCESS_TOKEN_SECRET;

export function generateAdminAccessToken(admin) {
	return jwt.sign(
		{ id: admin.id, username: admin.username, role: 'admin' },
		ADMIN_ACCESS_TOKEN_SECRET,
		{ expiresIn: '1d' }
	);
}

export async function generateAdminRefreshToken(admin) {
	const refreshToken = uuidv4();
	// Store refresh token in DB with admin reference
	const existing = await pg("refresh_tokens").where({ user_id: admin.id }).first();
	if (existing) {
		await pg("refresh_tokens")
			.where({ user_id: admin.id })
			.update({
				token: refreshToken,
				expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
			});
	} else {
		await pg("refresh_tokens").insert({
			user_id: admin.id,
			token: refreshToken,
			expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
		});
	}
	return refreshToken;
}

export async function verifyAdminRefreshToken(token) {
	if (!token) {
		return null;
	}
	const record = await pg("refresh_tokens").where({ token }).first();

	if (!record || new Date(record.expires_at) < new Date()) {
		return null;
	}
	return record.user_id;
}

