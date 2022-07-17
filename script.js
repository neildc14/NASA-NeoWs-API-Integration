let elementCount = document.getElementById("element-count");

const API_KEY = "EgVzQQnhdYxgieUdFd4gKgmYxTwhTTYR6jHsiPZL";
const date = new Date();

let year = date.getFullYear();

let month;
if (date.getMonth() + 1 < 10) {
  month = `0${date.getMonth() + 1}`;
} else {
  month = date.getMonth() + 1;
}

let day;
if (date.getDate() < 10) {
  day = `0${date.getDate()}`;
} else {
  day = date.getDate();
}

let observe_date = `${year}-${month}-${day}`;

fetch(
  `https://api.nasa.gov/neo/rest/v1/feed?start_date=${observe_date}&end_date=${observe_date}&api_key=${API_KEY}`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let near_earth_objects = data.near_earth_objects[observe_date];

    elementCount.innerHTML = data.element_count;

    let htmlElement = `<ul>`;
    near_earth_objects.forEach((object) => {
      console.log(object);
      let estimated_diameter_min =
        object.estimated_diameter["meters"]["estimated_diameter_min"];
      let diameter_min = estimated_diameter_min.toFixed(3);

      let estimated_diameter_max =
        object.estimated_diameter["meters"]["estimated_diameter_max"];
      let diameter_max = estimated_diameter_max.toFixed(3);

      htmlElement += `<li class="mb-5 border p-1">
      <table class="table table-hover">
       <thead>
         <tr>
           <th>NEO: ${object.name}</th>
           <th></th>
           <th></th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <th scope="row">Absolute Magnitude:</th>
           <td>${object.absolute_magnitude_h}</td>
           <td></td>
         </tr>
         <tr>
           <th scope="row">Close approach date:</th>
           <td>${object.close_approach_data[0]["close_approach_date_full"]}</td>
           <td></td>
         </tr>
         <tr>
           <th scope="row">Estimated diameter:</th>
           <td><strong>min: </strong>${diameter_min}m</td>
           <td><strong>max: </strong>${diameter_max}m</td>
         </tr>
         <tr>
           <th scope="row">Hazardous Asteroid:</th>
           <td>${object.is_potentially_hazardous_asteroid}</td>
           <td></td>
         </tr>
         <tr>
           <th scope="row">Entry Object:</th>
           <td>${object.is_sentry_object}</td>
           <td></td>
         </tr>         
       </tbody>
      </table></li>`;
    });

    htmlElement += `</ul>`;

    let objectLists = document.getElementById("object-lists");
    objectLists.innerHTML = htmlElement;
  });
