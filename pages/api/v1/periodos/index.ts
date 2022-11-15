import { NextApiRequest, NextApiResponse } from "next";
import { ModelPeriodo } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const periodos = await ModelPeriodo.findAll();
        return res.status(200).json(periodos);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { nombre, estado } = req.body;
        const newPeriodos = await ModelPeriodo.create({
          nombre,
          estado,
        });
        return res.status(200).json(newPeriodos); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
