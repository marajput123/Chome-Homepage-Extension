import React, { useState } from "react";
import {
  Paper,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import "../../static/css/setting.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import WarningIcon from "@material-ui/icons/Warning";
import { connect } from "react-redux";
import { userIdAction } from "../../actions";
import { fetchUserUpdate, fetchUserDelete } from "../../fetch/fetchLinks";
const useStyles = makeStyles({
  settingInputDiv: {
    margin: "10px",
    width: "90%",
  },
  settingTitle: {
    margin: "20px 0px 10px 0px",
  },
  logoutButton: {
    color: "red",
    borderColor: "red",
    margin: "30px 0px 10px 0px",
  },
  deleteButton: {
    color: "white",
    backgroundColor: "red",
    margin: "0px 0px 10px 0px",
    "&.MuiButton-contained:hover": {
      backgroundColor: "#cc0000",
    },
  },
});

const Setting = (props) => {
  const classes = useStyles();
  const [secretKey, setSecretKey] = useState("");
  const [isSaved, setIsSaved] = useState(true);
  const [keyError, setKeyError] = useState(false);
  // const isSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const onLogout = () => {
    window.localStorage.removeItem("myTab-userId");
    props.userIdAction(null);
  };

  const onSave = () => {
    const cb = () => {
      setSecretKey("");
      setIsSaved(true);
    };
    if (secretKey.length > 6) {
      fetchUserUpdate(props.userId, secretKey, cb);
      setKeyError(false);
    } else {
      setKeyError(true);
    }
  };

  const onUserDelete = () => {
    const cb = () => {
      onLogout();
    };

    fetchUserDelete(props.userId, cb);
  };

  return (
    <div className="setting-main-div">
      <Paper className="setting-paper" elevation={6}>
        <Typography className={classes.settingTitle} variant={"h4"}>
          User Setting
        </Typography>
        <div className={classes.settingInputDiv}>
          <TextField
            value={secretKey}
            onChange={(e) => {
              setSecretKey(e.target.value);
              setIsSaved(false);
            }}
            label="New User Key"
            variant="outlined"
            color="secondary"
            error={keyError ? true : false}
            helperText={keyError ? "Invalid Key" : "Change user secret key"}
            fullWidth
          />
          <Button
            onClick={onSave}
            fullWidth
            color="secondary"
            variant="contained"
            style={
              !isSaved && secretKey !== "" ? { backgroundColor: "red" } : null
            }
            disabled={isSaved || secretKey === "" ? true : false}
          >
            {isSaved || secretKey === "" ? "Saved" : "Save"}
          </Button>
          <Button
            className={classes.logoutButton}
            startIcon={<ExitToAppIcon />}
            fullWidth
            variant="outlined"
            onClick={onLogout}
          >
            Logout
          </Button>
          <Button
            className={classes.deleteButton}
            startIcon={<WarningIcon />}
            fullWidth
            variant="contained"
            onClick={onUserDelete}
          >
            Delete Account
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default connect(null, { userIdAction })(Setting);
