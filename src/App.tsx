import React, { Component } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./lib/PrivateRoute";

import ConnectivityListener from "./components/ConnectivityListener";
import SideBar from "./components/sidebar/sidebar";
import About from "./screens/about";
import Settings from "./screens/settings";
import Signout from "./screens/signout";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Home from "./screens/home";

import { AuthProvider } from "./contexts/AuthContext";

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

class App extends Component<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      navWidth: 80,
      contentClassName: "content-container-expanded",
      shouldHideNavText: true,
      expandIcon: "right",
    };

    this.handleChangeWidth = this.handleChangeWidth.bind(this);
  }

  handleChangeWidth() {
    if (this.state.navWidth === 312) {
      this.setState({
        navWidth: 80,
        contentClassName: "content-container-expanded",
        shouldHideNavText: true,
        expandIcon: "right",
      });
    } else {
      this.setState({
        navWidth: 312,
        contentClassName: "content-container-collapsed",
        shouldHideNavText: false,
        expandIcon: "left",
      });
    }
  }

  render() {
    const { navWidth, contentClassName, shouldHideNavText, expandIcon } =
      this.state;

    const { handleChangeWidth } = this;

    const protectedRoutes = [
      { route: "/about", component: <Home /> },
      { route: "/settings", component: <Settings /> },
    ];

    return (
      <Router>
        <div className="App">
          <AuthProvider>
            <ConnectivityListener />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Signout />} />
              <Route path="/about" element={<About />} />

              {protectedRoutes.map((item) => {
                return (
                  <Route
                    path="/*"
                    element={
                      <PrivateRoute location="/">
                        <Content
                          navWidth={navWidth}
                          contentClassName={contentClassName}
                          shouldHideNavText={shouldHideNavText}
                          expandIcon={expandIcon}
                          handleChangeWidth={handleChangeWidth}
                        >
                          {item.component}
                        </Content>
                      </PrivateRoute>
                    }
                    key={item.route}
                  />
                );
              })}
            </Routes>
          </AuthProvider>
        </div>
      </Router>
    );
  }
}

export default App;
