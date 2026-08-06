import { Router } from "express";
import { AtualizarDados, Checkin, CriarConvidado, Dashboard, desfazerCheckin, ListtarConvidados, PesqusiaConvidados } from "../controller/convidado.controller.js";

const router = Router()

router.get("/dashboard", Dashboard)
router.get("/listar", ListtarConvidados)
router.get("/pesquisa", PesqusiaConvidados)
router.post("/criar", CriarConvidado)
router.put("/atualizar/:id", AtualizarDados)
router.patch("/checkin/:id", Checkin)
router.patch("/defazercheckin/:id", desfazerCheckin)

export default router