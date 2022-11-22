import { NextApiRequest, NextApiResponse } from 'next';
import { ModelGrupo } from '../../../../models';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const id_grupo = [req.query.id];
				const getGrupo = await ModelGrupo.findOne({
					where: { id_grupo },
				});
				return res.status(200).json(getGrupo);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'PUT':
			try {
				const id_grupo = [req.query.id];
				const { nombre, estado, alias } = req.body;
				const newGrupo = await ModelGrupo.update(
					{ nombre, estado, alias },
					{ where: { id_grupo } }
				);
				const grupo = await ModelGrupo.findOne({
					where: { id_grupo },
				});
				return res.status(200).json(grupo);
			} catch (error) {
				console.log({ error });
				return res.status(500).json({ message: error });
			}
		case 'DELETE':
			try {
				const id_grupo = [req.query.id];
				await ModelGrupo.destroy({
					where: {
						id_grupo,
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
