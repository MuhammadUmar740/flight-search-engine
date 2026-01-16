import Image from "next/image";
import BgImage from "@/public/images/header-bg.png";
import React from "react";

const Header = () => {
  return (
    <section className="relative overflow-hidden">
      <Image
        width={1500}
        height={1200}
        src={BgImage}
        alt="travel around globe"
        className="absolute -right-[20%] md:-right-1/4 top-0 size-full object-contain"
      />
      <div className="size-full bg-white/50 top-0 left-0 absolute md:hidden" />
      <div className="container p-5 mx-auto font-bold text-secondary relative py-20 2xl:py-40">
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
