import { NextApiRequest, NextApiResponse } from "next";
import { ModelFacultad } from "../../../../models";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const facultades = await ModelFacultad.findAll();
        return res.status(200).json(facultades);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    case "POST":
      try {
        const { nombre, estado, alias } = req.body;
        const newEscuelaSucur = await ModelFacultad.create({
          nombre,
          estado,
          alias,
        });
        return res.status(200).json(newEscuelaSucur); //
      } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
      }
    default:
      return res.status(405).json("Method not allowed");
  }
};
