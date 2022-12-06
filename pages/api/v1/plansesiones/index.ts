import { NextApiRequest, NextApiResponse } from 'next';
import { ModelPlan_sesion } from '../../../../models';
import moment from "moment"
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const plan_sesion = await ModelPlan_sesion.findAll();
				return res.status(200).json(plan_sesion);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'POST':
			try {
				const { id_carga_plan, detalle, fecha_sesion, fin_sesion, evidencia } =
					req.body;
				const newPlanSesion = await ModelPlan_sesion.create({
					id_carga_plan,
					detalle,
					fecha_sesion,
					fin_sesion,
					evidencia,
				});
				const newPlanSesionJSON = newPlanSesion.toJSON();
				newPlanSesionJSON.fecha_sesion_pretty = moment(
					newPlanSesionJSON.fecha_sesion
				)
					.zone('-05:00')
					.format('lll')
					.toString();
				newPlanSesionJSON.fin_sesion_pretty = moment(newPlanSesionJSON.fin_sesion)
					.zone('-05:00')
					.format('lll')
					.toString();

				return res.status(200).json(newPlanSesionJSON); //
			} catch (error) {
				console.log(error);
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
