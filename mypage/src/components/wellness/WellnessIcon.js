import React, { useState } from "react";
import { Fab, useMediaQuery } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import WellnessDialog from "./WellnessDialog";
import { makeStyles } from "@material-ui/core/styles";
import Robot from "../../static/images/svg/robot.svg";

const useStyles = makeStyles((theme) => ({
  fabRoot: {
    margin: "10px",
    backgroundColor: green["500"],
    "& img": {
      width: "100%",
      height: "100%",
    },
    "&:hover": {
      backgroundColor: green["800"],
    },
  },
}));

const WellnessIcon = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const classes = useStyles();
  const isScreenSmall = useMediaQuery("(max-width:400px)");

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Fab
        color="secondary"
        size={isScreenSmall ? "small" : "large"}
        className={classes.fabRoot}
        onClick={(e) => setIsDialogOpen(true)}
      >
        <img src={Robot} alt="" />
      </Fab>
      {isDialogOpen ? (
        <WellnessDialog isDialogOpen={isDialogOpen} handleClose={handleClose} />
      ) : null}
    </>
  );
};

export default WellnessIcon;
