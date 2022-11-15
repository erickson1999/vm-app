import { NextApiRequest, NextApiResponse } from "next";
import { ModelDocente } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_persona = [req.query.id];
        const getDocente = await ModelDocente.findOne({
          where: { id_persona },
        });
        return res.status(200).json(getDocente);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_persona = [req.query.id];
        const { codigo } = req.body;
        const newCiclo = await ModelDocente.update(
          { codigo },
          { where: { id_persona } }
        );
        const Ciclo = await ModelDocente.findOne({
          where: { id_persona },
        });
        return res.status(200).json(Ciclo);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_persona = [req.query.id];

        await ModelDocente.destroy({
          where: {
            id_persona,
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
