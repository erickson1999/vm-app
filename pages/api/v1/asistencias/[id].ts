import { NextApiRequest, NextApiResponse } from 'next';
import { ModelAsistencia, ModelAsistenciaT } from '../../../../models';

// eslint-disable-next-line import/no-anonymous-default-export
type NextApiResponseT = {
	ok: boolean;
	message?: string;
	data?: Object;
};
const handler = async (
	req: NextApiRequest,
	res: NextApiResponse<NextApiResponseT>
) => {
	const { method } = req;
	switch (method) {
		case 'POST': {
			const codigo = req.query.id;
			try {
				const asistencia = await ModelAsistencia.create({ codigo });
				res.status(200).json({ data: asistencia });
			} catch (error) {
				console.log({ error });
				res.status(404).json({
					ok: false,
					message: 'no se pudo registrar la asistencia inténtelo nuevamente',
				});
			}
		}
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
				await ModelAsistencia.update(
					{
						codigo,
					},
					{ where: { idAsistencia } }
				);
				const attendance = await ModelAsistencia.findOne({
					where: { idAsistencia },
				});
				if (!attendance) {
					return;
				}
				const attendanceJSON: ModelAsistenciaT = attendance?.toJSON();
				return res.status(200).json({ ok: true, data: [attendanceJSON] });
			} catch (error: any) {
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
export default handler;
