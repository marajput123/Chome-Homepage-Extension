import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";
import { IosFoward, IosBackward } from "../buttons/buttons";
import Weather from "../weather/Weather";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";
import "../../static/css/drawer.css";
import DropdownList from "../dropdown/DropdownList";
import { connect } from "react-redux";
import { drawerAction } from "../../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "240px",
    overflow: "unset",
  },
}));

const MainDrawer = (props) => {
  const { isDrawerOpen } = props;
  const classes = useStyles();

  const onHandleClose = () => {
    props.drawerAction(false);
  };

  return (
    <>
      <IosFoward
        onClickChange={props.drawerAction}
        currentState={isDrawerOpen}
        isBack={false}
      />

      <Drawer
        classes={{ paper: classes.paper }}
        open={props.isDrawerOpen ? true : false}
        onClose={onHandleClose}
      >
        <div className="drawer-main">
          <div className=" drawer-handle-close">
            <IosBackward
              onClickChange={props.drawerAction}
              currentState={isDrawerOpen}
              isBack={true}
            />
          </div>
          <div className="drawer-main-content">
            <div className="drawer-list">
              <DropdownList />
            </div>
            <div className={"drawer-options"}>
              <ThemeSwitch
                stateProp={props.stateProp}
                onChangeState={props.onChangeProp}
                ripple={false}
              />
              <Weather />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return { isDrawerOpen: state.isDrawerOpen };
};

export default connect(mapStateToProps, { drawerAction: drawerAction })(
  MainDrawer
);
