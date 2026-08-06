import { Router } from "express";
import { ListarMesas } from "../controller/convidado.controller.js";

const router = Router()

router.get("/listar", ListarMesas)

export default router