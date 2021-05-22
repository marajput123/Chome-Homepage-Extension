export const weatherApi = (latitude, longitude, cb) =>
  fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=623b67f33ed741a686a213ca1b6917d8&units=I`
  )
    .then((result) => {
      return result.json();
    })
    .then((response) => {
      if (response.error) {
        throw new Error();
      }
      const data = response.data[0];
      return cb({
        error: false,
        data: {
          temp: data.temp,
          code: data.weather.code,
          imgCode: data.weather.icon,
          description: data.weather.description,
          time: data.datetime,
        },
      });
    })
    .catch((err) => {
      return cb({
        error: true,
        data: null,
      });
    });
