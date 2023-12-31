import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Leaderboard = () => {
  const params = useParams();
  const leaderboard = params.leaderboard;
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: stuff here
    setData([{ leaderboard: leaderboard }]);
  }, [leaderboard]);

  return (
    <>
      <div>Rendering leaderboard: {leaderboard}</div>
      {JSON.stringify(data)}
    </>
  );
};

export default Leaderboard;
