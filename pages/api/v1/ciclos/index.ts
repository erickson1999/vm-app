import { NextApiRequest, NextApiResponse } from "next";
import { ModelCiclo } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const ciclos = await ModelCiclo.findAll();
        return res.status(200).json(ciclos);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { id_ciclo, nombre, alias } = req.body;
        const newCiclo = await ModelCiclo.create({ id_ciclo, nombre, alias });
        return res.status(200).json(newCiclo);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
