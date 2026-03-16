import { Request, Response } from "express";
import { Loan } from "../models/loanModel";

let loans: Loan[] = [
    {
        id: 1,
        applicant: "John Smith",
        amount: 50000,
        status: "pending",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: 2,
        applicant: "Sarah Johnson",
        amount: 150000,
        status: "under_review",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
    {
        id: 3,
        applicant: "Michael Chen",
        amount: 500000,
        status: "pending",
        createdAt: "2025-01-05T10:00:00.000Z",
    },
    {
        id: 4,
        applicant: "Emily Williams",
        amount: 1000000,
        status: "flagged",
        createdAt: "2025-01-03T10:00:00.000Z",
    },
];

export const getLoans = (_req: Request, res: Response): void => {
    res.status(200).json({
        message: "Loan applications retrieved",
        count: loans.length,
        data: loans,
    });
};

export const getLoanById = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);

    const loan = loans.find((item) => item.id === id);

    if (!loan) {
        res.status(404).json({
            message: "Loan application not found",
        });
        return;
    }

    res.status(200).json({
        message: "Loan application retrieved",
        data: loan,
    });
};

export const createLoan = (req: Request, res: Response): void => {
    const { applicant, amount } = req.body;

    if (!applicant || !amount) {
        res.status(400).json({
            message: "Applicant and amount are required",
        });
        return;
    }

    const newLoan: Loan = {
        id: loans.length + 1,
        applicant,
        amount: Number(amount),
        status: "pending",
        createdAt: new Date().toISOString(),
    };

    loans.push(newLoan);

    res.status(201).json({
        message: "Loan application created",
        data: newLoan,
    });
};

export const updateLoan = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);
    const { applicant, amount, status } = req.body;

    const loan = loans.find((item) => item.id === id);

    if (!loan) {
        res.status(404).json({
            message: "Loan application not found",
        });
        return;
    }

    if (applicant) {
        loan.applicant = applicant;
    }

    if (amount) {
        loan.amount = Number(amount);
    }

    if (status) {
        loan.status = status;
    }

    res.status(200).json({
        message: "Loan application updated",
        data: loan,
    });
};

export const deleteLoan = (req: Request, res: Response): void => {
    const id: number = Number(req.params.id);

    const loanIndex = loans.findIndex((item) => item.id === id);

    if (loanIndex === -1) {
        res.status(404).json({
            message: "Loan application not found",
        });
        return;
    }

    loans.splice(loanIndex, 1);

    res.status(200).json({
        message: "Loan application deleted",
    });
};