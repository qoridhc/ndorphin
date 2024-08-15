import React from "react";
import BestRelay from "../components/home/relay/BestRelay";
import BestIf from "../components/home/if/BestIf";
import BestN from "../components/home/n/BestN";
import BestBalance from "../components/home/balance/BestBalance";

const Home = () => {
  return (
    <div>
      <BestRelay />
      <BestBalance />
      <div className="px-44 pb-32 grid grid-cols-2 gap-x-3">
        <BestIf />
        <BestN />
      </div>
    </div>
  );
};

export default Home;
