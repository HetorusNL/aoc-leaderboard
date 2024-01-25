import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Leaderboard from "./components/pages/Leaderboard";
import Editions from "./components/pages/Editions";

function RootNode() {
  return (
    <>
      <Navbar />
      <div
        style={{ fontFamily: "Source Code Pro, monospace", color: "#cccccc" }}
      >
        <Outlet />
      </div>
    </>
  );
}

function MainPage() {
  return <div>Click on one of the leaderboards to show them.</div>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootNode />}>
        <Route index element={<MainPage />} />
        <Route path=":edition/:leaderboard" element={<Leaderboard />} />
        <Route path="editions" element={<Editions />} />
        <Route path="about" element={<About />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
