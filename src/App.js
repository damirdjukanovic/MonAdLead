import { useEffect } from "react";
import { loadUser } from "./actions/authActions";
import { connect, Provider } from "react-redux";
import configureStore from "./store";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import {
  Routes,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import { BallBeat } from "react-pure-loaders";
import IsAuth from "./components/isAuth/IsAuth";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Profile from "./pages/profile/Profile";
import Test from "./pages/Test";

function App(props) {
  const { isLoading } = props;

  if (isLoading) return <BallBeat />;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <IsAuth>
              <Home />
            </IsAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <IsAuth>
              <Home />
            </IsAuth>
          }
        />
        <Route
          path="/users"
          element={
            <IsAuth>
              <Users />
            </IsAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <IsAuth>
              <Profile />
            </IsAuth>
          }
        />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, null)(App);
