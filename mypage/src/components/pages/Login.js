import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  makeStyles,
  Paper,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import login from "../auth";
import { lightTheme } from "../../theme/theme";
import { LoginButton } from "../buttons/buttons";
import { connect } from "react-redux";
import "../../static/css/login.css";
import { userIdAction } from "../../actions";

const useStyles = makeStyles({
  inputs: {
    margin: "10px",
  },
});

const KeyDialog = (props) => {
  const { name, date, favoriteFood } = props.credentials;
  const secretKey = () => {
    return (
      name[0].toUpperCase() +
      name.slice(1) +
      "-" +
      date +
      "-" +
      favoriteFood
    ).replace(/\s+/g, "");
  };
  return (
    <div>
      <Paper className="paper-dialog">
        <Typography variant={"h5"} style={{ padding: "5px" }}>
          Your secret Id is:
        </Typography>
        <Typography variant={"h5"} style={{ paddingBottom: "5px" }}>
          {secretKey()}
        </Typography>
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          onClick={(e) => props.userIdAction(props.userId)}
        >
          Got It
        </Button>
      </Paper>
    </div>
  );
};

const Login = (props) => {
  const [error, setError] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    date: "",
    favoriteFood: "",
  });
  const [secretKey, setSecretKey] = useState("");
  const [keyDialog, setKeyDialog] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setError(false);
  }, [isMember]);

  const handleSignIn = () => {
    const cb = (id, error = false) => {
      if (!error) {
        window.localStorage.setItem("myTab-userId", id);
        if (isMember) props.userIdAction(id);
        else {
          setKeyDialog(id);
        }
      }
      setError(true);
    };
    if (isMember) {
      login(isMember, secretKey, cb);
    } else {
      login(isMember, credentials, cb);
    }
  };

  const handleNavigate = () => {
    setIsMember(!isMember);
  };

  const isDisabled = () => {
    if (
      credentials.date === "" ||
      credentials.favoriteFood === "" ||
      credentials.name === ""
    ) {
      return true;
    }
    return false;
  };
  const renderSignIn = () => {
    return (
      <>
        <Typography className={classes.inputs} variant={"h5"}>
          Login
        </Typography>
        <TextField
          error={error ? true : false}
          helperText={error ? "Incorrect Key" : null}
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          variant="outlined"
          color="secondary"
          label="Secret Key"
          className={classes.inputs}
        />
        <LoginButton
          isDisabled={secretKey === "" ? true : false}
          value={"Sign in"}
          handleClick={handleSignIn}
        />
        <LoginButton value={"Back"} handleClick={handleNavigate} />
      </>
    );
  };

  const renderSignUp = () => {
    if (keyDialog) {
      return (
        <>
          <KeyDialog
            credentials={credentials}
            userId={keyDialog}
            userIdAction={props.userIdAction}
          />
        </>
      );
    } else {
      return (
        <>
          <Typography className={classes.inputs} variant={"h5"}>
            Create a user!
          </Typography>
          <TextField
            value={credentials.name}
            onChange={(e) =>
              setCredentials({ ...credentials, name: e.target.value })
            }
            label="Name"
            variant="filled"
            className={classes.inputs}
            color="secondary"
          ></TextField>
          <div className="date-div">
            <TextField
              value={credentials.date}
              onChange={(e) =>
                setCredentials({ ...credentials, date: e.target.value })
              }
              id="date"
              label="Birthday"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              color="secondary"
            />
          </div>
          <TextField
            value={credentials.favoriteFood}
            onChange={(e) =>
              setCredentials({ ...credentials, favoriteFood: e.target.value })
            }
            className={classes.inputs}
            label="Favorite Food"
            variant="filled"
            color="secondary"
          ></TextField>

          <LoginButton
            isDisabled={isDisabled() ? true : false}
            handleClick={handleSignIn}
            value={"Sign up!"}
          />
          <LoginButton handleClick={handleNavigate} value={"Already a user?"} />
        </>
      );
    }
  };
  return (
    <>
      <Paper className="mainDiv">
        <ThemeProvider theme={lightTheme}>
          <Paper className="paper" elevation={5}>
            {isMember ? renderSignIn() : renderSignUp()}
          </Paper>
        </ThemeProvider>
      </Paper>
    </>
  );
};

export default connect(null, { userIdAction })(Login);
