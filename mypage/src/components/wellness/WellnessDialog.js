import React, { useState } from "react";
import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import Day from "./Day";
import Exercise from "./Exercise";
import { fetchPostWellness } from "../../fetch/fetchWellness";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    "& .MuiDialog-paper": {
      margin: "15px",
    },
    "& .MuiDialogTitle-root": {
      padding: "5px",
      backgroundColor: "#85FFBD",
      backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
      color: "black",
    },
    "& .MuiSvgIcon-root": {
      color: "black",
    },
  },
}));

const WellnessDialog = (props) => {
  const [next, setNext] = useState(false);
  const [moodScore, setMoodScore] = useState(null);

  const onHandleSave = (time) => {
    const data = {
      moodScore: moodScore,
      exercise: {
        hours: time.hours,
        minutes: time.minutes,
      },
    };
    fetchPostWellness(data, props.userId);
    props.handleClose();
  };

  const classes = useStyles();
  return (
    <>
      <Dialog
        className={classes.dialogRoot}
        open={props.isDialogOpen}
        onClose={props.handleClose}
      >
        <DialogTitle>
          {next ? (
            <Exercise
              onHandleSave={onHandleSave}
              handleClose={props.handleClose}
            />
          ) : (
            <Day setNext={setNext} setMoodScore={setMoodScore} />
          )}
        </DialogTitle>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.userId,
  };
};

export default connect(mapStateToProps)(WellnessDialog);
