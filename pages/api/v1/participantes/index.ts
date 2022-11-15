import { NextApiRequest, NextApiResponse } from "next";
import { ModelParticipante } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const participantes = await ModelParticipante.findAll();
        return res.status(200).json(participantes);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { id_persona, codigo, horas_total } = req.body;
        const newParticipante = await ModelParticipante.create({
          id_persona,
          codigo,
          horas_total,
        });
        return res.status(200).json(newParticipante); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
