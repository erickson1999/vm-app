import { NextApiRequest, NextApiResponse } from "next";
import { ModelParticipante } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_participantes = [req.query.id];
        const getParticipantes = await ModelParticipante.findOne({
          where: { id_participantes },
        });
        return res.status(200).json(getParticipantes);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_participantes = [req.query.id];
        const { id_persona, codigo, horas_total } = req.body;
        const newParticipante = await ModelParticipante.update(
          { id_persona, codigo, horas_total },
          { where: { id_participantes } }
        );
        const participante = await ModelParticipante.findOne({
          where: { id_participantes },
        });
        return res.status(200).json(participante);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_participantes = [req.query.id];
        await ModelParticipante.destroy({
          where: {
            id_participantes,
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
