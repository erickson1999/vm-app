import { NextApiRequest, NextApiResponse } from 'next';
import { ModelParticipante, ModelPlan_participante } from '../../../../models';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const id_carga_plan = [req.query.id];
				const planParticipantes = await ModelPlan_participante.findAll({
					where: { id_carga_plan },
					include: ModelParticipante,
				});

				const planParticipantesJSON = planParticipantes.map(
					(planParticipante) => {
						const planParticipanteJSON = planParticipante.toJSON();
						planParticipanteJSON.codigo =
							planParticipanteJSON.participante.codigo;
						return planParticipanteJSON;
					}
				);

				return res.status(200).json(planParticipantesJSON);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'PUT':
			try {
				const id_plan_participante = [req.query.id];
				const { id_carga_plan, id_persona, certificado, estado, horas } =
					req.body;
				const newPlanParticipante = await ModelPlan_participante.update(
					{
						id_carga_plan,
						id_persona,
						certificado,
						estado,
						horas,
					},
					{ where: { id_plan_participante } }
				);
				const planParticipante = await ModelPlan_participante.findOne({
					where: { id_plan_participante },
					include: ModelParticipante,
				});

				const planParticipanteJSON = planParticipante?.toJSON();
				planParticipanteJSON.codigo = planParticipanteJSON.participante.codigo;

				return res.status(200).json(planParticipanteJSON);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'DELETE':
			try {
				const id_plan_participante = [req.query.id];
				await ModelPlan_participante.destroy({
					where: {
						id_plan_participante,
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
