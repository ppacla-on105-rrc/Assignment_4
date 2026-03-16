export const successResponse = (
    data: unknown,
    message: string = "Request successful"
) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
});

export const errorResponse = (message: string, code: string) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});