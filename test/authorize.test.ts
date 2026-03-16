import { Request, Response } from "express";
import authorize from "../src/api/v1/middleware/authorize";
import { AuthorizationError } from "../src/api/v1/errors/errors";

describe("authorize middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            locals: {},
        };
        nextFunction = jest.fn();
    });

    it("should allow user with correct role", () => {
        mockResponse.locals = {
            role: "officer",
        };

        const middleware = authorize({
            hasRole: ["officer", "manager", "admin"],
        });

        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith();
    });

    it("should pass AuthorizationError when role is missing", () => {
        mockResponse.locals = {};

        const middleware = authorize({ hasRole: ["admin"] });

        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );

        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: No role found");
        expect(error.code).toBe("ROLE_NOT_FOUND");
    });

    it("should pass AuthorizationError when role is wrong", () => {
        mockResponse.locals = {
            role: "officer",
        };

        const middleware = authorize({ hasRole: ["admin"] });

        middleware(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthorizationError)
        );

        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Forbidden: Insufficient role");
        expect(error.code).toBe("INSUFFICIENT_ROLE");
    });
});