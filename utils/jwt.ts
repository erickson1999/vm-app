import { SignJWT, jwtVerify } from 'jose';
import { ModelPersonaT, ModelRolT } from '../models';

const SECRET = process.env.TOKEN_SECRET;

export async function sign(
	payload: Object,
	secret = SECRET,
	config = { expiresIn: 86400 }
): Promise<string> {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + config.expiresIn;
	return new SignJWT({ ...payload })
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(secret));
}

type JWTPayloadT = {
	user: ModelPersonaT;
	rol: ModelRolT;
	iat: number;
	exp: number;
};

export async function verify(
	token: string,
	secret = SECRET
): Promise<JWTPayloadT> {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
	// run some checks on the returned payload, perhaps you expect some specific values

	// if its all good, return it, or perhaps just return a boolean
	return payload as JWTPayloadT;
}
export const jwt = { sign, verify };
