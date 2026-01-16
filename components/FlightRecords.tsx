import { IFlightResponse } from "@/app/api/flights-search";

const FlightRecords = ({
  flights = { data: [], dictionaries: { carriers: {} } },
  isLoading = false,
}: {
  flights?: IFlightResponse;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 whitespace-nowrap">
        <thead className="bg-secondary text-white">
          <tr>
            <th className="px-6 py-2">ID</th>
            <th className="px-6 py-2">Last Booking Date</th>
            <th className="px-6 py-2">Seats Available</th>
            <th className="px-6 py-2">Price</th>
            <th className="px-6 py-2">Airline</th>
          </tr>
        </thead>
        <tbody className="min-h-[50dvh]">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
                Loading...
              </td>
            </tr>
          ) : flights?.data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
                No flights found.
              </td>
            </tr>
          ) : (
            flights?.data?.map((flight) => (
              <tr key={flight?.id} className="hover:bg-gray-100">
                <td className="px-6 py-2 text-center">{flight?.id || "N/A"}</td>
                <td className="px-6 py-2 text-center">
                  {flight?.lastTicketingDate || "N/A"}
                </td>
                <td className="px-6 py-2 text-center">
                  {flight?.numberOfBookableSeats || "N/A"}
                </td>
                <td className="px-6 py-2 text-center">
                  {flight?.price.total || "N/A"}
                </td>
                <td className="px-6 py-2 text-center">
                  {flights?.dictionaries?.carriers?.[
                    `${flight.validatingAirlineCodes[0]}`
                  ] || "N/A"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FlightRecords;
