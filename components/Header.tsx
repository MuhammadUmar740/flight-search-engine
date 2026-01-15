import Image from "next/image";
import BgImage from "@/public/images/header-bg.png";
import React from "react";

const Header = () => {
  return (
    <section className="relative h-dvh md:h-175 xl:h-screen overflow-hidden flex items-start md:items-center">
      <Image
        width={1500}
        height={1200}
        src={BgImage}
        alt="travel around globe"
        className="absolute -right-[20%] md:-right-1/4 -bottom-[10%] md:top-0 size-4/5 md:size-full object-cover md:rotate-0 rotate-25"
      />
      <div className="container p-5 mx-auto font-bold text-secondary relative py-20">
        <h1 className="text-primary text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-5 font-creepster">
          Search Flights <br /> Around the Globe
        </h1>
        <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bebas">
          With Flights Search Engine
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl">
          Your Guide to Stress-Free Adventures
        </p>
      </div>
    </section>
  );
};

export default Header;
