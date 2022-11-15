import { NextApiRequest, NextApiResponse } from "next";
import { ModelModalidad } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const modalidades = await ModelModalidad.findAll();
        return res.status(200).json(modalidades);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { nombre, estado, alias } = req.body;
        const newModalidad = await ModelModalidad.create({
          nombre,
          estado,
        });
        return res.status(200).json(newModalidad); //
      } catch (error) {
        return res.status(500).json({ message:error});
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
