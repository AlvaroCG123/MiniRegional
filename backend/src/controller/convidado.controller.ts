import type { Response } from "express";
import type { AuthRequest } from "../middleware/AuthMiddleware.js";
import { prisma } from "../../lib/prisma.js";

export async function Dashboard(req: AuthRequest, res: Response) {
    try {
        const total_convidados = await prisma.convidado.count()
        const confirmados = await prisma.convidado.count({where:{check_in: true}})
        const pendentes = total_convidados - confirmados

        res.status(200).json({total_convidados, confirmados, pendentes})
    } catch (error) {
        res.status(400).json({error :"Falha ao listar Dados."})
    }
}

export async function ListtarConvidados(req: AuthRequest, res: Response) {
    try {
        const listar = await prisma.convidado.findMany({
            orderBy:{
                nome_completo:'asc'
            }
        })

        res.status(200).json(listar)
    } catch (error) {
        res.status(400).json({error :"Falha ao listar Convidados."})
    }
}

export async function PesqusiaConvidados(req: AuthRequest, res: Response) {
    try {
        const { nome_completo } = req.query

        if(!nome_completo || typeof nome_completo !== `string`){
            res.status(400).json({error :"Parametro Invalido."})
            return
        }
        
        const listar = await prisma.convidado.findMany({
            where:{
                nome_completo:{
                    contains: nome_completo
                }
            },
            orderBy:{
                nome_completo:'asc'
            }
        })

        res.status(200).json(listar)
    } catch (error) {
        res.status(400).json({mensagem:"Falha ao listar Convidados."})
    }
}

export async function CriarConvidado(req: AuthRequest, res: Response) {
    try {
        const { nome_completo, email, telefone, mesaId, CPF } = req.body

        if( !nome_completo || !email || !telefone || !mesaId || !CPF ){
            res.status(400).json({error:"Todos os dados são obrigatórios."})
            return
        }

        const criar = await prisma.convidado.create({
            data: {
                nome_completo, email, telefone, mesaId, CPF
            }
        })

        res.status(200).json(criar)
    } catch (error) {
        res.status(400).json({error:"Falha ao criar convidado."})
    }
}

export async function AtualizarDados(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params
        const { nome_completo, email, telefone, mesaId, CPF } = req.body

        if(!id){
            res.status(400).json({error:"Id Invalido"})
            return
        }

        const convidadoId = await prisma.convidado.findUnique({
            where:{ id: Number(id) }
        })

        if(!convidadoId){
            res.status(400).json({error:"Convidado náo encontrado"})
            return
        }

        if( !nome_completo || !email || !telefone || !mesaId || !CPF ){
            res.status(400).json({error:"Todos os dados são obrigatórios."})
            return
        }

        const atualizar = await prisma.convidado.update({
            where:{ id:Number(id) },
            data: {
                nome_completo, email, telefone, mesaId
            }
        })

        res.status(200).json(atualizar)
    } catch (error) {
        res.status(400).json({error:"Falha ao atulizar convidado."})
    }
}

export async function Checkin(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            res.status(400).json({error:"Id Invalido"})
            return
        }

        const convidadoId = await prisma.convidado.findUnique({
            where:{ id: Number(id) }
        })

        if(!convidadoId){
            res.status(400).json({error:"Convidado náo encontrado"})
            return
        }

        if( convidadoId.check_in === true ){
            res.status(400).json({error:"Convidado já fez check-in."})
            return
        }

        const checkin = await prisma.convidado.update({
            where:{ id:Number(id) },
            data: {
                check_in: true,
                horario_checkin: new Date()
            }
        })

        res.status(200).json(checkin)
    } catch (error) {
        res.status(400).json({error:"Falha ao Fazer Check-in."})
    }
}

export async function desfazerCheckin(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            res.status(400).json({error:"Id Invalido"})
            return
        }

        const convidadoId = await prisma.convidado.findUnique({
            where:{ id: Number(id) }
        })

        if(!convidadoId){
            res.status(400).json({error:"Convidado náo encontrado"})
            return
        }

        if( convidadoId.check_in === false ){
            res.status(400).json({error:"Convidado ainda náo fez Check-in."})
            return
        }

        const desfazercheckin = await prisma.convidado.update({
            where:{ id:Number(id) },
            data: {
                check_in: false,
            }
        })

        res.status(200).json(desfazercheckin)
    } catch (error) {
        res.status(400).json({error:"Falha ao Desfazer Check-in."})
    }
}

export async function DeletarConvidado(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params

        if(!id){
            res.status(400).json({error:"Id Invalido"})
            return
        }

        const convidadoId = await prisma.convidado.findUnique({
            where:{ id: Number(id) }
        })

        if(!convidadoId){
            res.status(400).json({error:"Convidado náo encontrado"})
            return
        }

        const deletar = await prisma.convidado.delete({
            where:{ id:Number(id) }
        })

        res.status(200).json(deletar)
    } catch (error) {
        res.status(400).json({error:"Falha ao Deletar convidado."})
    }
}

export async function ListarMesas(req: AuthRequest, res: Response) {
    try {
        const listar = await prisma.mesa.findMany({})

        res.status(200).json(listar)
    } catch (error) {
        res.status(400).json({error :"Falha ao listar Convidados."})
    }
}