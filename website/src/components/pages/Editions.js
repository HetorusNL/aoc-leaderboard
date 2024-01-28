import { useContext } from "react";
import { AppContext } from "../context/context";

const Editions = () => {
  const { edition } = useContext(AppContext);

  return (
    <>
      <p>Current edition: {edition}</p>
      <br />
      <p>
        <i>Under construction...</i>
      </p>
    </>
  );
};

export default Editions;
