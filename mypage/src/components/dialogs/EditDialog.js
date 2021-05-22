import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { fetchPostLink, fetchEditLinks } from "../../fetch/fetchLinks";
import { connect } from "react-redux";
import TagChips from "../chips/TagChips";

const EditDialog = (props) => {
  const { link, isOpen, handleEdit, _id, isEdit } = props;
  const [title, setTitle] = useState(`${isEdit ? link.title : ""}`);
  const [url, setUrl] = useState(`${isEdit ? link.url : ""}`);
  const [imgUrl, setImgUrl] = useState(`${isEdit ? link.imgUrl : ""}`);
  const [tags, setTags] = useState(isEdit ? [...link.tags] : []);

  const onSave = () => {
    const newlink = { title: title, url: url, imageUrl: imgUrl, tags: tags };
    const userId = props.userId;
    const cb = (newId = null) => {
      isOpen(false);
      if (isEdit) {
        handleEdit(newlink, _id);
      } else {
        handleEdit(newlink, newId, tags, true);
      }
    };
    if (isEdit) {
      fetchEditLinks(_id, userId, newlink, cb);
    } else {
      fetchPostLink(userId, newlink, cb);
    }
  };

  const isButtonDisabled = () => {
    if (title === "" || url === "" || imgUrl === "") return true;
    return false;
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={(e) => {
          isOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {isEdit ? "Edit Tab" : "New Tab"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit ? "Edit the selected link. " : "Create new link. "}
            The field marked with * are required.
          </DialogContentText>
          <TextField
            color="secondary"
            margin="dense"
            id="site-title"
            label="Title"
            type="text"
            value={title}
            fullWidth
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required={true}
            color="secondary"
            margin="dense"
            id="site-link"
            label="Link Url"
            type="text"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <TextField
            required={true}
            color="secondary"
            margin="dense"
            id="site-ImageUrl"
            label="Image Url"
            type="text"
            fullWidth
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <TagChips setTags={setTags} currentTags={tags} />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={(e) => isOpen(false)}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            disabled={isButtonDisabled() ? true : false}
            variant="contained"
            onClick={onSave}
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const mapStateToProps = (state) => {
  return { userId: state.userId, userTabs: state.userTabs };
};

export default connect(mapStateToProps)(EditDialog);
