import React, { Fragment, useEffect, useState } from "react";
import packageJson from "../../../package.json";
import { apiClearCache } from "../utils/api";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");
  const [clearCacheResult, setClearCacheResult] = useState(
    "no clear cache performed"
  );

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

  const clearCache = async () => {
    try {
      const response = await apiClearCache();
      setClearCacheResult(response.data.result);
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
      <br></br>
      <p>
        <i>Version: {packageJson.version}</i>
      </p>
      <p>
        <i>Build date/time (local timezone): {version}</i>
      </p>
      <br></br>
      <div>
        <div className="btn" onClick={() => clearCache()}>
          Clear cache
        </div>
        Clear cache result: {clearCacheResult}
      </div>
    </Fragment>
  );
};

export default About;
