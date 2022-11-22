import { NextApiRequest, NextApiResponse } from "next";
import { ModelPersona_rol } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_personas_rol = [req.query.id];
        const getPersonas_rol = await ModelPersona_rol.findOne({
          where: { id_personas_rol },
        });
        return res.status(200).json(getPersonas_rol);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_persona_rol = [req.query.id];
        const { id_persona, id_rol, estado } = req.body;
        const newPersonaRol = await ModelPersona_rol.update(
          { id_persona, id_rol, estado },
          { where: { id_persona_rol } }
        );
        const personaRol = await ModelPersona_rol.findOne({
          where: { id_persona_rol },
        });
        return res.status(200).json(personaRol);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_persona = [req.query.id];
        await ModelPersona_rol.destroy({
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
