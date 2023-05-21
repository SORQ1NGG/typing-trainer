class HttpError extends Error {
    statusCode;
    constructor (message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export async function fetchGet (url, headers) {
    let payload = null;
    const res = await fetch(url, { method: 'GET', headers });
    payload = await res.json().catch(() => null);
    if (res.ok) return { payload };
    throw new HttpError(payload.message ?? res.statusText, res.status);
}
