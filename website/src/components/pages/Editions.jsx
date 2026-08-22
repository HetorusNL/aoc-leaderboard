import { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/context";
import { setEdition } from "../context/actions";

const EditionValues = () => {
  const { state } = useContext(AppContext);
  var editions = [];
  for (var i = state.latestEdition; i >= state.initialEdition; i--) {
    editions.push(i);
  }
  return editions;
};

const Editions = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <p>
        Current edition: <em>{state.edition}</em>
      </p>
      <br />
      <p>Available editions:</p>
      {EditionValues().map((edition) => (
        <p key={edition}>
          <Link
            to="/"
            onClick={() => dispatch(setEdition(edition))}
            className="hyperlink-color"
          >
            {`[${edition}]`}
          </Link>
        </p>
      ))}
    </>
  );
};

export default Editions;
