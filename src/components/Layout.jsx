import React from "react";
import Footer from "./footer/Footer";
import NavBar from "./navbar/NavBar";
import useIsOnline from "../hooks/useIsOnline";

const Layout = ({ children }) => {
  const isOnline = useIsOnline();
  return (
    <div className="h-100 d-flex flex-column">
      <NavBar isOnline={isOnline} />
      <main className="flex-grow-1">{children}</main>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
