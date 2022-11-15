import { NextApiRequest, NextApiResponse } from "next";
import { ModelCiclo } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_ciclo = [req.query.id];
        const getCiclo = await ModelCiclo.findOne({
          where: { id_ciclo },
        });
        return res.status(200).json(getCiclo);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_ciclo = [req.query.id];
        const { nombre, alias } = req.body;
        const newCiclo = await ModelCiclo.update(
          { nombre, alias },
          { where: { id_ciclo } }
        );
        const Ciclo = await ModelCiclo.findOne({
          where: { id_ciclo },
        });
        return res.status(200).json(Ciclo);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_ciclo = [req.query.id];
        await ModelCiclo.destroy({
          where: {
            id_ciclo,
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
