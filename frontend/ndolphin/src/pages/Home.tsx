import React from "react";
import BestRelay from "../components/home/relay/BestRelay";
import BestIf from "../components/home/if/BestIf";
import BestN from "../components/home/n/BestN";

const Home = () => {
  return (
    <div>
      <BestRelay />
      <div className="px-44 grid grid-cols-2">
        <BestIf />
        <BestN />
      </div>
    </div>
  );
};

export default Home;
