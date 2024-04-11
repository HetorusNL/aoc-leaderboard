import { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../context/context";
import { setEdition } from "../context/actions";

const MainPage = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      {state.edition !== state.latestEdition && (
        <>
          {"Click "}
          <Link
            to="/"
            onClick={() => dispatch(setEdition(state.latestEdition))}
            className="hyperlink-color"
          >
            {`${state.latestEdition}`}
          </Link>
          {" to go to the latest edition"}
        </>
      )}
      <div>
        Click on one of the leaderboards in the navbar to show the leaderboard
        for edition <em>{state.edition}</em>.
      </div>
    </>
  );
};

export default MainPage;
