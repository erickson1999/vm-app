import { NextApiRequest, NextApiResponse } from 'next';
import {
	ModelParticipante,
	ModelPersona,
	ModelPlan_participante,
	ModelPlan_participanteT,
} from '../../../../models';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const plan_participante = await ModelPlan_participante.findAll({});
				return res.status(200).json(plan_participante);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'POST':
			try {
				const { id_carga_plan, id_persona, certificado, estado, horas } =
					req.body;
				const newPlanParticipante = await ModelPlan_participante.create({
					id_carga_plan,
					id_persona,
					certificado,
					estado,
					horas,
				});

				const newPlanParticipanteJSON: ModelPlan_participanteT =
					newPlanParticipante.toJSON();

				const planParticipante = await ModelPlan_participante.findOne({
					where: {
						id_plan_participante: newPlanParticipanteJSON.id_plan_participante,
					},
					include: ModelParticipante,
				});
				const planParticipanteJSON = planParticipante?.toJSON();

				planParticipanteJSON.codigo = planParticipanteJSON.participante.codigo;

				return res.status(200).json(planParticipanteJSON); //
			} catch (error) {
				console.log({ error });
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
