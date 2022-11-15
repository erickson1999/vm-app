import { NextApiRequest, NextApiResponse } from "next";
import { ModelRol } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const roles = await ModelRol.findAll();
        return res.status(200).json(roles);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { id_rol, nombre, estado } = req.body;
        const newRol = await ModelRol.create({
          id_rol,
          nombre,
          estado,
        });
        return res.status(200).json(newRol); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
