import { Router } from "express";
import { AtualizarDados, Checkin, CriarConvidado, Dashboard, DeletarConvidado, desfazerCheckin, ListtarConvidados, PesqusiaConvidados } from "../controller/convidado.controller.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const router = Router()

router.use(AuthMiddleware)
router.get("/dashboard", Dashboard)
router.get("/listar", ListtarConvidados)
router.get("/pesquisa", PesqusiaConvidados)
router.post("/criar", CriarConvidado)
router.put("/atualizar/:id", AtualizarDados)
router.patch("/checkin/:id", Checkin)
router.patch("/defazercheckin/:id", desfazerCheckin)
router.delete("/defazercheckin/:id", DeletarConvidado)

export default router