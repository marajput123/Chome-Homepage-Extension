import React, { useState } from "react";
import "../../static/css/editIcon.css";
import DeleteDialog from "../dialogs/DeleteDialog";
import EditDialog from "../dialogs/EditDialog";
import {
  Cancel as CancelIcon,
  Settings as SettingIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { Fab, ClickAwayListener } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import { red, blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles({
  settingIcon: {
    backgroundColor: blueGrey["300"],
    margin: "2px",
    "&.MuiFab-root": {
      boxShadow: "0px 0px 0px 0px",
    },
    "&:hover": {
      backgroundColor: blueGrey["600"],
    },
  },
  editIcon: {
    margin: "2px",
    "&.MuiFab-root": {
      boxShadow: "0px 0px 0px 0px",
    },
  },
  deleteIcon: {
    backgroundColor: red["A400"],
    margin: "2px",
    "&:hover": {
      backgroundColor: red["900"],
    },
    "&.MuiFab-root": {
      boxShadow: "0px 0px 0px 0px",
    },
  },
});

const CardEdit = (props) => {
  const [moveClass, setMoveClass] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const classes = useStyles();

  const handleDialogOpen = (isType) => {
    setMoveClass(false);
    isType === "delete" ? setDeleteConfirmation(true) : setOpenEdit(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirmation(false);
    props.onHandleDelete(id);
  };

  const handleEdit = (link, id) => {
    setOpenEdit(false);
    props.onHandleEdit(link, id);
  };

  return (
    <>
      <ClickAwayListener onClickAway={(e) => setMoveClass(false)}>
        <div className="container">
          <div
            onClick={(e) => setMoveClass(!moveClass)}
            className={`setting-icon ${moveClass ? "move" : ""}`}
          >
            <Fab size="small" color="secondary" className={classes.settingIcon}>
              <SettingIcon />
            </Fab>
          </div>
          <Fade
            size="small"
            direction="right"
            in={moveClass}
            mountOnEnter
            unmountOnExit
          >
            <div className="innerContainer">
              <Fab
                size="small"
                color="secondary"
                className={classes.editIcon}
                onClick={(e) => handleDialogOpen("edit")}
              >
                <EditIcon />
              </Fab>
              <Fab
                size="small"
                color="secondary"
                className={classes.deleteIcon}
                onClick={(e) => handleDialogOpen("delete")}
              >
                <CancelIcon />
              </Fab>
            </div>
          </Fade>
          {deleteConfirmation ? (
            <DeleteDialog
              handleDelete={handleDelete}
              isOpen={setDeleteConfirmation}
              link={props.link}
            />
          ) : null}
          {openEdit ? (
            <EditDialog
              isOpen={setOpenEdit}
              handleEdit={handleEdit}
              link={props.link}
              _id={props._id}
              isEdit={true}
            />
          ) : null}

          {/* <edit?  */}
          {/* <Dialog open={deleteConfirmation} onClose={handleConfirmationClose}>
            <DialogTitle>{`Delete Tab for ${props.site.title}`}</DialogTitle>
            <DialogActions className={classes.dialogButtons}>
              <Button
                onClick={handleConfirmationClose}
                variant="contained"
                color="secondary"
              >
                Nope.
              </Button>
              <Button
                onClick={handleDelete}
                color="secondary"
                variant="contained"
                autoFocus
              >
                Yes Please
              </Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </ClickAwayListener>
    </>
  );
};

export default CardEdit;
