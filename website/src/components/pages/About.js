import React, { Fragment, useContext, useEffect, useState } from "react";
import packageJson from "../../../package.json";
import { apiClearCache } from "../utils/api";
import { AppContext } from "../context/context";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");
  const [clearCacheResult, setClearCacheResult] = useState("not performed");
  const { updateState } = useContext(AppContext);

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

  const clearCache = async () => {
    try {
      updateState({ loading: true });
      const response = await apiClearCache();
      setClearCacheResult(response.data.result);
      updateState({ loading: false });
    } catch {
      setClearCacheResult("failure");
    }
  };

  return (
    <Fragment>
      <h1>About this website</h1>
      <p>
        This website shows the Advent of Code Leaderboards for the Messed Up and
        Demcon private leaderboards.
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
