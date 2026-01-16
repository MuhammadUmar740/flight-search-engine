import { apiClient } from "./client";

type CitySearchResponse = {
  name: string;
  iataCode: string;
  address: {
    countryCode: string;
  };
};

type ICitySearchResponse = {
  data: CitySearchResponse[];
};

export async function fetchCity({
  keyword,
}: {
  keyword: string;
}): Promise<ICitySearchResponse> {
  const res = await apiClient.get<ICitySearchResponse>(
    `/v1/reference-data/locations/cities?keyword=${keyword}&max=10`
  );

  return res.data;
}
