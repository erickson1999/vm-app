import { NextApiRequest, NextApiResponse } from 'next';
import {
	ModelCargaPlan,
	ModelCargaPlanT,
	ModelCiclo,
	ModelDocente,
	ModelEscuela,
	ModelFacultad,
	ModelGrupo,
	ModelModalidad,
	ModelPeriodo,
	ModelSucursal,
	ModelVinculacion,
} from '../../../../models';
import cookie from 'cookie';
import { jwt } from '../../../../utils';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	const cookies = cookie.parse(req.headers.cookie!);
	const payload = await jwt.verify(cookies['x-access-token']);
	switch (method) {
		case 'GET':
			try {
				if (payload.rol.nombre === 'admin') {
					const cargaPlanes = await ModelCargaPlan.findAll({
						include: [
							{ model: ModelCiclo },
							{ model: ModelGrupo },
							{ model: ModelDocente },
							{ model: ModelModalidad },
							{ model: ModelPeriodo },
							{ model: ModelSucursal },
							{ model: ModelEscuela },
							{ model: ModelFacultad },
							{ model: ModelVinculacion },
						],
					});
					return res.status(200).json(cargaPlanes);
				} else {
					const cargaPlanes = await ModelCargaPlan.findAll({
						where: { id_persona: payload.user.id_persona },
						include: [
							{ model: ModelCiclo },
							{ model: ModelGrupo },
							{ model: ModelDocente },
							{ model: ModelModalidad },
							{ model: ModelPeriodo },
							{ model: ModelSucursal },
							{ model: ModelEscuela },
							{ model: ModelFacultad },
							{ model: ModelVinculacion },
						],
					});
					return res.status(200).json(cargaPlanes);
				}
			} catch (error) {
				console.log('🚀 ~ file: index.ts ~ line 36 ~ error', error);
				return res.status(500).json({ message: error });
			}
		case 'POST':
			try {
				const {
					id_persona,
					id_periodo,
					id_modalidad,
					id_plan,
					id_ciclo,
					id_grupo,
					estado,
					fecha_inicio,
					fecha_fin,
					horas,
					tolerancia,
					id_escuela,
					id_sucursal,
					id_facultad,
					id_vinculacion,
				} = req.body;
				const cargaPlan = await ModelCargaPlan.create({
					id_persona,
					id_periodo,
					id_modalidad,
					id_plan,
					id_ciclo,
					id_grupo,
					estado,
					fecha_inicio,
					fecha_fin,
					horas,
					tolerancia,
					id_escuela,
					id_facultad,
					id_sucursal,
					id_vinculacion,
				});
				const cargaPlanJSON: ModelCargaPlanT = cargaPlan.toJSON();
				const newCargaPlan = await ModelCargaPlan.findOne({
					where: { id_carga_plan: cargaPlanJSON.id_carga_plan },
					include: [
						{ model: ModelCiclo },
						{ model: ModelGrupo },
						{ model: ModelDocente },
						{ model: ModelModalidad },
						{ model: ModelPeriodo },
						{ model: ModelSucursal },
						{ model: ModelEscuela },
						{ model: ModelFacultad },
						{ model: ModelVinculacion },
					],
				});

				return res.status(200).json(newCargaPlan);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
