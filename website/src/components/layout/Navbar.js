import React, { useEffect, useState } from "react";
import Menu from "react-burger-menu/lib/menus/slide";
import { Link } from "react-router-dom";

import { ReactComponent as Transceive } from "./transceive.svg";
import { ReactComponent as Idle } from "./idle.svg";
import "./Sidebar.css";

const Navbar = () => {
  // switch to hamburger menu if the screen width is less than hamburgerMenuMaxWidth
  const hamburgerMenuMaxWidth = 775;
  const [useHamburgerMenu, setUseHamburgerMenu] = useState(
    window.innerWidth < hamburgerMenuMaxWidth
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // monitor resize events and store the window width on a resize
  useEffect(() => {
    setLoading(false);
    const handleResizeWindow = () =>
      setUseHamburgerMenu(window.innerWidth < hamburgerMenuMaxWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);

  const links = [
    { to: "/", name: "Home" },
    { to: "/1117050", name: "Messed Up" },
    { to: "/782191", name: "Demcon" },
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
            paddingLeft: useHamburgerMenu ? "50px" : "0px",
            display: "flex",
          }}
        >
          <Link to="/">
            <h1>Advent of Code Leaderboard</h1>
          </Link>
          {loading ? (
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
