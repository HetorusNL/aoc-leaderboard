import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiLeaderboard } from "../utils/api";
import "../../aoc-style.css";
import { AppContext } from "../context/context";

const Leaderboard = () => {
  const params = useParams();
  const edition = params.edition;
  const leaderboard = params.leaderboard;
  const [data, setData] = useState(null);
  const { loading, updateState } = useContext(AppContext);

  const NUM_DAYS = 25;

  useEffect(() => {
    console.log("firing useEffect");
    const fetchData = async () => {
      updateState({ loading: true });
      const result = await apiLeaderboard(edition, leaderboard);
      updateState({ loading: false });
      const apiData = result.data;
      if (apiData.data == null) {
        return;
      }
      const aocData = apiData.data.members;
      setData(aocData);
    };
    fetchData();
    // eslint-disable-next-line
  }, [leaderboard, edition]); // we don't want to add updateState to the dependency array

  const parsedLeaderboardData = () => {
    // convert the dictionary data to an array so we can sort it
    const items = Object.entries(data).map(([key, value]) => {
      return [key, value];
    });
    // sort the array based on the local_score of the user
    items.sort((first, second) => {
      return first[1].local_score < second[1].local_score;
    });
    return items;
  };

  const dayHeaders = () => {
    const rows = [];
    for (let i = 0; i < NUM_DAYS; i++) {
      rows.push(
        <th key={i}>
          <nobr>Day {i + 1}</nobr>
        </th>
      );
    }
    return rows;
  };

  const dayRows = (levels) => {
    const rows = [];
    for (let i = 0; i < NUM_DAYS; i++) {
      const day = i + 1;
      const level = levels[`${day}`];
      if (level === undefined) {
        rows.push(<td key={i}></td>);
        continue;
      }
      const part1 = level["1"]
        ? levelDuration(day, level["1"].get_star_ts)
        : "No Part 1";
      const part2 = level["2"]
        ? levelDuration(day, level["2"].get_star_ts)
        : "No Part 2";
      rows.push(
        <td key={i}>
          <nobr className="day-1-color">{part1}</nobr>
          <br />
          <nobr className="day-2-color">{part2}</nobr>
        </td>
      );
    }
    return rows;
  };
  const levelDuration = (day, timestamp) => {
    // monthIndex = 0-11 => december = 11
    const startTime = Date.UTC(edition, 11, day, 5, 0, 0);
    // the timestamp from AoC is in seconds
    let timeDifference = timestamp - startTime / 1000;
    const seconds = (timeDifference % 60).toString().padStart(2, "0");
    timeDifference = Math.floor(timeDifference / 60);
    const minutes = (timeDifference % 60).toString().padStart(2, "0");
    const hours = Math.floor(timeDifference / 60)
      .toString()
      .padStart(2, "0");
    const result = hours + ":" + minutes + ":" + seconds;
    return result;
  };

  return (
    // steal the font and color used on the AoC website
    <>
      {loading ? (
        <div style={{ marginBottom: "1em" }}>
          Loading leaderboard and completion times for AoC leaderboard{" "}
          <em>{leaderboard}</em> and edition <em>{edition}...</em>
        </div>
      ) : (
        <>
          {data ? (
            // we have data, so render the leaderboard
            <>
              <div style={{ marginBottom: "1em" }}>
                Showing leaderboard and completion times for AoC leaderboard{" "}
                <em>{leaderboard}</em> and edition <em>{edition}</em>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Score</th>
                    <th>Stars</th>
                    {dayHeaders()}
                  </tr>
                </thead>
                <tbody>
                  {parsedLeaderboardData().map(([key, value]) => (
                    <tr key={key}>
                      <th>
                        <nobr>{value.name}</nobr>
                      </th>
                      <td>{value.local_score}</td>
                      <td>{value.stars}</td>
                      {dayRows(value.completion_day_level)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div>
              No leaderboard available for leaderboard <em>{leaderboard}</em>{" "}
              and edition <em>{edition}</em>!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Leaderboard;
