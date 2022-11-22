// middleware.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	//types
	type PayloadT = {
		id: string;
		iat: number;
		exp: number;
		nbf: number;
	};
	//declarations
	const { method } = request;
	const errors = {
		noToken: {
			message: 'No se envió un token',
			status: 400,
		},
		invalidToken: {
			message: 'token inválido',
			status: 400,
		},
		noMethod: {
			message: 'no se envió un método',
			status: 400,
		},
		forbidden: {
			message: 'no estás autorizado',
			status: 403,
		},
	};
	//functions
	async function verify(token: string, secret: string): Promise<PayloadT> {
		const { payload } = await jwtVerify(
			token,
			new TextEncoder().encode(secret)
		);
		console.log({ payloadVerify: payload });
		return payload as PayloadT;
	}
	function error(message: string, status: string | number) {
		const url = request.nextUrl.clone();
		url.pathname = '/api/v1/error';
		url.search = `?message=${message}&status=${status.toString()}`;
		return url;
	}
	function startsWith(url: string): boolean {
		return request.nextUrl.pathname.startsWith(url);
	}

	if (!method) {
		const url = request.nextUrl.clone();
		url.pathname = '/api/v1/error';
		url.search = `?message=${errors.noMethod.message}&status=${errors.noMethod.status}`;
		return NextResponse.rewrite(url);
	}
	if (startsWith('/api/v1/auth/login')) {
		return NextResponse.next();
	}
	if (startsWith('/api/v1/auth/register')) {
		return NextResponse.next();
	}

	// validations anythings  enviroment variables
	try {
		const TOKEN_SECRET = process.env.TOKEN_SECRET;
		if (!TOKEN_SECRET) {
			throw new Error('No existe la variale TOKEN_SECRET en el archivo.env');
		}
		const token = request.cookies.get('x-access-token');
		if (!token) {
			const url = error(errors.noToken.message, errors.noToken.status);
			return NextResponse.rewrite(url);
		}
		await verify(token, process.env.TOKEN_SECRET!);
	} catch (error) {
		console.error(error);
		const url = request.nextUrl.clone();
		url.pathname = '/api/v1/error';
		url.search = `?message=${errors.forbidden.message}&${errors.forbidden.status}`;
		return NextResponse.rewrite(url);
	}
}

export const config = {
	matcher: ['/api/v1/:path*'],
};
