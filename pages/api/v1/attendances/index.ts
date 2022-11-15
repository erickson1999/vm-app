import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../../middlewares/authJwt";
import { ModelAsistencia } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  verifyToken(req,res)
  switch (method) {
    case "GET":
      try {
        const [attendances] = await ModelAsistencia.findAll();
        return res.status(200).json(attendances);
      } catch (error) {
        return res.status(500).json({ message: error });
      }

    case "POST":
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
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
