import React, { useState, useEffect } from "react";
import MyTab from "./pages/MyTab";
import Login from "./pages/Login";
import { connect } from "react-redux";
import { userIdAction } from "../actions";

const App = (props) => {
  const [authCheck, setAuthCheck] = useState(null);
  useEffect(() => {
    const id = window.localStorage.getItem("myTab-userId");
    if (id) {
      props.userIdAction(id);
    }
    setAuthCheck("passed");
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {authCheck === "passed" ? (
        <div className="main-div">{!props.userId ? <Login /> : <MyTab />}</div>
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps, { userIdAction })(App);
