import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";

function RootNode() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function MainPage() {
  return <div>Click on one of the leaderboards to show them.</div>;
}

function Leaderboard() {
  let params = useParams();
  let leaderboard = params.leaderboard;
  return <div>Rendering leaderboard: {leaderboard}</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootNode />}>
        <Route index element={<MainPage />} />
        <Route path=":leaderboard" element={<Leaderboard />} />
        <Route path="about" element={<About />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
