import React from "react";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons/";
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iosArrow: {
    zIndex: 1200,
    position: (props) => (!props.isBack ? "absolute" : null),
    width: "25px",
    padding: "3px",
    backgroundColor:
      theme.palette.type === "light" ? "rgba(0,0,0,.6)" : "rgba(255,255,255,1)",
    borderRadius: "0px 8px 8px 0px",
    color: theme.palette.type === "light" ? "white" : "grey",
    "& svg": {
      marginLeft: (props) => (props.isBack ? "3px" : null),
    },
  },
  iconButton: {
    minWidth: "45px",
    height: "45px",
    borderRadius: "50%",
  },
  loginButton: {
    margin: "7px 10px 7px 10px",
    width: "90%",
  },
}));

export const IosFoward = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Paper
        onClick={(e) => props.onClickChange(!props.currentState)}
        className={classes.iosArrow}
      >
        <ArrowForwardIos />
      </Paper>
    </>
  );
};

export const IosBackward = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <Paper
        onClick={(e) => props.onClickChange(!props.currentState)}
        className={classes.iosArrow}
      >
        <ArrowBackIos />
      </Paper>
    </>
  );
};

export const IconButton = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Button className={classes.iconButton}>{props.children}</Button>
    </>
  );
};

export const LoginButton = (props) => {
  const classes = useStyles();
  return (
    <>
      <Button
        disabled={props.isDisabled}
        onClick={props.handleClick}
        variant="outlined"
        className={classes.loginButton}
      >
        {props.value}
      </Button>
    </>
  );
};
