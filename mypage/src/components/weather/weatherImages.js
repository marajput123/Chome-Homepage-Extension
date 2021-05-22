function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

export const images = importAll(
  require.context(
    "../../static/images/weatherIcons/icons",
    false,
    /\.(png|jpe?g|svg)$/
  )
);
