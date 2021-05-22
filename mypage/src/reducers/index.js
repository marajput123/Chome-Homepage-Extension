import { combineReducers } from "redux";

const tabs = ["Work"];

// OPEN DRAWER REDUCER
const drawerOpenReducer = (isDrawerOpen = false, action) => {
  if (action.type === "OPEN_DRAWER") {
    return action.payload.isOpen;
  }
  return isDrawerOpen;
};

// OPEN CREATE DIALOG REDUCER
const openCreateModelReducer = (openCreateModel = false, action) => {
  if (action.type === "OPEN_CREATE_MODEL") {
    return action.payload.isOpen;
  }
  return openCreateModel;
};

// STORE USER CUSTOM TABS REDUCER
const userTabsReducer = (userTabs = tabs, action) => {
  if (action.type === "USER_TABS") {
    return [...action.payload.userTabs];
  }
  return userTabs;
};

//STOER USER ID RECUDER
const userIdReducer = (userId = null, action) => {
  if (action.type === "USER_ID") {
    return action.payload.userId;
  }
  return userId;
};

// STORE CURRENT TAB
const currentTabReducer = (currentTab = { title: "Home" }, action) => {
  if (action.type === "CURRENT_TAB") {
    return action.payload.currentTab;
  } else {
    return currentTab;
  }
};

//STORE THE CURRENT THEME
const openDrawerListReducer = (isOpen = false, action) => {
  if (action.type === "OPEN_DRAWER_DROPDOWNLIST") {
    return action.payload.isOpen;
  }
  return isOpen;
};

const isDarkReducer = (isDark = false, action) => {
  if (action.type === "THEME_SWITCH") {
    return action.payload.isDark;
  }
  return isDark;
};

export default combineReducers({
  //OPEN DRAWER REDUCER
  isDrawerOpen: drawerOpenReducer,
  //OPEN CREATE MODAL
  isCreateModelOpen: openCreateModelReducer,
  //OPEN DRAWER DROPDOWN LIST
  isDrawerListOpen: openDrawerListReducer,
  //STORE ALL USER "MY TABS"
  userTabs: userTabsReducer,
  //STORE USER ID
  userId: userIdReducer,
  //STORE CURRENT TAB
  currentTab: currentTabReducer,
  //STORE CURRENT THEME
  isDark: isDarkReducer,
});
