export const fetchGetLinks = (currentTab, userId, cb) => {
  let tabName = currentTab.split(" ").join("+");
  fetch(`http://localhost:8080/tab/getLinks/${userId}?tab=${tabName}`)
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      cb(res.response);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchEditLinks = (linkId, userId, newLink, cb) => {
  fetch("http://localhost:8080/tab/updateLink", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      linkId: linkId,
      newLink: newLink,
      userId: userId,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      if (res.status === 200) {
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchPostLink = (userId, newLink, cb) => {
  fetch("http://localhost:8080/tab/createLink", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newLink.title,
      imgUrl: newLink.imageUrl,
      url: newLink.url,
      tags: newLink.tags,
      userId: userId,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      if (res.status === 201) {
        cb(res.response._id);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchDeleteLink = (userId, linkId, cb) => {
  fetch("http://localhost:8080/tab/deleteLink", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      linkId: linkId,
      userId: userId,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      if (res.status === 200) {
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Ahmed-1999-09-28-noodles

export const fetchUserUpdate = (userId, newSecretKey, cb) => {
  fetch("http://localhost:8080/user/updateUser", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      newSecretKey: newSecretKey,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      if (response.status === 200) {
        cb();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchUserDelete = (userId, cb) => {
  fetch("http://localhost:8080/user/deleteUser", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((respnse) => {
      if (respnse.status === 200) {
        cb();
      }
    });
};
