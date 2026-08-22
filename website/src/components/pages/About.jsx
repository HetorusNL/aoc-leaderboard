import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import packageJson from "../../../package.json";

import { apiClearCache } from "../utils/api";
import { AppContext } from "../context/context";
import { setLoading } from "../context/actions";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");
  const [clearCacheResult, setClearCacheResult] = useState("not performed");
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

  const clearCache = async () => {
    try {
      dispatch(setLoading(true));
      setClearCacheResult("clearing...");
      const response = await apiClearCache();
      setClearCacheResult(response.data.result);
      dispatch(setLoading(false));
    } catch {
      setClearCacheResult("failure");
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <h1>About this website</h1>
      <p>
        This website shows the Advent of Code Leaderboards for the Messed Up and
        Demcon private leaderboards.
      </p>
      <p>
        For the source code of this website (and API) visit:
        <br />
        <Link
          to="https://github.com/HetorusNL/aoc-leaderboard"
          className="hyperlink-color"
        >
          https://github.com/HetorusNL/aoc-leaderboard
        </Link>
      </p>
      <br />
      <p>
        <i>Version: {packageJson.version}</i>
      </p>
      <p>
        <i>Build date/time (local timezone): {version}</i>
      </p>
      <br />
      <div>
        <div className="btn" onClick={() => clearCache()}>
          Clear AoC API cache
        </div>
        Clear cache result: {clearCacheResult}
      </div>
    </Fragment>
  );
};

export default About;
