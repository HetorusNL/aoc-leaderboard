import React, { Fragment, useEffect, useState } from "react";
import packageJson from "../../../package.json";

const About = () => {
  const [version, setVersion] = useState("loading build date/time...");

  useEffect(() => {
    fetch("/meta.json", { cache: "no-store" })
      .then((response) => response.json())
      .then((meta) => {
        setVersion(meta.buildDateTime);
      });
  }, []);

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
    </Fragment>
  );
};

export default About;
