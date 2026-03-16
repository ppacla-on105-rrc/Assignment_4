import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions } from "../models/authorizationOptions";
import { AuthorizationError } from "../errors/errors";

const authorize = (options: AuthorizationOptions) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            const role = res.locals.role as string | undefined;

            if (!role) {
                throw new AuthorizationError(
                    "Forbidden: No role found",
                    "ROLE_NOT_FOUND"
                );
            }

            if (!options.hasRole.includes(role as "admin" | "manager" | "officer")) {
                throw new AuthorizationError(
                    "Forbidden: Insufficient role",
                    "INSUFFICIENT_ROLE"
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

export default authorize;