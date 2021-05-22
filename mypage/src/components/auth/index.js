const login = (isMember, authInfo, cb) => {
  if (isMember) {
    fetch(`http://localhost:8080/user/getUser/${authInfo}`)
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        if (res.status !== 200) {
          cb(null, true);
        } else {
          cb(res.response._id);
        }
      })
      .catch((err) => {});
  } else {
    fetch(`http://localhost:8080/user/postUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...authInfo }),
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        cb(res._id);
      })
      .catch((err) => {});
  }
};

export default login;
