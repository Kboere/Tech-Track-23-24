<script>
	import BarChart from '../components/bar.svelte';
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let geojson;
	let update;
	let isFare1 = true;
	let geoInterpolator;
	let defaultFareUnits = isFare1 ? 26 : 33;

	onMount(() => {
		let svg = d3.select('#route svg');
		let projection = d3.geoMercator().center([5.5, 52.2]).scale(5000);
		let geoGenerator = d3.geoPath().projection(projection);

		d3.json('data/provinces-netherlands.geojson')
			.then(function (json) {
				geojson = json;
				projection.fitSize([600, 600], geojson);

				const paths = svg
					.selectAll('path')
					.data(geojson.features)
					.enter()
					.append('path')
					.attr('d', geoGenerator)
					.style('stroke', '#fff')
					.style('fill', 'transparent')
					.style('stroke-width', 1);

				console.log('GeoJSON data loaded successfully');

				let GeldermalsenCS = [5.271618990209046, 51.88244186580137];
				let UtrechtCS = [5.109548661406781, 52.0893003699307];
				let amsAmstel = [4.917664181267407, 52.346266621611164];
				let u = 0;

				function update() {
					svg.selectAll('.dynamic-element').remove();

					let coordinates;
					if (isFare1) {
						coordinates = [GeldermalsenCS, UtrechtCS]; // Fare 1 data
						geoInterpolator = d3.geoInterpolate(GeldermalsenCS, UtrechtCS);
						calculateTotal();
					} else {
						// Set coordinates for Fare 2 (replace with actual data)
						coordinates = [UtrechtCS, amsAmstel];
						// Update geoInterpolator for Fare 2
						geoInterpolator = d3.geoInterpolate(UtrechtCS, amsAmstel);
						calculateTotal();
					}

					svg
						.append('path')
						.datum({
							type: 'Feature',
							geometry: { type: 'LineString', coordinates: coordinates }
						})
						.attr('d', geoGenerator)
						.style('fill', 'none')
						.style('stroke', isFare1 ? 'red' : 'blue') // Change color for Fare 2
						.classed('dynamic-element', true);

					svg
						.append('circle')
						.datum({
							type: 'Feature',
							geometry: { type: 'Point', coordinates: geoInterpolator(u) }
						})
						.attr('cx', (d) => projection(d.geometry.coordinates)[0])
						.attr('cy', (d) => projection(d.geometry.coordinates)[1])
						.attr('r', 5)
						.style('fill', isFare1 ? 'red' : 'blue') // Change color for Fare 2
						.classed('dynamic-element', true);

					u += 0.01;
					if (u > 1) u = 0;
				}

				update();
				setInterval(update, 30);

				function calculateTotal() {
					var fareUnits =
						parseFloat(document.getElementById('fareUnits').value) || defaultFareUnits;
					var total = 1.08 + fareUnits * 0.2;

					document.getElementById('result').innerHTML = `<p>Total: €${total.toFixed(2)}</p>`;
				}
				calculateTotal();

				document.getElementById('fareUnits').addEventListener('input', calculateTotal);

				// Event delegation for button clicks
				document.getElementById('fareButtons').addEventListener('click', (event) => {
					if (event.target.tagName === 'BUTTON') {
						isFare1 = event.target.textContent === 'Fare 1';
						defaultFareUnits = isFare1 ? 26 : 33; // Update default value based on Fare selection
						document.getElementById('fareUnits').value = defaultFareUnits; // Set input value to default
						update();
					}
				});
			})
			.catch((err) => {
				console.error('Error loading GeoJSON:', err);
			});
	});
</script>

<div class="g-center" id="fareButtons">
	<button>Fare 1</button>
	<button>Fare 2</button>
</div>

<div class="g-left">
	<div class="extra-data">
		<div>
			<label for="fareUnits"><p>Enter Fare Units:</p></label>
			<input type="number" id="fareUnits" placeholder="Enter fare units" value={defaultFareUnits} />
		</div>
		<div id="result" />
	</div>

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
	<div class="warning-box">
		<div>
			<span class="icon">t</span>
		</div>

		<div>
			<p>
				To calculate the rates of a train journey, the NS uses the following method: Total Fare =
				€1,08 + (Fare Units x €0,20)
			</p>

			<a
				target="_blank"
				href="https://www.ns.nl/binaries/_ht_1667395584239/content/assets/ns-nl/tarieven/2023/tariefeenhedenkaart-vz-2023---en-.pdf"
				>What are your fare units?</a
			>
		</div>
	</div>

	<div class="barchart">
		<BarChart {isFare1} />
	</div>
</div>
