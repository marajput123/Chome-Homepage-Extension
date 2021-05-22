import React, { useState, useEffect } from "react";
import MainDrawer from "../drawer/MainDrawer";
import Dashboard from "../dashboard/Dashboard";
import { lightTheme, darkTheme } from "../../theme/theme";
import { Paper } from "@material-ui/core";
import {
  ThemeProvider,
  makeStyles,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import "../../static/css/dashboard.css";
import { connect } from "react-redux";
import FormDialog from "../form/FormDialog";
import { userTabsAction } from "../../actions";
import Loader from "../loader/Loader";

const useStyles = makeStyles({
  mainPaper: {
    minHeight: "100vh",
    borderRadius: "0px",
  },
});

const MyTab = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/tab/getTabs/${props.userId}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const tabs = result.response.map((tab) => {
          return { title: tab };
        });
        props.userTabsAction(tabs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderPage = () => {
    return (
      <>
        <Paper className={classes.mainPaper}>
          <FormDialog />
          <MainDrawer />
          <Dashboard />
        </Paper>
      </>
    );
  };

  return (
    <>
      <ThemeProvider
        theme={
          props.isDark
            ? responsiveFontSizes(darkTheme)
            : responsiveFontSizes(lightTheme)
        }
      >
        {/* <Loader fullPage={true} /> */}
        {isLoading ? <Loader /> : renderPage()}
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    openCreateModel: state.isCreateModelOpen,
    isDrawerOpen: state.isDrawerOpen,
    isDark: state.isDark,
    userId: state.userId,
  };
};

export default connect(mapStateToProps, { userTabsAction })(MyTab);
