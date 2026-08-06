import { Router } from "express";
import { AtualizarDados, Checkin, CriarConvidado, Dashboard, DeletarConvidado, desfazerCheckin, ListtarConvidados, PesqusiaConvidados } from "../controller/convidado.controller.js";
import { AuthMiddleware, VerificarCargo } from "../middleware/AuthMiddleware.js";

const router = Router()

router.use(AuthMiddleware)
router.get("/dashboard", VerificarCargo(['ADMIN']), Dashboard)
router.get("/listar", VerificarCargo(['ADMIN', 'CERIMONIALISTA']), ListtarConvidados)
router.get("/pesquisa", VerificarCargo(['ADMIN', 'CERIMONIALISTA']), PesqusiaConvidados)
router.post("/criar", VerificarCargo(['ADMIN']), CriarConvidado)
router.put("/atualizar/:id", VerificarCargo(['ADMIN']), AtualizarDados)
router.patch("/checkin/:id", VerificarCargo(['ADMIN', 'CERIMONIALISTA']), Checkin)
router.patch("/defazercheckin/:id", VerificarCargo(['ADMIN']), desfazerCheckin)
router.delete("/deletar/:id", VerificarCargo(['ADMIN']), DeletarConvidado)

export default router