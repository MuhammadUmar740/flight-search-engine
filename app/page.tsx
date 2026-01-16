import Header from "@/components/Header";
import SearchFlight from "@/components/SearchFlight";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container p-5 mx-auto">
        <SearchFlight />
      </div>
    </>
  );
}
