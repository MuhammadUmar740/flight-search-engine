"use client";
import React, { FormEvent } from "react";
import CitySearch from "./CitySearch";
import { fetchFlights, IFlightResponse } from "@/app/api/flights-search";
import FlightRecords from "./FlightRecords";
import Chart from "./Chart";

const SearchFlight = () => {
  const [params, setParams] = React.useState({
    from: "",
    to: "",
    startDate: "",
    returnDate: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [flightsData, setFlightsData] = React.useState<IFlightResponse>();

  const [sortBy, setSortBy] = React.useState<"price" | "airline" | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const sortedFlights: IFlightResponse | undefined = React.useMemo(() => {
    if (!flightsData?.data) return undefined;

    const data = [...flightsData.data];

    if (sortBy === "price") {
      data.sort((a, b) =>
        sortDir === "asc"
          ? Number(a.price.total) - Number(b.price.total)
          : Number(b.price.total) - Number(a.price.total)
      );
    }

    if (sortBy === "airline") {
      data.sort((a, b) => {
        const aName = a.validatingAirlineCodes?.[0] ?? "";
        const bName = b.validatingAirlineCodes?.[0] ?? "";
        return sortDir === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      });
    }

    return { data, dictionaries: flightsData?.dictionaries };
  }, [flightsData, sortBy, sortDir]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = await fetchFlights(params);
    setFlightsData(data);
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl md:text-5xl xl:text-6xl font-bebas font-bold text-center py-10">
        Flights
      </h1>
      <div className="bg-white shadow-2xl rounded-lg p-5">
        <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
          <CitySearch setValue={(val) => setParams({ ...params, from: val })} />
          <CitySearch
            placeholder="Where to?"
            setValue={(val) => setParams({ ...params, to: val })}
          />
          <input
            required
            type="text"
            className="px-2 h-9.5 border border-[#cccccc] rounded-sm outline-none flex-1"
            placeholder="Departure Date"
            onFocusCapture={(e) => {
              e.target.type = "date";
              e.target.showPicker();
            }}
            onBlur={(e) => (e.target.type = "text")}
            onChange={(e) =>
              setParams({ ...params, startDate: e.target.value })
            }
            value={params.startDate}
          />
          <input
            required
            type="text"
            className="px-2 h-9.5 border border-[#cccccc] rounded-sm outline-none flex-1"
            placeholder="Return date"
            onFocusCapture={(e) => {
              e.target.type = "date";
              e.target.showPicker();
            }}
            onBlur={(e) => (e.target.type = "text")}
            onChange={(e) =>
              setParams({ ...params, returnDate: e.target.value })
            }
            value={params.returnDate}
          />
          <button
            type="submit"
            className="bg-secondary text-white rounded-lg px-3 py-2 cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Search Flights
          </button>
        </form>
      </div>
      <div className="flex w-full justify-end gap-5 pt-10 pb-5">
        <button
          className="px-3 py-1.5 bg-secondary text-white rounded-lg disabled:cursor-not-allowed cursor-pointer"
          disabled={!sortedFlights?.data?.length || isLoading}
          onClick={() => {
            setSortBy("price");
            setSortDir((prev) =>
              sortBy === "price" ? (prev === "asc" ? "desc" : "asc") : "asc"
            );
          }}
        >
          Sort By Price {sortBy === "price" && (sortDir === "asc" ? "↑" : "↓")}
        </button>

        <button
          className="px-3 py-1.5 bg-secondary text-white rounded-lg disabled:cursor-not-allowed cursor-pointer"
          disabled={!sortedFlights?.data?.length || isLoading}
          onClick={() => {
            setSortBy("airline");
            setSortDir((prev) =>
              sortBy === "airline" ? (prev === "asc" ? "desc" : "asc") : "asc"
            );
          }}
        >
          Sort By Airline{" "}
          {sortBy === "airline" && (sortDir === "asc" ? "↑" : "↓")}
        </button>
      </div>
      <FlightRecords flights={sortedFlights} isLoading={isLoading} />
      <Chart
        isLoading={isLoading}
        data={
          sortedFlights?.data?.map((flight) => ({
            airline:
              sortedFlights?.dictionaries?.carriers?.[
                flight?.validatingAirlineCodes?.[0]
              ],
            price: Number(flight?.price?.total) || 0,
          })) || []
        }
      />
    </>
  );
};

export default SearchFlight;
