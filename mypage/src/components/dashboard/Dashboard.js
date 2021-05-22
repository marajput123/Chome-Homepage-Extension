import React from "react";
import Profile from "./Profile";
import Tabs from "./Tabs";
import { Typography, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles({
  toolbarRoot: {
    justifyContent: "center",
  },
});

const Dashboard = (props) => {
  const classes = useStyles();
  return (
    <>
      <Toolbar className={classes.toolbarRoot}>
        <Typography variant={"h4"}>{props.currentTab.title}</Typography>
      </Toolbar>
      <>{props.currentTab.title === "My Profile" ? <Profile /> : <Tabs />}</>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentTab: state.currentTab,
  };
};

export default connect(mapStateToProps)(Dashboard);
