import { Component, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "../components/sidebar/sidebar";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase/config";
import Home from "./home";

interface IContent {
  navWidth: number;
  handleChangeWidth: () => void;
  shouldHideNavText: boolean;
  expandIcon: string;
  contentClassName: string;
}

const Content: React.FC<IContent> = (props) => {
  return (
    <>
      <SideBar
        width={props.navWidth}
        handleChangeWidth={props.handleChangeWidth}
        shouldHideNavText={props.shouldHideNavText}
        expandIcon={props.expandIcon}
      />
      <div
        className={props.contentClassName}
        style={{
          overflow: "hidden",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

interface P {}

interface S {
  navWidth: number;
  contentClassName: string;
  shouldHideNavText: boolean;
  expandIcon: string;
}

export default function CMS() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [navWidth, setNavWidth] = useState(80);
  const [contentClassName, setContentClassName] = useState(
    "content-container-expanded"
  );
  const [shouldHideNavText, setShouldHideNavText] = useState(true);
  const [expandIcon, setExpandIcon] = useState("right");

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
      } else {
        navigate("/login");
      }
    });
  }, []);

  function handleChangeWidth() {
    if (navWidth === 312) {
      setNavWidth(80);
      setContentClassName("content-container-expanded");
      setShouldHideNavText(true);
      setExpandIcon("right");
    } else {
      setNavWidth(312);
      setContentClassName("content-container-collapsed");
      setShouldHideNavText(false);
      setExpandIcon("left");
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Content
            navWidth={navWidth}
            contentClassName={contentClassName}
            shouldHideNavText={shouldHideNavText}
            expandIcon={expandIcon}
            handleChangeWidth={handleChangeWidth}
          >
            <Home />
          </Content>
        }
      />
    </Routes>
  );
}
