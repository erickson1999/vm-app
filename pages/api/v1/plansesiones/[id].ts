import { NextApiRequest, NextApiResponse } from 'next';
import { ModelPlan_sesion, ModelPlan_sesionT } from '../../../../models';
import moment from 'moment';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	moment.locale('es');
	switch (method) {
		case 'GET':
			try {
				const id_carga_plan = [req.query.id];
				const planesSesiones = await ModelPlan_sesion.findAll({
					where: { id_carga_plan },
				});
				const planesSesionesJSON: ModelPlan_sesionT[] = planesSesiones.map(
					(planSesion) => {
						const planSesionJSON: ModelPlan_sesionT = planSesion.toJSON();
						planSesionJSON.fecha_sesion_pretty = moment(
							planSesionJSON.fecha_sesion
						)
							.zone('-05:00')
							.format('lll')
							.toString();
						planSesionJSON.fin_sesion_pretty = moment(planSesionJSON.fin_sesion)
							.zone('-05:00')
							.format('lll')
							.toString();
						return planSesionJSON;
					}
				);

				return res.status(200).json(planesSesionesJSON);
			} catch (error) {
				console.log({ error });
				return res.status(500).json({ message: error });
			}
		case 'PUT':
			try {
				const id_plan_sesion = [req.query.id];
				const {
					id_carga_plan,
					detalle,
					fecha_sesion,
					fin_sesion,
					horas,
					evidencia,
					tolerancia_fecha_sesion,
					tolerancia_fin_sesion,
				} = req.body;
				const newPlanSesion = await ModelPlan_sesion.update(
					{
						id_carga_plan,
						detalle,
						fecha_sesion,
						fin_sesion,
						horas,
						evidencia,
						tolerancia_fecha_sesion,
						tolerancia_fin_sesion,
					},
					{ where: { id_plan_sesion } }
				);
				const planSesion = await ModelPlan_sesion.findOne({
					where: { id_plan_sesion },
				});
				const planSesionJSON: ModelPlan_sesionT = planSesion!.toJSON();
				planSesionJSON.fecha_sesion_pretty = moment(planSesionJSON.fecha_sesion)
					.zone('-05:00')
					.format('lll')
					.toString();
				planSesionJSON.fin_sesion_pretty = moment(planSesionJSON.fin_sesion)
					.zone('-05:00')
					.format('lll')
					.toString();
				return res.status(200).json(planSesionJSON);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ message: error });
			}
		case 'DELETE':
			try {
				const id_plan_sesion = [req.query.id];
				await ModelPlan_sesion.destroy({
					where: {
						id_plan_sesion,
					},
				});
				return res.send(200);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
