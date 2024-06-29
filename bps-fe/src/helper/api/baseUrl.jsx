// export const baseUrl = "https://localhost:3000";
export const baseUrl = `${import.meta.env.VITE_BASE_URL}`;
const prefix = `${import.meta.env.VITE_PREFIX}`;
export const endpoint = baseUrl + prefix;
