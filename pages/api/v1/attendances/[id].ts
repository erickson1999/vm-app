import { NextApiRequest, NextApiResponse } from "next";
import { ModelAsistencia } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_asistencia = [req.query.id];
        const getAttendance = await ModelAsistencia.findOne({
          where: { id_asistencia },
        });
        return res.status(200).json(getAttendance);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_asistencia = [req.query.id];
        const { codigo } = req.body;
        const newAttendance = await ModelAsistencia.update(
          {
            codigo,
          },
          { where: { id_asistencia } }
        );
        const attendance = await ModelAsistencia.findOne({
          where: { id_asistencia },
        });
        return res.status(200).json(attendance);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_asistencia = [req.query.id];
        await ModelAsistencia.destroy({
          where: {
            id_asistencia,
          },
        });
        return res.send(200);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
