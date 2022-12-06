import { NextApiResponse } from 'next';

import bcrypt from 'bcrypt';
import { sign } from '../../../utils';
import { serialize } from 'cookie';
import {
	ModelPersona,
	ModelPersonaT,
	ModelPersona_rol,
	ModelPersona_rolT,
	ModelRol,
	ModelUsuario,
	ModelUsuarioT,
} from '../../../models';

type ResponseApi = {
	ok: boolean;
	message: string;
	data?: ModelPersonaT[];
};

export const controllerAuthLogin = async (
	res: NextApiResponse<ResponseApi>,
	body: ModelUsuarioT
) => {
	if (!process.env.TOKEN_SECRET) {
		throw new Error(
			'el TOKEN_SECRET no existe en el archivo .env, agregue uno'
		);
	}
	try {
		const user = await ModelUsuario.findOne({
			where: { usuario: body.usuario },
		});

		if (!user) {
			return res
				.status(404)
				.json({ ok: false, message: 'el usuario no existe' });
		}
		const userJSON: ModelUsuarioT = user.toJSON();
		const person = await ModelPersona.findByPk(userJSON.id_persona);
		if (!person) {
			return res
				.status(404)
				.json({ ok: false, message: 'la persona no existe' });
		}
		const personJSON: ModelPersonaT = person.toJSON();

		const match = await bcrypt.compare(body.password, userJSON.password);

		if (!match) {
			return res.status(400).json({
				ok: false,
				message: 'el usuario o la contraseña es incorrecta',
			});
		}
		//get rol
		const personaRol = await ModelPersona_rol.findOne({
			where: { id_persona: personJSON.id_persona },
		});
		if (!personaRol) {
			return res
				.status(404)
				.json({ ok: false, message: 'la persona no tiene un rol' });
		}
		const personaRolJSON: ModelPersona_rolT = personaRol.toJSON();
		const rol = await ModelRol.findByPk(personaRolJSON.id_rol);
		if (!rol) {
			return res.status(404).json({ ok: false, message: 'el rol no existe' });
		}
		const token = await sign({ user:personJSON, rol }, process.env.TOKEN_SECRET, {
			expiresIn: 86400,
		});
		const serialized = serialize('x-access-token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 86400,
			path: '/',
		});
		res.setHeader('Set-Cookie', serialized);
		res.json({	
			ok: true,
			message: 'inicio de sesión éxitoso',
			data: [personJSON],
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			ok: false,
			message: 'ocurrio un error inesperado, inténtelo nuevamente',
		});
	}
};
