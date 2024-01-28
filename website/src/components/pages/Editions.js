import { useContext } from "react";

import { AppContext } from "../context/context";

const Editions = () => {
  const { state } = useContext(AppContext);

  return (
    <>
      <p>Current edition: {state.edition}</p>
      <br />
      <p>
        <i>Under construction...</i>
      </p>
    </>
  );
};

export default Editions;
