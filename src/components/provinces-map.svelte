<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	// let geojson;
	let selectedStation = '';
	let stationInfo = '';
	let trainStations = [];

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

				projection.fitSize([500, 500], geojson); // set size of projected map

				const paths = svg
					.selectAll('path')
					.data(geojson.features)
					.enter()
					.append('path')
					.attr('d', geoGenerator)
					.transition()
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
					trainStations = json.features;

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
							.style('fill', 'red');
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
	});
</script>

<div class="g-center">
	<h2 class="typed">A few stations and it's history</h2>
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
				{#each trainStations.filter((station) => station.properties.name === selectedStation) as station}
					<tr>
						<td><img src={station.properties.image} alt={station.properties.name} /></td>
					</tr>
					<tr>
						<td>{station.properties.name} station was built in: </td>
						<td>{station.properties.build}</td>
					</tr>
					<tr>
						<td>Carriers in this station: </td>
						<td>{station.properties.carriers}</td>
					</tr>
					<tr>
						<td>Type of station: </td>
						<td>{station.properties.type}</td>
					</tr>
					<tr>
						<td>Station's coordinates are: </td>
						<td>{station.geometry.coordinates}</td>
					</tr>
					<tr>
						<td>The NS short-code: </td>
						<td>{station.properties.code}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<div class="g-right">
	<div class="select-province">
		<label for="station-select"><h3>Choose a station</h3></label>
		<select bind:value={selectedStation} name="Train-stations" id="station-select">
			<option value="">--Choose a station</option>
			<option value="s-Hertogenbosch">s-Hertogenbosch</option>
			<option value="Alkmaar">Alkmaar</option>
			<option value="Almelo">Almelo</option>
			<option value="Almere Centrum">Almere Centrum</option>
			<option value="Alphen a/d Rijn">Alphen a/d Rijn</option>
			<option value="Amersfoort Centraal">Amersfoort Centraal</option>
			<option value="Amsterdam Centraal">Amsterdam Centraal</option>
			<option value="Amsterdam Amstel">Amsterdam Amstel</option>
			<option value="Amsterdam Sloterdijk">Amsterdam Sloterdijk</option>
			<option value="Apeldoorn">Apeldoorn</option>
			<option value="Arnhem Centraal">Arnhem Centraal</option>
			<option value="Assen">Assen</option>
			<option value="Breda">Breda</option>
			<option value="Delft">Delft</option>
			<option value="Den Haag Centraal">Den Haag Centraal</option>
			<option value="Den Haag HS">Den Haag HS</option>
			<option value="Deventer">Deventer</option>
			<option value="Dordrecht">Dordrecht</option>
			<option value="Ede-Wageningen">Ede-Wageningen</option>
			<option value="Eindhoven Centraal">Eindhoven Centraal</option>
			<option value="Enschede">Enschede</option>
			<option value="Gouda">Gouda</option>
			<option value="Groningen">Groningen</option>
			<option value="Geldermalsen">Geldermalsen</option>
			<option value="Haarlem">Haarlem</option>
			<option value="Heerlen">Heerlen</option>
			<option value="Helmond">Helmond</option>
			<option value="Hengelo">Hengelo</option>
			<option value="Hilversum">Hilversum</option>
			<option value="Hoorn">Hoorn</option>
			<option value="Leeuwarden">Leeuwarden</option>
			<option value="Leiden Centraal">Leiden Centraal</option>
			<option value="Lelystad Centrum">Lelystad Centrum</option>
			<option value="Maastricht">Maastricht</option>
			<option value="Nijmegen">Nijmegen</option>
			<option value="Oss">Oss</option>
			<option value="Roermond">Roermond</option>
			<option value="Roosendaal">Roosendaal</option>
			<option value="Rotterdam Centraal">Rotterdam Centraal</option>
			<option value="Schiphol Airport">Schiphol Airport</option>
			<option value="Sittard">Sittard</option>
			<option value="Tilburg">Tilburg</option>
			<option value="Utrecht Centraal">Utrecht Centraal</option>
			<option value="Venlo">Venlo</option>
			<option value="Vlissingen">Vlissingen</option>
			<option value="Zaandam">Zaandam</option>
			<option value="Zutphen">Zutphen</option>
			<option value="Zwolle">Zwolle</option>
		</select>
	</div>

	<div id="content">
		<svg
			class="svg-area"
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="500"
			height="500"
			viewBox="0 0 500 500"
			preserveAspectRatio="xMinYMin meet"
		/>
	</div>
</div>
