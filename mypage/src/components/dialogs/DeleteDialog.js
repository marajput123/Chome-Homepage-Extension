import React from "react";
import "../../static/css/editIcon.css";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchDeleteLink } from "../../fetch/fetchLinks";

const useStyles = makeStyles((theme) => ({
  dialogButtons: {
    justifyContent: "center",
  },
}));

const DeleteDialog = (props) => {
  const { handleDelete, link, isOpen } = props;
  const classes = useStyles();

  const onDelete = () => {
    const userId = props.userId;
    const cb = () => {
      isOpen(false);
      handleDelete(link._id);
    };
    fetchDeleteLink(userId, link._id, cb);
  };

  return (
    <>
      <Dialog open={true} onClose={(e) => isOpen(false)}>
        <DialogTitle>{`Delete Tab for ${props.link.title}`}</DialogTitle>
        <DialogActions className={classes.dialogButtons}>
          <Button
            onClick={(e) => isOpen(false)}
            variant="contained"
            color="secondary"
          >
            Nope.
          </Button>
          <Button
            onClick={onDelete}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Yes Please
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return { userId: state.userId };
};

export default connect(mapStateToProps)(DeleteDialog);
