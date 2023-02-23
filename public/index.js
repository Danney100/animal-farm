function handleChange(e) {
  const menu = document.getElementById("dropdown-menu");
  const value = e.value;
  menu.innerHTML = "<div class='center'><div class='loader'></div></div>";
  menu.className = "show";
  if (!value) {
    menu.className = "hide";
    return;
  }
  if (value.length > 2) {
    axios
      .post(`https://fnw-us.foreca.com/api/v1/location/search/${value}`, null, {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mbnctdXMuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTY3Njg4NzgzOCwiZXhwIjoxNjc3NDkyNjM4LCJuYmYiOjE2NzY4ODc4MzgsImp0aSI6IjMyMTc4OWM3ODdiOWUwNWUiLCJzdWIiOiJvY3RuZTc5MzUiLCJmbXQiOiJYRGNPaGpDNDArQUxqbFlUdGpiT2lBPT0ifQ.Ggo2rwGFVM61_2ZKOczfcw7C9WOW4nzrfYL39D5T460`,
        },
      })
      .then(function (response) {
        handleSelectListener(this);
        let items = "";
        if (response?.data?.locations?.length) {
          response.data.locations.forEach(function (item) {
            items += `<div class='dropdown-item' value="${item.name}" id='${item.id}'>${item.name}</div>`;
          });
        } else {
          items = "<div class='center warning'>No data available.</div>";
        }
        menu.innerHTML = items;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });
  } else {
    menu.innerHTML =
      "<div class='center warning'>Please atleast enter 3 letters.</div>";
  }
}

function handleSelect(e) {
  document.getElementById("search-input").value = e.target.innerText;
  const menu = document.getElementById("dropdown-menu");
  menu.className = "hide";
  const spinner = document.getElementById("spinner");
  spinner.className = "show center";
  const tableContainer = document.getElementById("table-container");
  tableContainer.className = "show";
  var tabl = document.getElementById("location");
  tabl.innerHTML = "";
  axios
    .post(
      `https://fnw-us.foreca.com/api/v1/forecast/daily/${e.target.id}`,
      null,
      {
        headers: {
          Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mbnctdXMuZm9yZWNhLmNvbVwvYXV0aG9yaXplXC90b2tlbiIsImlhdCI6MTY3Njg4NzgzOCwiZXhwIjoxNjc3NDkyNjM4LCJuYmYiOjE2NzY4ODc4MzgsImp0aSI6IjMyMTc4OWM3ODdiOWUwNWUiLCJzdWIiOiJvY3RuZTc5MzUiLCJmbXQiOiJYRGNPaGpDNDArQUxqbFlUdGpiT2lBPT0ifQ.Ggo2rwGFVM61_2ZKOczfcw7C9WOW4nzrfYL39D5T460`,
        },
      }
    )
    .then(function (response) {
      spinner.className = "hide";
      const forecast = response.data.forecast;
      if (forecast?.length) {
        var tHead = document.createElement("thead");
        var tBody = document.createElement("tbody");

        tabl.appendChild(tHead);
        tabl.appendChild(tBody);
        var fieldTitles = [
          "Day of the week",
          "Date",
          "Max Temperature",
          "Min Temperature",
          "Weather Code",
          "Wind speed and direction",
        ];

        var tHeadRow = document.createElement("tr");
        tHead.appendChild(tHeadRow);
        fieldTitles.forEach(function (field) {
          var tCol = document.createElement("th");
          tCol.innerHTML = field;
          tHeadRow.appendChild(tCol);
        });

        var fields = [
          "day",
          "date",
          "maxTemp",
          "minTemp",
          "symbol",
          "maxWindSpeed",
        ];

        for (var i = 0; i < forecast.length; i++) {
          var tRow = document.createElement("tr");
          tBody.appendChild(tRow);

          fields.forEach(function (field) {
            var tCol = document.createElement("td");
            tCol.innerHTML = forecast[i][field];
            if (field === "day") {
              var days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              const day = new Date(forecast[i]["date"]);
              tCol.innerHTML = days[day.getDay()];
            }
            if (field === "maxTemp" || field === "minTemp") {
              tCol.innerHTML = `${forecast[i][field]} °C`;
            }
            if (field === "maxWindSpeed") {
              tCol.innerHTML = `speed:${forecast[i][field]}    direction:${forecast[i]["windDir"]} `;
            }
            tRow.appendChild(tCol);
          });
        }
      }
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

const handleSelectListener = (e) => {
  const menu = document.getElementById("dropdown-menu");
  menu.addEventListener("click", handleSelect);
};
