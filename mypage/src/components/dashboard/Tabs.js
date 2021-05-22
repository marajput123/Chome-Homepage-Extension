import React, { useState, useEffect } from "react";
import TabCard from "../card/TabCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCard from "../card/AddCard";
import Wellness from "../wellness/WellnessIcon";
import Loader from "../loader/Loader";
import { fetchGetLinks } from "../../fetch/fetchLinks";
import { connect } from "react-redux";

const useStyles = makeStyles({
  gridRoot: {
    width: "100% ",
    margin: "0px",
  },
  gridItem: {
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  fabRoot: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    display: "flex",
    flexDirection: "column",
  },
});

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(props.currentTab.title);
  const [linkData, setLinkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    const cb = (links) => {
      setLinkData([...links]);
      setIsLoading(false);
    };
    fetchGetLinks(props.currentTab.title, props.userId, cb);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  const reRenderState = () => {
    if (currentTab !== props.currentTab.title) {
      setCurrentTab(props.currentTab.title);
    }
  };
  reRenderState();

  const onHandleDelete = (id) => {
    setLinkData(linkData.filter((link) => link._id !== id));
  };

  const onHandleEdit = (newLink, id, isNew = false) => {
    const { title, imageUrl, url, tags } = newLink;
    const tempLink = {
      title: title,
      imgUrl: imageUrl,
      url: url,
      _id: id,
      tags: tags,
    };
    if (!isNew) {
      const index = linkData.findIndex((link) => link._id === id);
      linkData[index] = tempLink;
    } else {
      linkData.push(tempLink);
    }
    let updatedData = linkData;
    if (props.currentTab.title !== "Home") {
      updatedData = linkData.filter((link) =>
        link.tags.includes(props.currentTab.title)
      );
    }
    setLinkData([...updatedData]);
  };

  const mapTabCards = () => {
    return linkData.map((link) => {
      return (
        <React.Fragment key={link._id}>
          <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <TabCard
              link={link}
              onHandleDelete={onHandleDelete}
              onHandleEdit={onHandleEdit}
              _id={link._id}
            />
          </Grid>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader fullPage={false} />
      ) : (
        <Grid
          className={classes.gridRoot}
          container
          justify="center"
          spacing={4}
        >
          {mapTabCards()}
        </Grid>
      )}
      <div className={classes.fabRoot}>
        <AddCard handleEdit={onHandleEdit} />
        <Wellness />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return { userId: state.userId, currentTab: state.currentTab };
};

export default connect(mapStateToProps)(Tabs);
