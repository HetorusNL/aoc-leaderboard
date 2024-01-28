import { useContext } from "react";
import { Context } from "../context/context";

const Editions = () => {
  const { edition } = useContext(Context);

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
