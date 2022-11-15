import { NextApiRequest, NextApiResponse } from "next";
import { ModelEscuela } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_escuela = [req.query.id];
        const getEscuela = await ModelEscuela.findOne({
          where: { id_escuela },
        });
        return res.status(200).json(getEscuela);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_escuela = [req.query.id];
        const { nombre, estado, id_facultad } = req.body;
        const newEscuela = await ModelEscuela.update(
          { nombre, estado, id_facultad },
          { where: { id_escuela } }
        );
        const Escuela = await ModelEscuela.findOne({
          where: { id_escuela },
        });
        return res.status(200).json(Escuela);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_escuela = [req.query.id];
        await ModelEscuela.destroy({
          where: {
            id_escuela,
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
