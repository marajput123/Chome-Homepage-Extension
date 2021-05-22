import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Input,
  InputAdornment,
  Collapse,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px 16px 10px 16px",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    flexGrow: 1,
    margin: "3px",
    color: "black",
    borderColor: "black",
  },
  input: {
    margin: "10px",
    color: "black",
  },
  innerAdorment: {
    "& .MuiTypography-colorTextSecondary": {
      color: "black",
    },
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    padding: "15px",
  },
}));

const Excersice = (props) => {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    show: false,
  });

  const validation = () => {
    if (
      time.hours < 0 ||
      time.minutes < 0 ||
      (time.minutes === 0 && time.hours === 0)
    ) {
      return true;
    }
  };

  const classes = useStyles();

  const renderInputs = () => {
    return (
      <>
        <Typography className={classes.root}>How many hours?</Typography>
        <div className={classes.inputWrapper}>
          <Input
            className={classes.input}
            value={time.hours}
            type="Number"
            variant="filled"
            id="Hours"
            endAdornment={
              <InputAdornment className={classes.innerAdorment} position="end">
                Hours
              </InputAdornment>
            }
            onChange={(e) => setTime({ ...time, hours: e.target.value })}
          />
          <Input
            className={classes.input}
            value={time.minutes}
            type="Number"
            variant="filled"
            id="Minutes"
            onChange={(e) => setTime({ ...time, minutes: e.target.value })}
            endAdornment={
              <InputAdornment className={classes.innerAdorment} position="end">
                Minutes
              </InputAdornment>
            }
          />
          <div className={classes.buttonGroup}>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              disabled={validation()}
              className={classes.button}
              variant="outlined"
              onClick={(e) => props.onHandleSave(time)}
            >
              Save
            </Button>
          </div>
        </div>
      </>
    );
  };

  const renderButtons = () => {
    return (
      <>
        <Typography className={classes.root}>
          Did you excersice today?
        </Typography>
        <div className={classes.buttonGroup}>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={(e) => props.onHandleSave(time)}
          >
            No
          </Button>
          <Button
            onClick={(e) => setTime({ ...time, show: true })}
            className={classes.button}
            variant="outlined"
          >
            Yes
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className={classes.main}>
      {!time.show ? renderButtons() : null}
      <Collapse in={time.show} timeout="auto" unmountOnExit>
        {renderInputs()}
      </Collapse>
    </div>
  );
};

export default Excersice;
