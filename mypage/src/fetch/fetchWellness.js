exports.fetchPostWellness = (data, userId) => {
  fetch("http://localhost:8080/wellness/postData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      wellnessData: data,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((res) => {})
    .catch((err) => {});
};

exports.fetchGetWellness = (userId, cb) => {
  fetch(`http://localhost:8080/user/getUser/data/${userId}`)
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      if (response.status === 200) {
        cb(response.response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
