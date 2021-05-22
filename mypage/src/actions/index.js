export const drawerAction = (isOpen) => {
  return {
    type: "OPEN_DRAWER",
    payload: {
      isOpen: isOpen,
    },
  };
};

export const createModelAction = (isOpen) => {
  return {
    type: "OPEN_CREATE_MODEL",
    payload: {
      isOpen: isOpen,
    },
  };
};

export const userIdAction = (userId) => {
  return {
    type: "USER_ID",
    payload: {
      userId: userId,
    },
  };
};

export const userTabsAction = (userTabs) => {
  return {
    type: "USER_TABS",
    payload: {
      userTabs: userTabs,
    },
  };
};

export const currentTabAction = (currentTab) => {
  return {
    type: "CURRENT_TAB",
    payload: {
      currentTab: currentTab,
    },
  };
};

export const drawerListAction = (isOpen) => {
  return {
    type: "OPEN_DRAWER_DROPDOWNLIST",
    payload: {
      isOpen: isOpen,
    },
  };
};

export const isDarkAction = (isDark) => {
  return {
    type: "THEME_SWITCH",
    payload: {
      isDark: isDark,
    },
  };
};
