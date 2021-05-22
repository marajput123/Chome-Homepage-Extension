import React from "react";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  rootDiv: {
    width: (props) => (props.fullPage ? "100vw" : "100%"),
    height: (props) => (props.fullPage ? "100vh" : "300px"),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  linearLoader: {
    width: "50%",
    height: "9px",
    minWidth: "280px",
    borderRadius: "10px",
    margin: "10px 0px 10px 0px",
  },
  text: {
    color: grey["600"],
  },
});

const Loader = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.rootDiv}>
      <Typography className={classes.text} variant={"h4"}>
        Loading...
      </Typography>
      <LinearProgress className={classes.linearLoader} color="secondary" />
    </div>
  );
};

export default Loader;
