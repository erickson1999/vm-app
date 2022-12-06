import { NextApiRequest, NextApiResponse } from 'next';
import { ModelEscuela } from '../../../../models';
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const escuelas = await ModelEscuela.findAll();
				return res.status(200).json(escuelas);
			} catch (error) {
				console.log({ error });
				return res.status(500).json({ message: error });
			}
		case 'POST':
			try {
				const { nombre, estado } = req.body;
				const newEscuela = await ModelEscuela.create({
					nombre,
					estado,
				});

				return res.status(200).json(newEscuela);
			} catch (error) {
				console.log(error);
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
