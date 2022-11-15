import { NextApiRequest, NextApiResponse } from "next";
import { ModelModalidad } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const id_modalidad = [req.query.id];
        const getModalidad = await ModelModalidad.findOne({
          where: { id_modalidad },
        });
        return res.status(200).json(getModalidad);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_modalidad = [req.query.id];
        const { nombre, estado, alias } = req.body;
        const newModalidad = await ModelModalidad.update(
          { nombre, estado, alias },
          { where: { id_modalidad } }
        );
        const modalidad = await ModelModalidad.findOne({
          where: { id_modalidad },
        });
        return res.status(200).json(modalidad);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_modalidad = [req.query.id];
        await ModelModalidad.destroy({
          where: {
            id_modalidad,
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
