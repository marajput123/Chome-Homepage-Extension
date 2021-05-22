import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Switch } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import Sun from "../../static/images/svg/sun.svg";
import Moon from "../../static/images/svg/moon.svg";
import "../../static/css/switch.css";
import { connect } from "react-redux";
import { isDarkAction } from "../../actions";

const BlueSwtich = withStyles((theme) => ({
  root: {
    width: "65px",
    height: "43px",
    marginBottom: "2px",
    // marginTop: "3px",
  },
  switchBase: {
    "&$checked": {
      color: theme.sec,
    },
    "&$checked + $track": {
      backgroundColor: blue[900],
      border: "1px solid rgba(0, 0, 0, .7)",
    },
    "&$checked:hover": {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    "&$track": {
      border: "1px solid rgba(0, 0, 0, .7)",
      backgroundColor: "red",
    },
  },
  checked: {},
  track: {
    border: "1px solid rgba(0, 0, 0, .7)",
  },
  thumb: {
    width: "25px",
    height: "25px",
    border: "1px solid black",
  },
}))(Switch);

const ThemeSwitch = (props) => {
  return (
    <>
      <div className="switch-main-div">
        <div className="switch-theme">
          <img className="switch-theme-img" alt="" src={Sun} />
          <BlueSwtich
            checked={props.isDark ? true : false}
            onChange={(e) => props.isDarkAction(!props.isDark)}
            disableRipple={props.ripple ? false : true}
          />
          <img className="switch-theme-img" alt="" src={Moon} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isDark: state.isDark,
  };
};

export default connect(mapStateToProps, { isDarkAction })(ThemeSwitch);
