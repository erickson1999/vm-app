import { NextApiRequest, NextApiResponse } from "next";
import { ModelPersona } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const personas = await ModelPersona.findAll();
        return res.status(200).json(personas);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const {
          id_persona,
          nombre,
          appaterno,
          apmaterno,
          dni,
          direccion,
          correo,
          numero,
          fecha_registro,
        } = req.body;
        const newPersonas = await ModelPersona.create({
          id_persona,
          nombre,
          appaterno,
          apmaterno,
          dni,
          direccion,
          correo,
          numero,
          fecha_registro,
        });
        return res.status(200).json(newPersonas); //
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
