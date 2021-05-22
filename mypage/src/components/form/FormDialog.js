import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import {
  drawerAction,
  createModelAction,
  drawerListAction,
  userTabsAction,
} from "../../actions";
import { makeStyles } from "@material-ui/core/styles";
import { fetchPostTab } from "../../fetch/fetchTabs";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    [theme.breakpoints.down("sm")]: {
      "& .MuiDialog-scrollPaper": {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      },
      "& .MuiDialog-paper": {
        margin: "2px",
      },
    },
  },
}));

const FormDialog = (props) => {
  const [input, setInput] = useState("");
  const classes = useStyles();

  const onSave = () => {
    const cb = () => {
      const tabs = [...props.userTabs, { title: input }];
      props.userTabsAction(tabs);
      setInput("");
      onHandleClose();
    };
    fetchPostTab(input, props.userId, cb);
  };

  const onHandleClose = (e) => {
    props.createModelAction(false);
    props.drawerAction(true);
    props.drawerListAction(true);
  };

  return (
    <>
      <Dialog
        open={props.isCreateModelOpen}
        onClose={onHandleClose}
        className={classes.dialogRoot}
      >
        <DialogTitle id="alert-dialog-slide-title">Add Tab</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Add a new tab category. If you wish delete a current saved category,
            please do so in My Profile.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            margin="dense"
            label="Category Name"
            type="text"
            name="category name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            color="secondary"
            fullWidth
          />
          <DialogActions>
            <Button
              color="secondary"
              variant="outlined"
              onClick={onHandleClose}
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={input ? false : true}
              color="secondary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isCreateModelOpen: state.isCreateModelOpen,
    userTabs: state.userTabs,
    userId: state.userId,
  };
};

export default connect(mapStateToProps, {
  drawerAction,
  createModelAction,
  drawerListAction,
  userTabsAction,
})(FormDialog);
