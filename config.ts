import "dotenv/config";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not set");
}
const API_URL = `${API_BASE_URL}/v1`;

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY is not set");
}

const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET;
if (!API_SECRET) {
  throw new Error("API_SECRET is not set");
}

export { API_URL, API_BASE_URL, API_KEY, API_SECRET };
