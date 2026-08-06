import type { Response } from "express";
import type { AuthRequest } from "../middleware/AuthMiddleware.js";
import { prisma } from "../../lib/prisma.js";
import bcrypr from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function Login(req: AuthRequest, res: Response) {
    try {
        const { email, senha } = req.body

        if(!email || !senha){
            res.status(400).json({ erro:"Todos os dados são obrigatórios." })
            return
        }

        const usuario = await prisma.usuario.findUnique({
            where:{ email }
        })

        if(!usuario||!(await bcrypr.compare(senha, usuario.senha))){
            res.status(400).json({erro:"Email ou Senha Invalido."})
            return 
        }

        const token = jwt.sign(
            {usuarioid: usuario.id, cargo: usuario.cargo},
            process.env.JWT_SECRET as string,
            { expiresIn: "1d"}
        )

        res.status(201).json({
            mensagem:"Login feito com sucesso.",
            token,
            usuario:{
                nome: usuario.nome_completo,
                cargo: usuario.cargo
            }
        })
    } catch (error) {
        console.error("Faha ao logar: ", error)
        res.status(400).json({error:"Falha no login"})
    }
}