export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
};

export const getErrorCode = (error: unknown): string => {
    if (error instanceof Error) {
        const firebaseError = error as Error & { code?: string };
        return firebaseError.code || "UNKNOWN_ERROR";
    }

    return "UNKNOWN_ERROR";
};