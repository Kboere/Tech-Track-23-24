<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let geojson;

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

				console.log('GeoJSON data loaded successfully'); // Add this log
			})
			.catch((error) => {
				console.error('Error loading GeoJSON:', error);
			});

		// Function to update the map and pop-up based on the selected station
		const updateMapAndPopup = (selectedStation) => {
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
							.attr('r', 3)
							.style('fill', 'red')
							.on('click', () => {
								console.log('testen');
								openPopup(selectedStation);
							});
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
			updateMapAndPopup(selectedStation);
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

<div class="g-center">
    <h1>Travelling from home to school</h1>
</div>

<div class="g-left intro">
	<p class="intro">
		Every morning, I take the train from my house to school. It's a routine that feels like a little
		adventure. I watch the world go by from the train window, and it's a journey full of memories
		and new experiences. Come with me as we explore this daily trip.
	</p>
</div>

<div class="g-right">
	<label for="station-select"><h3>Choose a station</h3></label>
	<select name="Train-stations" id="station-select">
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
			width="500"
			height="400"
		/>
	</div>

	<div id="popup">
		<div class="popup-content">
			<!-- svelte-ignore a11y-missing-content -->
			<h2 id="popup-title" />
			<button id="close-popup">Close</button>
		</div>
	</div>
</div>
