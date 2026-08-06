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
                cargo: "ADMIN"
            }
        })

        const cerimonialista = await prisma.usuario.create({
            data: {
                nome_completo: "Cerimoialista",
                email: "cerimonialista@wedding.com",
                senha: "senhaCerimonialista",
                cargo: "CERIMONIALISTA"
            }
        })

        console.log("Seed Finalizado.")
    } catch (error) {
        console.error("Falha no prisma: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

await main()