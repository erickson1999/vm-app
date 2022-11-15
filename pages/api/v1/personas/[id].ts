import { NextApiRequest, NextApiResponse } from "next";
import { ModelPersona } from "../../../../models";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_persona = [req.query.id];
        const getPersona = await ModelPersona.findOne({
          where: { id_persona },
        });
        return res.status(200).json(getPersona);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_persona = [req.query.id];
        const {
          nombre,
          appaterno,
          apmaterno,
          dni,
          direccion,
          correo,
          numero,
          fecha_registro,
        } = req.body;
        const newPersona = await ModelPersona.update(
          {
            nombre,
            appaterno,
            apmaterno,
            dni,
            direccion,
            correo,
            numero,
            fecha_registro,
          },
          { where: { id_persona } }
        );
        const persona = await ModelPersona.findOne({
          where: { id_persona },
        });
        return res.status(200).json(persona);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_persona = [req.query.id];
        await ModelPersona.destroy({
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
