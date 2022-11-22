import { NextApiRequest, NextApiResponse } from 'next';
import { ModelAsistencia } from '../../../../models';

// eslint-disable-next-line import/no-anonymous-default-export
type NextApiResponseT = {
	ok: boolean;
	message?: string;
	data?: Object;
};
export default async (
	req: NextApiRequest,
	res: NextApiResponse<NextApiResponseT>
) => {
	const idAsistencia = req.query.id;
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				const idAsistencia = [req.query.id];
				const attendance = await ModelAsistencia.findOne({
					where: { idAsistencia },
				});
				if (!attendance) {
					return res
						.status(404)
						.json({ ok: false, message: 'el usuario no existe' });
				}
				const getAttendanceJSON = attendance.toJSON();

				return res.status(200).json({ ok: true, data: [] });
			} catch (error: any) {
				return res.status(500).json({ ok: false, message: error });
			}
		case 'PUT':
			try {
				const idAsistencia = [req.query.id];
				const { codigo } = req.body;
				const newAttendance = await ModelAsistencia.update(
					{
						codigo,
					},
					{ where: { idAsistencia } }
				);
				const attendance = await ModelAsistencia.findOne({
					where: { idAsistencia },
				});
				return res.status(200).json(attendance);
			} catch (error) {
				return res.status(500).json({ message: error });
			}
		case 'DELETE':
			try {
				const idAsistencia = [req.query.id];
				await ModelAsistencia.destroy({
					where: {
						idAsistencia,
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
