window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".temperature-descripiton");
  let tempDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let country = document.querySelector(".country");
  let degreeSection = document.querySelector(".degree-saction");
  const degreeSpan = document.querySelector(".degree-saction span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api =
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=866b3f6019a8771671ffcb9b17f49285";

      console.log(api);

      fetch(api)
        .then((Response) => {
          return Response.json();
        })
        .then((data) => {
          console.log(data);
          locationTimezone.textContent = data.name;
          let celsiusToKelvin = Math.floor(data.main.temp - 273.15);
          tempDegree.textContent = celsiusToKelvin;
          tempDescription.textContent = data.weather[0].description;
          country.textContent = data.sys.country;

          let iconID = data.weather[0].icon;
          console.log(iconID);
          setIcon(iconID);
          //convertCelsius(tempDegree);
          degreeSection.addEventListener("click", () => {
            if (degreeSpan === "°C") {
              degreeSpan.textContent = "°C";
            } else {
              degreeSpan.textContent = "°F";
              tempDegree.textContent = celsToFar(celsiusToKelvin);
            }
          });
        });
    });
  }
  function setIcon(iconID) {
    var iconSource = "img/" + iconID + ".png";
    var icon = document.querySelector("img");
    icon.setAttribute("src", iconSource);
  }
  function celsToFar(celsius) {
    var result = Math.floor(celsius * (9 / 5) + 32);
    return result;
  }
});
