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

import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Profile from "./pages/profile/Profile";
import Test from "./pages/Test";

function App(props) {
  const { isAuthenticated } = props;

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(App);
