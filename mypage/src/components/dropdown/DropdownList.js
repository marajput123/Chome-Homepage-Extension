import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
  Tab as TabIcon,
  AddCircle as AddCircleIcon,
  PersonalVideo as PersonalVideoIcon,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  drawerAction,
  createModelAction,
  drawerListAction,
  currentTabAction,
} from "../../actions";

const data = [
  {
    title: "Home",
    img: (
      <>
        <HomeIcon />
      </>
    ),
  },
  {
    title: "My Profile",
    img: (
      <>
        <AccountBoxIcon />
      </>
    ),
  },
  {
    title: "My Tabs",
    img: (
      <>
        <TabIcon />
      </>
    ),
  },
];

const useStyle = makeStyles((theme) => ({
  sublist: {
    "& span": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  },
  subListMain: {
    width: "90%",
    float: "right",
  },

  listArrow: {
    display: "flex",
    backgroundColor: "red",
  },
}));

const DropdownList = (props) => {
  const { userTabs, isDrawerListOpen } = props;
  const classes = useStyle();

  const renderTabArrow = () => {
    return <>{isDrawerListOpen ? <ExpandLess /> : <ExpandMore />}</>;
  };

  const onButtonClick = (menuItem) => {
    if (
      menuItem.title === "My Page" ||
      menuItem.title === props.currentTab.title
    ) {
      return;
    }
    if (menuItem.title === "My Tabs") {
      props.drawerListAction(!isDrawerListOpen);
    } else {
      props.currentTabAction({ title: menuItem.title });
    }
  };

  const onEditClick = () => {
    props.drawerAction(false);
    props.createModelAction(true);
  };

  const renderSubList = () => {
    return userTabs.map((menuItem, index) => {
      return (
        <React.Fragment key={index}>
          <ListItem
            button
            onClick={(e) => onButtonClick(menuItem)}
            className={classes.sublist}
          >
            <ListItemIcon>
              <PersonalVideoIcon />
            </ListItemIcon>
            <ListItemText primary={menuItem.title} />
          </ListItem>
        </React.Fragment>
      );
    });
  };

  const renderList = () => {
    return data.map((menuItem, index) => {
      return (
        <React.Fragment key={index}>
          <ListItem
            button
            onClick={(e) => {
              onButtonClick(menuItem);
            }}
          >
            <ListItemIcon>{menuItem.img}</ListItemIcon>
            <ListItemText>{menuItem.title}</ListItemText>
            {menuItem.title === "My Tabs" ? renderTabArrow() : null}
          </ListItem>
          {menuItem.title === "My Tabs" ? (
            <Collapse in={isDrawerListOpen} unmountOnExit>
              <div className={classes.subListMain}>
                {renderSubList()}
                <ListItem
                  button
                  className={classes.sublist}
                  onClick={onEditClick}
                >
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add a category" />
                </ListItem>
              </div>
            </Collapse>
          ) : null}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      <List>{renderList()}</List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userTabs: state.userTabs,
    isDrawerListOpen: state.isDrawerListOpen,
    currentTab: state.currentTab,
  };
};

export default connect(mapStateToProps, {
  drawerAction: drawerAction,
  createModelAction: createModelAction,
  drawerListAction: drawerListAction,
  currentTabAction: currentTabAction,
})(DropdownList);
