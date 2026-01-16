import { apiClient } from "./client";

export type Flight = {
  id: string;
  lastTicketingDate: string;
  numberOfBookableSeats: string;
  price: {
    total: string;
  };
  validatingAirlineCodes: string[];
};

export type IFlightResponse = {
  data: Flight[];
  dictionaries: { carriers: { [key: string]: string } };
};

type FlightsPayload = {
  from: string;
  to: string;
  startDate: string;
  returnDate: string;
};

export async function fetchFlights(
  payload: FlightsPayload
): Promise<IFlightResponse> {
  const params = new URLSearchParams({
    originLocationCode: payload.from,
    destinationLocationCode: payload.to,
    departureDate: payload.startDate,
    returnDate: payload.returnDate,
    adults: "1",
    currencyCode: "USD",
    max: "10",
  });

  const res = await apiClient.get<IFlightResponse>(
    `/v2/shopping/flight-offers?${params}`
  );

  return res.data;
}
