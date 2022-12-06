import { ModelPersona_rol, ModelRol } from '../models';

const getRoles = async (idPersona: number) => {
	const rolRaw = await ModelPersona_rol.findOne({
		where: { id_persona: idPersona },
		include: ModelRol,
	});
	return rolRaw?.toJSON();
};
