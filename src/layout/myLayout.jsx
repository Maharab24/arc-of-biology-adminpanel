import React from "react";
import { Outlet } from "react-router-dom";
import BackToTop from "../components/BackToTop";

const MyLayout = () => {
  return (
    <>
      <main className="min-h-screen ">
        <Outlet />
      </main>
      <BackToTop></BackToTop>
    </>
  );
};

export default MyLayout;