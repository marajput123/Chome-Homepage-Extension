import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import CardSetting from "./CardSetting";

const useStyles = makeStyles({
  card: {
    maxWidth: "260px",
    width: "fit-content",
    minWidth: "260px",
    display: "flex",
  },
  cardAction: {
    padding: "10px",
    height: "260px",
  },
  cardImage: {
    height: "200px",
    backgroundSize: "contain",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
  },
  cardImageDiv: {
    // paddingTop: "7px",
  },
  cardEdit: {
    marginTop: "5px",
  },
});

const TabCard = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.card}>
        <Card className={classes.card} elevation={6}>
          <CardActionArea className={classes.cardAction} href={props.link.url}>
            <CardMedia
              className={classes.cardImage}
              image={props.link.imgUrl}
            ></CardMedia>
            <CardContent className={classes.cardContent}>
              <Typography variant={"h5"}> {props.link.title} </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <div className={classes.cardEdit}></div>
        <CardSetting
          link={props.link}
          onHandleDelete={props.onHandleDelete}
          onHandleEdit={props.onHandleEdit}
          _id={props._id}
        />
      </div>
    </>
  );
};

export default TabCard;
