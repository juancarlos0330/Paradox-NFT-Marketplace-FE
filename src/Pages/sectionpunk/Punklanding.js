import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import isEmpty from "../../validations/is-empty";

const Punklanding = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (isEmpty(params.get("category"))) {
      setCategory("");
    } else {
      setCategory(params.get("category"));
    }
  }, []);

  return (
    <div className="punklanding">
      <div className="main">
        <h1>{category === "" ? "All" : category} Collection</h1>
        <span>
          Brought to life by Chris Wahl, our story follows the PUNKS (devout
          believers in crypto art's future) in their quest for the “Lost
          Robbies”, enigmatic relics of crypto art history. PUNKS endure
          kidnappings, clowns, anons, and the mysterious Elvis Punksley in what
          turns out to be a very wild ride.
        </span>
      </div>
    </div>
  );
};

export default Punklanding;
