import React from "react";
import BestRelay from "../components/home/relay/BestRelay";
import BestIf from "../components/home/if/BestIf";
import BestN from "../components/home/n/BestN";
import BestBalance from "../components/home/balance/BestBalance";

const Home = () => {
  return (
    <div>
      <BestRelay />
      <div className="px-44 py-14 grid grid-cols-[3fr_2fr] gap-x-10 gap-y-16">
        <BestIf />
        <BestN />
        <BestBalance />
      </div>
    </div>
  );
};

export default Home;
