import React, { useContext, useEffect, useState } from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import { Link } from "react-router-dom";

import { ReactComponent as Transceive } from "./transceive.svg";
import { ReactComponent as Idle } from "./idle.svg";
import "./Sidebar.css";
import { AppContext } from "../context/context";
import { setEdition } from "../context/actions";

const Navbar = () => {
  // switch to hamburger menu if the screen width is less than hamburgerMenuMaxWidth
  const hamburgerMenuMaxWidth = 950;
  const [useHamburgerMenu, setUseHamburgerMenu] = useState(
    window.innerWidth < hamburgerMenuMaxWidth
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  // monitor resize events and store the window width on a resize
  useEffect(() => {
    // TODO: add page to change editions that modifies the global
    // after the start of November, set the edition to the current year
    // otherwise revert to the last year (already completed) edition
    const currentDate = new Date(Date.now());
    const currentEdition =
      currentDate.getUTCMonth() >= 10
        ? currentDate.getUTCFullYear()
        : currentDate.getUTCFullYear() - 1;
    dispatch(setEdition(currentEdition));
    const handleResizeWindow = () =>
      setUseHamburgerMenu(window.innerWidth < hamburgerMenuMaxWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
    // eslint-disable-next-line
  }, []); // we don't want to add updateState to the dependency array

  const links = [
    { to: "/", name: "Home" },
    { to: "/editions", name: "Editions" },
    { to: `/${state.edition}/1117050`, name: "Messed Up" },
    { to: `/${state.edition}/782191`, name: "Demcon" },
    { to: "/about", name: "About" },
  ];

  return (
    <React.Fragment>
      {/* render a hamburger menu, as the width is smaller than some value */}
      {useHamburgerMenu && (
        <Menu
          isOpen={menuOpen}
          onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
        >
          {links.map((link, index) => (
            <Link key={index} to={link.to} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
        </Menu>
      )}
      <nav className="navbar bg-primary">
        <div
          style={{
            paddingLeft: useHamburgerMenu ? "40px" : "0px",
            display: "flex",
            minHeight: "52px",
          }}
        >
          <Link to="/">
            <p className="title">
              {"{ "}
              {state.edition}
              {" }"} - Advent of Code Leaderboard
            </p>
          </Link>
          {state.loading ? (
            <Transceive
              fill="limegreen"
              style={{ width: "40px", height: "40px", marginTop: "5px" }}
            />
          ) : (
            <Idle
              fill="white"
              style={{ width: "40px", height: "40px", marginTop: "5px" }}
            ></Idle>
          )}
        </div>
        {/* render a navbar menu, as the width is larger than some value */}
        {!useHamburgerMenu && (
          <div style={{ display: "flex" }}>
            {links.map((link, index) => (
              <Link key={index} to={link.to}>
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
