import type { NextFunction, Request, Response } from "express";
import type { Cargo } from "../../generated/prisma/enums.js";
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request{
    usuarioId?: number,
    cargo?: Cargo
}

export function AuthMiddleware(req: AuthRequest, res: Response, next: NextFunction){
    const AuthHeader = req.headers.authorization

    if(!AuthHeader || !AuthHeader.startsWith("Bearer")){
        res.status(403).json({error: "Token expirado ou Invalido."})
        return
    }

    const token = AuthHeader.split(" ")[1]!
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string ) as {
            usuarioId: number,
            cargo: Cargo
        }
        req.cargo = payload.cargo
        req.usuarioId = payload.usuarioId

        next()
    } catch (error) {
        res.status(403).json({error: "Token expirado ou Invalido."})
    }
}

export function VerificarCargo(CargoPermitido: Cargo[]){
    return (req: AuthRequest, res: Response, next: NextFunction)=>{
        if(!req.cargo){
            res.status(403).json({erro:"acesso negado: Cargo não identificado."})
            return
        }

        if(!CargoPermitido.includes(req.cargo)){
            res.status(403).json({erro:"acesso negado: Cargo não tem permissão."})
            return
        }
        next()
    }
}