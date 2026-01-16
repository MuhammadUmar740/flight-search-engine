"use client";
import { fetchCity } from "@/app/api/city-search";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import { useDebounce } from "use-debounce";

interface Option {
  label: string;
  value: string;
}

const CitySearch = ({
  setValue,
  placeholder = "Where from?",
}: {
  setValue: (val: string) => void;
  placeholder?: string;
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [selected, setSelected] = React.useState<Option | null>(null);
  const [debouncedInput] = useDebounce(inputValue, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ["city-search", debouncedInput],
    queryFn: async () => await fetchCity({ keyword: debouncedInput }),
    staleTime: 5 * 60 * 1000,
    enabled: !!debouncedInput,
  });

  const options =
    data?.data?.map((city) => ({
      value: city.iataCode,
      label: `${city.name}, ${city.address.countryCode}`,
    })) || [];

  return (
    <Select<Option, false>
      required
      isClearable
      isSearchable
      placeholder={placeholder}
      options={options}
      isLoading={isLoading}
      value={selected}
      onChange={(option) => {
        setSelected(option);
        setValue(option?.value || "");
      }}
      onInputChange={(val, meta) => {
        if (meta.action === "input-change") {
          setInputValue(val);
        }
      }}
      className="flex-1 min-w-full sm:min-w-[45%] md:min-w-[20%]"
    />
  );
};

export default CitySearch;
