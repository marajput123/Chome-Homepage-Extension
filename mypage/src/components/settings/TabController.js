import React from "react";
import {
  Paper,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
} from "@material-ui/core";
import "../../static/css/setting.css";
import { connect } from "react-redux";
import CancelIcon from "@material-ui/icons/Cancel";
import { userTabsAction } from "../../actions";
import { fetchDeleteTab } from "../../fetch/fetchTabs";

const TabController = (props) => {
  const onDelete = (deleteTab) => {
    const { userTabs, userId } = props;
    const cb = (tabTitle) => {
      props.userTabsAction(userTabs.filter((tab) => tab.title !== tabTitle));
    };
    fetchDeleteTab(deleteTab, userId, cb);
  };

  const renderTabs = () => {
    return props.userTabs.map((tab, index) => {
      return (
        <React.Fragment key={index}>
          <ListItem>
            <ListItem
              onClick={(e) => onDelete(tab.title)}
              button
              style={{ paddingRight: "35px", width: "25px" }}
            >
              <ListItemIcon>
                <CancelIcon style={{ color: "red" }} />
              </ListItemIcon>
            </ListItem>
            <ListItemText primary={tab.title} />
          </ListItem>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="setting-main-div">
      <Paper
        className="setting-paper"
        elevation={6}
        style={{ maxWidth: "300px" }}
      >
        <Typography variant={"h4"}>Delete Tabs</Typography>
        <div>
          <List style={{ maxWidth: "250px", overflow: "hidden" }}>
            {renderTabs()}
          </List>
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userTabs: state.userTabs,
  };
};

export default connect(mapStateToProps, { userTabsAction })(TabController);
