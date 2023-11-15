<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let geojson;
	let selectedStation = '';
	let stationInfo = '';

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
				projection.fitSize([600, 600], geojson); // Adjust the size as needed

				// Define the SVG path element for your features
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
			})
			.catch((err) => {
				console.error('Error loading GeoJSON:', err);
			});

		// Function to update the map and pop-up based on the selected station
		const updateMapAndTable = (selectedStation) => {
			svg.selectAll('.new-point').remove();

			// Load the GeoJSON data for trainstations
			d3.json('data/trainstations.geojson')
				.then(function (json) {
					console.log('Train station GeoJSON data loaded successfully');
					const trainStations = json.features;

					// Create a new point feature for the selected station
					const selectedStationFeature = trainStations.find(
						(station) => station.properties.name === selectedStation
					);

					if (selectedStationFeature) {
						// Redraw the new point
						svg
							.selectAll('.new-point')
							.data([selectedStationFeature])
							.enter()
							.append('circle')
							.attr('class', 'new-point')
							.attr('cx', function (d) {
								return projection(d.geometry.coordinates)[0];
							})
							.attr('cy', function (d) {
								return projection(d.geometry.coordinates)[1];
							})
							.attr('r', 5)
							.style('fill', 'red')
							.on('mouseover', () => {
								svg
									.append('text')
									.attr('x', projection(selectedStationFeature.geometry.coordinates)[0] + 10)
									.attr('y', projection(selectedStationFeature.geometry.coordinates)[1])
									.text(selectedStationFeature.properties.name)
									.attr('class', 'station-label');
							})
							.on('mouseout', () => {
								// Remove the text label on mouseout
								svg.selectAll('.station-label').remove();
							});

						// Dynamically generate table rows based on the selected station
						stationInfo = generateStationInfo(trainStations, selectedStation);
					} else {
						console.error('Station not found in GeoJSON data.');
					}
				})
				.catch((error) => {
					console.error('Error loading trainstations.geojson:', error);
				});
		};

		// Event listener to handle station selection changes
		document.getElementById('station-select').addEventListener('change', (event) => {
			const selectedStation = event.target.value;
			console.log(`Selected station: ${selectedStation}`); // Add this log
			updateMapAndTable(selectedStation);
		});

		// Function to dynamically generate table rows based on the selected station
		function generateStationInfo(trainStations, selectedStation) {
			return trainStations
				.filter((station) => station.properties.name === selectedStation)
				.map((station) => {
					return `
            <tr>
                <td>Station was build in: </td>
                <td>${station.properties.name}</td>
            </tr>
            <tr>
                <td>Station's coordinates are: </td>
                <td>${station.geometry.coordinates}</td>
            </tr>
            <tr>
                <td>other data...: </td>
                <td>${station.geometry.coordinates}</td>
            </tr>
        `;
				})
				.join('');
		}
	});
</script>

<div class="g-center">
	<h2>A few stations and it's history</h2>
</div>

<div class="g-left intro">
	<div class="tbl-header">
		<table cellpadding="0" cellspacing="0" border="0">
			<thead>
				<tr>
					<th>Trainstation of {selectedStation}</th>
				</tr>
			</thead>
		</table>
	</div>
	<div class="tbl-content">
		<table cellpadding="0" cellspacing="0" border="0">
			<tbody>
				{@html stationInfo}
			</tbody>
		</table>
	</div>
</div>

<div class="g-right">
	<label for="station-select"><h3>Choose a station</h3></label>
	<select bind:value={selectedStation} name="Train-stations" id="station-select">
		<option value="">--Choose a station</option>
		<option value="Geldermalsen">Geldermalsen</option>
		<option value="Utrecht Centraal">Utrecht Centraal</option>
		<option value="Amsterdam Amstel">Amsterdam Amstel</option>
		<option value="Helmond">Helmond</option>
	</select>

	<div id="content">
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
