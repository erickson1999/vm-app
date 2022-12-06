import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import { ModelAsistencia } from '../../../../models';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case 'GET':
			try {
				const attendances = await ModelAsistencia.findAll();
				const attendancesJSON = attendances.map((attendance) => {
					const attendanceJSON = attendance.toJSON();
					attendanceJSON.fecha_asis_pretty = moment(attendanceJSON.fecha_asis)
						.zone('-05:00')
						.format('lll')
						.toString();
					attendanceJSON.fecha_termino_pretty = moment(
						attendanceJSON.fecha_termino
					)
						.zone('-05:00')
						.format('lll')
						.toString();
					return attendanceJSON;
				});

				return res.status(200).json(attendancesJSON);
			} catch (error) {
				return res.status(500).json({ message: error });
			}

		case 'POST':
			try {
				const {
					id_plan_participante,
					fecha_asis,
					fecha_termino,
					estado,
					nota,
					horas,
					evidencia,
					codigo,
				} = req.body;
				const newAttendance = await ModelAsistencia.create({
					id_plan_participante,
					fecha_asis,
					fecha_termino,
					estado,
					nota,
					horas,
					evidencia,
					codigo,
				});
				return res.status(200).json(newAttendance);
			} catch (error) {
        console.log(error)
				return res.status(500).json({ message: error });
			}
		default:
			return res.status(405).json('Method not allowed');
	}
};
