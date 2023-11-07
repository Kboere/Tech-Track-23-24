<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    onMount(() => {
      // Select the SVG container where you want to render the map
      let svg = d3.select('#content svg');
  
      let projection = d3.geoMercator();
      let geoGenerator = d3.geoPath().projection(projection);
  
      // REQUEST DATA
      d3.json('data/provinces-netherlands.geojson')
        .then(function (json) {
          // Store the GeoJSON data in the geojson variable
          let geojson = json;
  
          // Set the projection size after you have the geojson data
          projection.fitSize([500, 400], geojson); // Adjust the size as needed
  
          // Define the SVG path element for your features
          const paths = svg
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geoGenerator)
            .style('stroke', '#fff')
            .style('stroke-width', 1);
  
          // Create a new feature (e.g., a red point)
          let newPoint = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [5.271194868967957, 51.88266570704423]
            },
            properties: {
              name: 'Geldermalsen',

              fill: 'red'
            }
          };
  
          // Add the new point feature to your existing GeoJSON data
          geojson.features.push(newPoint);
  
          // Define the SVG path element for the new point
          let newPointPath = svg.selectAll('.new-point').data([newPoint]);
  
          // Enter selection: create a new path for the point
          newPointPath
            .enter()
            .append('circle')
            .attr('class', 'new-point')
            .attr('cx', function (d) {
              return projection(d.geometry.coordinates)[0];
            }) // X-coordinate
            .attr('cy', function (d) {
              return projection(d.geometry.coordinates)[1];
            }) // Y-coordinate
            .attr('r', 3) // Radius of the circle
            .style('fill', 'red') // Set the fill color to red
            .on('click', () => {
              console.log('testen');
              openPopup(newPoint.properties.name); // Open the pop-up and pass title
            });
        })
        .catch((error) => {
          console.error('Error loading GeoJSON:', error);
        });
  
      // Function to open the pop-up and populate its content with data
      const openPopup = (title) => {
        document.getElementById('popup-title').textContent = title;
        document.getElementById('popup').style.display = 'block'; // Show the pop-up
      };
  
      // Function to close the pop-up
      const closePopup = () => {
        document.getElementById('popup').style.display = 'none'; // Hide the pop-up
      };
  
      // Add a click event listener to the "Close" button inside the pop-up
      document.getElementById('close-popup').addEventListener('click', () => {
        closePopup(); // Close the pop-up when the "Close" button is clicked
      });
    });
  </script>  

<label for="station-select"><h3>Choose a station</h3></label>
<select name="Train-stations" id="station-select">
    <option value="">--Choose a station</option>
    <option value="">Geldermalsen</option>
    <option value="">Utrecht Centraal</option>
    <option value="">Amsterdam Amstel</option>
</select>

<div id="content">
	<svg class="svg-area" version="1.0" xmlns="http://www.w3.org/2000/svg" width="500" height="400" />
</div>

<div id="popup">
    <div class="popup-content">
      <!-- svelte-ignore a11y-missing-content -->
      <h2 id="popup-title"></h2>
      <button id="close-popup">Close</button>
    </div>
  </div>
