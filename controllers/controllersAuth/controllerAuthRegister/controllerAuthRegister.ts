import {
	ModelPersona,
	ModelPersonaT,
	ModelUsuario,
	ModelUsuarioT,
} from '../../../models';
import jwt from 'jsonwebtoken';
import { NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

const bcryptConfig = {
	rounds: 10,
};

if (!process.env.TOKEN_SECRET) {
	throw new Error('agregar el TOKEN_SECRET en el archivo .env');
}
const jwtConfig = {
	salt: 10,
	expiresIn: 86400,
	secret: process.env.TOKEN_SECRET,
};
const messages = {
	errorRegister: 'ocurrio un error al registrar un nuevo usuario',
	successRegister: 'usuario registrado correctamente',
};
type ResponseApi =
	| {
			ok: boolean;
			message: string;
	  }
	| { ok: boolean; message: string; data: ModelPersonaT[]; token: string };

export const controllerAuthRegister = async (
	res: NextApiResponse<ResponseApi>,
	body: ModelPersonaT & ModelUsuarioT
) => {
	return ModelPersona.create({
		apmaterno: body.apmaterno,
		appaterno: body.appaterno,
		correo: body.correo,
		direccion: body.correo,
		dni: body.dni,
		fecha_registro: new Date(),
		nombre: body.nombre,
		numero: body.numero,
	})
		.then((newPerson: ModelPersona) => {
			const newPersonJSON: ModelPersonaT = newPerson.toJSON();
			const {
				id_persona,
				nombre,
				appaterno,
				apmaterno,
				dni,
				direccion,
				correo,
				numero,
				fecha_registro,
			} = newPersonJSON;
			bcrypt.hash(body.password, bcryptConfig.rounds, (err, hash) => {
				if (err) {
					return res.json({ ok: false, message: messages.errorRegister });
				}
				ModelUsuario.create({
					id_persona: newPersonJSON.id_persona,
					usuario: body.usuario,
					password: hash,
				})
					.then(() => {
						return res.json({
							ok: true,
							message: messages.successRegister,
							data: [
								{
									id_persona,
									nombre,
									appaterno,
									apmaterno,
									dni,
									direccion,
									correo,
									numero,
									fecha_registro,
								},
							],
						});
					})
					.catch((err) => {
						console.error(err);
						return res.json({
							ok: false,
							message: messages.errorRegister,
						});
					});
			});
		})
		.catch((err) => {
			return res.status(500).json({
				ok: false,
				message: err.message || messages.errorRegister,
			});
		});
};
