import express, { Router } from "express";
import {
    getLoans,
    getLoanById,
    createLoan,
    updateLoan,
    deleteLoan,
} from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router: Router = express.Router();

router.get("/loans", authenticate, authorize({ hasRole: ["officer", "manager", "admin"] }), getLoans);

router.get("/loans/:id", authenticate, authorize({ hasRole: ["officer", "manager", "admin"] }), getLoanById);

router.post("/loans", authenticate, authorize({ hasRole: ["manager", "admin"] }), createLoan);

router.put("/loans/:id", authenticate, authorize({ hasRole: ["manager", "admin"] }), updateLoan);

router.delete("/loans/:id", authenticate, authorize({ hasRole: ["admin"] }), deleteLoan);

export default router;