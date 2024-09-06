export const sendResponse = (res, code, message, status, data = null, error = null) => {
    return res.status(code).json({
        code,
        message,
        status,
        data,
        error,
    });
};