import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Chip, Typography, makeStyles, Button } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import "../../static/css/chips.css";

const useStyles = makeStyles({
  chip: {
    margin: "0px 5px 5px 5px",
  },
});

const findRemaingTags = (currentTags, allTags) => {
  return allTags.filter((tag) => !currentTags.includes(tag.title));
};

const TagChips = (props) => {
  const classes = useStyles();

  const [currentTags, setCurrentTags] = useState(props.currentTags);
  const [remainingTags, setRemainingTags] = useState(props.userTabs);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setRemainingTags(findRemaingTags(currentTags, remainingTags));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeTag = (tag) => {
    setIsSaved(false);
    setCurrentTags(currentTags.filter((t) => t !== tag));
    setRemainingTags([...remainingTags, { title: tag }]);
  };

  const addTag = (tag) => {
    setIsSaved(false);
    setCurrentTags([...currentTags, tag]);
    setRemainingTags(remainingTags.filter((t) => t.title !== tag));
  };

  const saveTags = () => {
    setIsSaved(true);
    props.setTags([...currentTags]);
  };

  const renderCurrentTags = () => {
    return currentTags.map((tag, index) => {
      return (
        <React.Fragment key={index}>
          <Chip
            className={classes.chip}
            label={tag}
            onDelete={() => removeTag(tag)}
          />
        </React.Fragment>
      );
    });
  };

  const renderAllTags = () => {
    findRemaingTags(currentTags, remainingTags);
    return remainingTags.map((tag, index) => {
      return (
        <React.Fragment key={index}>
          <Chip
            className={classes.chip}
            clickable
            color="secondary"
            label={tag.title}
            onDelete={() => addTag(tag.title)}
            deleteIcon={<Done />}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <div>
        <div className="chips-subDiv">
          <Typography>Link tags:</Typography>
          <Chip label={"Home"} disabled />
          {renderCurrentTags()}
        </div>
        <div className="chips-subDiv">
          <Typography>Available tags:</Typography>
          {renderAllTags()}
          {remainingTags.length === 0 ? (
            <Chip label="None Left" disabled />
          ) : null}
        </div>
      </div>
      <div>
        <Button
          style={
            isSaved
              ? { backgroundColor: "limegreen" }
              : { backgroundColor: "red" }
          }
          onClick={saveTags}
          color="secondary"
          variant="contained"
        >
          Save Tags
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userTabs: state.userTabs,
  };
};

export default connect(mapStateToProps)(TagChips);
