import { Request, Response } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { AuthenticationError } from "../src/api/v1/errors/errors";
import { auth } from "../src/config/firebaseConfig";

jest.mock("../src/config/firebaseConfig", () => ({
    auth: {
        verifyIdToken: jest.fn(),
    },
}));

describe("authenticate middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: jest.Mock;

    beforeEach(() => {
        mockRequest = {
            headers: {},
        };

        mockResponse = {
            locals: {},
        };

        nextFunction = jest.fn();
    });

    it("should pass AuthenticationError when no token is provided", async () => {
        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );

        const error = nextFunction.mock.calls[0][0];
        expect(error.message).toBe("Unauthorized: No token provided");
        expect(error.code).toBe("TOKEN_NOT_FOUND");
    });

    it("should pass AuthenticationError when token is invalid", async () => {
        mockRequest.headers = {
            authorization: "Bearer bad-token",
        };

        (auth.verifyIdToken as jest.Mock).mockRejectedValueOnce(
            new Error("Invalid token")
        );

        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(nextFunction).toHaveBeenCalledWith(
            expect.any(AuthenticationError)
        );
    });

    it("should call next and store user info when token is valid", async () => {
        mockRequest.headers = {
            authorization: "Bearer valid-token",
        };

        (auth.verifyIdToken as jest.Mock).mockResolvedValueOnce({
            uid: "user123",
            role: "officer",
        });

        await authenticate(
            mockRequest as Request,
            mockResponse as Response,
            nextFunction
        );

        expect(auth.verifyIdToken).toHaveBeenCalledWith("valid-token");
        expect(mockResponse.locals).toEqual({
            uid: "user123",
            role: "officer",
        });
        expect(nextFunction).toHaveBeenCalledWith();
    });
});