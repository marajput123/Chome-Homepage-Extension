export const fetchPostTab = (tabName, userId, cb) => {
  fetch("http://localhost:8080/tab/createTab", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      newTab: tabName,
      userId: userId,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      if (res.status === 201) {
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchDeleteTab = (tabTitle, userId, cb) => {
  fetch("http://localhost:8080/tab/deleteTab", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      deleteTab: tabTitle,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      if (response.status === 200) {
        cb(tabTitle);
      }
    })
    .catch((err) => console.log(err));
};
