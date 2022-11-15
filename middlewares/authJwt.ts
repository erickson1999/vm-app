import jwt, { JwtPayload } from "jsonwebtoken";
import {ModelUsuario} from "../models/ModelUsuario";
import { NextApiRequest, NextApiResponse } from "next";


//verificamos el token
export const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //creamos un herder para ver si el usuario esta logeado
    const token = req.headers["x-access-token"];
    //bota el token en colsola
    console.log(token);
    //si no hay token retorna no hay token
    if (!token) return res.status(403).json({ message: "no token provided" });
    //verificamos con jwt
    //interface DECODEDI {id:string | JwtPayload}
    const decoded = jwt.verify(token.toString(), process.env.TOKEN_SECRET!);
    // buscamos el usuario por el id
    const user = await ModelUsuario.findByPk(decoded.id);
    //en caso que no exista id retornamos usuario no existe
    if (!user) return res.status(404).json({ message: "no user found" });
    // next = para que siga el codigo
    return true;
  } catch (error) {
    console.log(error)
    // si no hay usuario se le dire no autorizado
    return res.status(401).json({ message: "Unautorized" });
  }
};