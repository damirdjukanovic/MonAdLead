import { Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { BallBeat } from "react-pure-loaders";

const isAuth = ({ children, isAuthenticated, isLoading }) => {
  console.log(isLoading);
  if (isLoading) return <BallBeat />;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {})(isAuth);
