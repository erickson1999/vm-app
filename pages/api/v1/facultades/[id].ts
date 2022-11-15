import { NextApiRequest, NextApiResponse } from "next";
import {  ModelFacultad } from "../../../../models";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const id_facultad = [req.query.id];
        const getFacultad = await ModelFacultad.findOne({
          where: { id_facultad },
        });
        return res.status(200).json(getFacultad);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "PUT":
      try {
        const id_facultad = [req.query.id];
        const { nombre, estado, alias  } = req.body;
        const newFacultad = await ModelFacultad.update(
          { nombre, estado, alias  },
          { where: { id_facultad } }
        );
        const facultad = await ModelFacultad.findOne({
          where: { id_facultad },
        });
        return res.status(200).json(facultad);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "DELETE":
      try {
        const id_facultad = [req.query.id];
        await ModelFacultad.destroy({
          where: {
            id_facultad,
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
