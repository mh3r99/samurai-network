import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import { useEffect } from "react";
import { initializeApp } from "./redux/app-reducer";
import { connect, Provider } from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const App = (props) => {
  useEffect(() => {
    props.initializeApp();
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);
    return () => {
      window.removeEventListener("unhandledrejection", catchAllUnhandledErrors);
    };
  }, []);

  const catchAllUnhandledErrors = (reason, promise) => {
    console.log("reason", reason);
    console.log("promise", promise);
  };

  if (!props.initialized) {
    return <Preloader />;
  }

  return (
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/profile/*" element={<ProfileContainer />} />
          <Route path="/profile/:userId" element={<ProfileContainer />} />
          <Route path="/users/*" element={<UsersContainer />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = connect(mapStateToProps, { initializeApp })(App);

const SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};
export default SamuraiJSApp;
