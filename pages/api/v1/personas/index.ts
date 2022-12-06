import { NextApiRequest, NextApiResponse } from 'next';
import {
	ModelDocente,
	ModelParticipante,
	ModelPersona,
	ModelPersonaT,
} from '../../../../models';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const personas = await ModelPersona.findAll();
				return res.status(200).json(personas);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ message: error });
			}
		case 'POST':
			try {
				const {
					id_persona,
					nombre,
					appaterno,
					apmaterno,
					dni,
					direccion,
					correo,
					numero,
					rol,
				} = req.body;
				await ModelPersona.create({
					id_persona,
					nombre,
					appaterno,
					apmaterno,
					dni,
					direccion,
					correo,
					numero,
					fecha_registro: new Date(),
					rol,
				}).then((newPersona) => {
					const newPersonaJSON: ModelPersonaT = newPersona.toJSON();
					const nombre_completo = `${newPersonaJSON.nombre} ${newPersonaJSON.appaterno} ${newPersonaJSON.apmaterno}`;
					if (rol === 'estudiante') {
						ModelParticipante.create({
							nombre_completo,
							id_persona: newPersonaJSON.id_persona,
							horas_total: 0,
						});
						return res.status(200).json(newPersona);
					}
					if (rol === 'docente') {
						ModelDocente.create({
							nombre_completo,
							id_persona: newPersonaJSON.id_persona!,
						});
						return res.status(200).json(newPersona);
					}
				});
			} catch (error) {
				console.error(error);
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
