import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import {
  ExpandMore,
  ExpandLess,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: "10px",
  },
}));

const mood = [
  { label: "Awsome", score: 5, icon: <SentimentVerySatisfied /> },
  { label: "Happy", score: 4, icon: <SentimentSatisfiedAlt /> },
  { label: "So So", score: 3, icon: <SentimentSatisfied /> },
  { label: "Sad", score: 2, icon: <SentimentDissatisfied /> },
  { label: "Very Sad", score: 1, icon: <SentimentVeryDissatisfied /> },
];

const Day = (props) => {
  const [isOpen, setIsOpen] = useState(null);

  const classes = useStyles();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onMoodClick = (score) => {
    props.setMoodScore(score);
    props.setNext(true);
  };
  const renderList = () => {
    return mood.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <ListItem button onClick={(e) => onMoodClick(item.score)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <List className={classes.listItem}>
        <ListItem button onClick={handleClick}>
          <ListItemText primary={"How are you feeling right now?"} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List disablePadding>{renderList()}</List>
        </Collapse>
      </List>
    </>
  );
};

export default Day;
