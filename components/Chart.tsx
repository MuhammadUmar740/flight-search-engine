import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  airline: string;
  price: number;
}

export default function Chart({
  data = [],
  isLoading = false,
}: {
  data: ChartData[];
  isLoading: boolean;
}) {
  if (!data?.length) return null;
  if (isLoading)
    return (
      <div className="w-full h-80 ps-10 my-10 flex items-end gap-8 border-l border-b border-gray-300">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="w-6 h-70 bg-gray-200 animate-pulse rounded-t-lg"
          ></div>
        ))}
      </div>
    );
  return (
    <div className="w-full h-100 my-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="airline" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="price"
            fill="#ca3f49"
            barSize={32}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
