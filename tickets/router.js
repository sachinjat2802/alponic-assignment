import { Router } from "express";
export const router = Router();
import{ticketController} from "./ticketController.js"

router.get("/ping", (req, res) => {
    res.send("pong")
})

router.post('/ticket',ticketController.createTicket);
router.get('/ticket',ticketController.getTicket);
router.post('/adminReplay/:id',ticketController.adminReplay);
router.post('/custReplay/:id',ticketController.custReplay);
router.get('/closeTicket/:id',ticketController.closeTicket);