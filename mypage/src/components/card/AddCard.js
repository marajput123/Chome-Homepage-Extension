import React, { useState } from "react";
import { Fab, useMediaQuery } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import EditDialog from "../dialogs/EditDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fabRoot: {
    margin: "10px",
  },
}));

const AddCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const isScreenSmall = useMediaQuery("(max-width:400px)");

  const onAddClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Fab
        color="secondary"
        size={isScreenSmall ? "small" : "large"}
        className={classes.fabRoot}
        onClick={onAddClick}
      >
        <Add />
      </Fab>
      {isOpen ? (
        <EditDialog
          isEditing={false}
          isOpen={setIsOpen}
          handleEdit={props.handleEdit}
        />
      ) : null}
    </>
  );
};

export default AddCard;
