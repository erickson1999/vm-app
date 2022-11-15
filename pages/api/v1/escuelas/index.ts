import { NextApiRequest, NextApiResponse } from "next";
import { ModelEscuela } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const escuelas = await ModelEscuela.findAll();
        return res.status(200).json(escuelas);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { id_escuela, nombre, estado, id_facultad } = req.body;
        const newEscuela = await ModelEscuela.create({
          id_escuela, nombre, estado, id_facultad 
        });
        return res.status(200).json(newEscuela);
      } catch (error) {
        return res.status(500).json({message:error})
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
