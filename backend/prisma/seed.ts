import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

async function main() {
    try {
        console.log("Iniciando Seed.")
        const senhaAdmin = await bcrypt.hash("admin123@", 10)
        const senhaCerimonialista = await bcrypt.hash("cerimonialista123@", 10)

        const admin = await prisma.usuario.create({
            data: {
                nome_completo: "Administrador",
                email: "admin@wedding.com",
                senha: senhaAdmin,
                cargo: "ADMIN",
                CPF: "2123123213123"
            }
        })

        const cerimonialista = await prisma.usuario.create({
            data: {
                nome_completo: "Cerimoialista",
                email: "cerimonialista@wedding.com",
                senha: senhaCerimonialista,
                cargo: "CERIMONIALISTA",
                CPF: "1231231333333"
            }
        })

        await prisma.mesa.createMany({
            data:[
                {id:1},
                {id:2},
                {id:3},
                {id:4},
                {id:5},
                {id:6}
            ]
        })
            

        console.log("Seed Finalizado.")
    } catch (error) {
        console.error("Falha no prisma: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

await main()