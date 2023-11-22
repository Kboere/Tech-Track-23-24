<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let geojson;
  
    onMount(() => {
      // Select the SVG container where you want to render the map
      let svg = d3.select('#route svg');
  
      // Adjust the center and scale for the desired zoom level
      let projection = d3.geoMercator().center([5.5, 52.2]).scale(5000);

  // projection.clipExtent([[100, 150], [500, 450]]);

      let geoGenerator = d3.geoPath().projection(projection);
  
      // REQUEST DATA
      d3.json('data/provinces-netherlands.geojson')
        .then(function (json) {
          // Store the GeoJSON data in the geojson variable
          geojson = json;

        // Set the projection size of the geojson data
        projection.fitSize([600, 600], geojson); // Adjust the size as needed
  
          // Define the SVG path element for your features (map paths)
          const paths = svg
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geoGenerator)
            .style('stroke', '#fff')
            .style('fill', 'transparent')
            .style('stroke-width', 1);
  
          console.log('GeoJSON data loaded successfully'); // Add this log
  
          let GeldermalsenCS = [5.271618990209046, 51.88244186580137];
          let UtrechtCS = [5.109548661406781, 52.0893003699307];
          let geoInterpolator = d3.geoInterpolate(GeldermalsenCS, UtrechtCS);
          let u = 0;
  
          function update() {
            // Clear only the dynamically added elements
            svg.selectAll('.dynamic-element').remove();
  
            // Geldermalsen - utrecht
            svg
              .append('path')
              .datum({
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: [GeldermalsenCS, UtrechtCS] }
              })
              .attr('d', geoGenerator)
              .style('fill', 'none')
              .style('stroke', 'red')
              .classed('dynamic-element', true);
  
            // Point
            svg
              .append('circle')
              .datum({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: geoInterpolator(u) }
              })
              .attr('cx', d => projection(d.geometry.coordinates)[0])
              .attr('cy', d => projection(d.geometry.coordinates)[1])
              .attr('r', 5)
              .style('fill', 'red')
              .classed('dynamic-element', true);
  
            u += 0.01;
            if (u > 1) u = 0;
          }
  
          update(); // Initial update
          setInterval(update, 30); // Update every 30 milliseconds
        })
        .catch((err) => {
          console.error('Error loading GeoJSON:', err);
        });
    });
</script>

<div class="g-center">
  <h2>GDM to UT</h2>
</div>

<div class="g-left">
  <div id="route">
    <svg
      class="svg-area"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMinYMin meet"
    />
  </div>
</div>

<div class="g-right">
  <div class="extra-data"></div>



</div>
