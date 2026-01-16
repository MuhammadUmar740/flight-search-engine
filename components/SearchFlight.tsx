"use client";
import React, { FormEvent } from "react";
import CitySearch from "./CitySearch";
import { fetchFlights, IFlightResponse } from "@/app/api/flights-search";
import FlightRecords from "./FlightRecords";

const SearchFlight = () => {
  const [params, setParams] = React.useState({
    from: "",
    to: "",
    startDate: "",
    returnDate: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [flightsData, setFlightsData] = React.useState<IFlightResponse>();
  console.log(flightsData);

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
            className="bg-secondary text-white rounded-lg px-3 py-2 cursor-pointer"
          >
            Search Flights
          </button>
        </form>
      </div>
      <FlightRecords flights={flightsData} isLoading={isLoading} />
    </>
  );
};

export default SearchFlight;
