import { NextApiRequest } from 'next';
import cookie from 'cookie';
import { jwt } from './jwt';
import {
	ModelPersona_rol,
	ModelPersona_rolT,
	ModelRol,
	ModelRolT,
} from '../models';

export const getRol = async (req: NextApiRequest) => {
	const cookies = cookie.parse(req.headers.cookie!);
	const token = cookies['x-access-token'];
	const payload = await jwt.verify(token, process.env.TOKEN_SECRET!);
	const { id } = payload;
	const personaRol = await ModelPersona_rol.findOne({
		where: { id_persona: id },
	});

	if (!personaRol) {
		return;
	}
	const personaRolJSON: ModelPersona_rolT = personaRol.toJSON();
	const rol = await ModelRol.findByPk(personaRolJSON.id_rol);
	if (!rol) {
		return;
	}
	const rolJSON: ModelRolT = rol.toJSON();
	console.log({ rolJSON: rolJSON.nombre });
};
