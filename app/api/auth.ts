import { API_KEY, API_SECRET, API_URL } from "@/config";
import axios from "axios";

type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

export async function fetchToken(): Promise<TokenResponse> {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", API_KEY!);
  params.append("client_secret", API_SECRET!);

  const res = await axios.post<TokenResponse>(
    `${API_URL}/security/oauth2/token`,
    params,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res.data;
}
