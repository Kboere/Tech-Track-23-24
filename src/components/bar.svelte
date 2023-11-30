<script>
	import { onMount, afterUpdate } from 'svelte';
	import * as d3 from 'd3';

	export let isFare1;

	let width = 800;
	let height = 500;
	let margin = { top: 50, right: 50, bottom: 100, left: 50 };
	let svg;
	let allData = [];
	let filteredData = [];

	let yScale;
	let xScale;
	let color;
	let size;
	let durationRange;
	let simulation;
	let tooltip;

	onMount(() => {
		svg = d3
			.select('.beeswarm')
			.append('svg')
			.attr('height', height)
			.attr('width', width)
			.attr('viewBox', '0 0 ' + width + ' ' + height)
			.attr('preserveAspectRatio', 'none')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.style('width', '100%')
			.style('height', 'auto');

		d3.json('data/disruptions.json')
			.then(function (json) {
				allData = json;

				// Use reduce to get unique causes
				let groupedData = allData.reduce((result, current) => {
					// Extract the cause_en property from the current element
					const key = current.cause_en;

					// Check if result[key] exists; if not, initialize it as an empty array
					// Then push the current element to the array corresponding to the cause
					(result[key] || (result[key] = [])).push(current);

					// Return the updated result object for the next iteration
					return result;
				}, {});

				// get all unique causes in a variable
				let causes = Object.keys(groupedData);

				// check if isFare1 is true, else show other data
				filteredData = isFare1
					? allData.filter((d) => d.ns_lines === "Utrecht-'s-Hertogenbosch")
					: allData.filter((d) => d.ns_lines === 'Amsterdam-Utrecht');

				durationRange = d3.extent(filteredData.map((d) => +d.duration_minutes)); // Y-axis array containing the minimum and maximum values

				xScale = d3
					.scaleBand()
					.domain(causes)
					.range([margin.left, width - margin.right]);

				yScale = d3
					.scaleLinear()
					.domain(durationRange)
					.range([height - margin.bottom, margin.top]);

				color = d3.scaleOrdinal().domain(causes).range(d3.schemePaired); // give color to each cause

				size = d3.scaleSqrt().domain(durationRange).range([5, 20]); // set size of dots accordingly

				tooltip = d3.select('.tooltip').append('div');

				svg
					.selectAll('.center-line')
					.data(causes)
					.enter()
					.append('line')
					.attr('class', 'center-line')
					.attr('x1', (d) => xScale(d) + xScale.bandwidth(50) - 100)
					.attr('y1', margin.top)
					.attr('x2', (d) => xScale(d) + xScale.bandwidth(50) - 100)
					.attr('y2', height - margin.bottom)
					.attr('stroke', 'rgba(255,255,255,0.3)')
					.attr('stroke-width', 2);

				svg
					.selectAll('.circ')
					.data(filteredData)
					.enter()
					.append('circle')
					.attr('class', 'circ')
					.attr('fill', (d) => color(d.cause_en))
					.attr('r', (d) => size(d.duration_minutes))
					.attr('cx', (d) => xScale(d.cause_en))
					.attr('cy', (d) => yScale(d.duration_minutes))
					.on('mouseover', function () {
						const currentData = d3.select(this).datum();

						tooltip.transition().duration(200).style('opacity', 1);
						tooltip.html(
							`<p>Traject: ${currentData.ns_lines}</p><p>Duration: ${currentData.duration_minutes} minutes</p><p>Cause: ${currentData.cause_en}</p>`
						);
					})
					.on('mouseout', function () {
						tooltip.transition().duration(500).style('opacity', 0);
					});

				simulation = d3
					.forceSimulation(filteredData)
					.force('x', d3.forceX((d) => xScale(d.cause_en)).strength(1))
					.force('y', d3.forceY((d) => yScale(d.duration_minutes)).strength(1))
					.force(
						'collide',
						d3.forceCollide((d) => size(d.duration_minutes))// prevent overlapping of the dots
					)
					.on('tick', tick);

				function tick() {// updates each circle as simulation progresses
					svg
						.selectAll('.circ')
						.attr('cx', (d) => d.x)
						.attr('cy', (d) => d.y);
				}

				// Append x-axis labels for each cause
				svg
					.selectAll('.x-axis-label')
					.data(causes)
					.enter()
					.append('text')
					.attr('class', 'x-axis-label')
					.attr(
						'transform',
						(d) =>
							`translate(${xScale(d) + xScale.bandwidth(50) - 97.5},${
								height - margin.bottom + 25
							}) rotate(-90)`
					)
					.style('text-anchor', 'end') // Adjust text-anchor for better alignment
					.text((d) => d);
			})
			.catch((err) => {
				console.error('Error loading JSON:', err);
			});
	});

	// on update, change beeswarm
	afterUpdate(() => {
		console.log('isFare1:', isFare1);

		d3.json('data/disruptions.json').then(function (json) {
			allData = json;

			filteredData = isFare1
				? allData.filter((d) => d.ns_lines === "Utrecht-'s-Hertogenbosch")
				: allData.filter((d) => d.ns_lines === 'Amsterdam-Utrecht');

			// Recalculate durationDomain based on the updated filteredData
			durationRange = d3.extent(filteredData.map((d) => +d.duration_minutes));

			yScale = d3
				.scaleLinear()
				.domain(durationRange)
				.range([height - margin.bottom, margin.top]);

			size = d3.scaleSqrt().domain(durationRange).range([5, 20]);

			// Update the circles
			svg
				.selectAll('.circ')
				.data(filteredData)
				.join(
					(enter) =>
						enter
							.append('circle')
							.attr('class', 'circ')
							.on('mouseover', function () {
								const currentData = d3.select(this).datum();
								tooltip.transition().duration(200).style('opacity', 1);
								tooltip.html(
									`<p>Traject: ${currentData.ns_lines}</p><p>Duration: ${currentData.duration_minutes} minutes</p><p>Cause: ${currentData.cause_en}</p>`
								);
							})
							.on('mouseout', function () {
								tooltip.transition().duration(500).style('opacity', 0);
							}),
					(update) => update,
					(exit) => exit.remove()
				)
				.attr('fill', (d) => color(d.cause_en))
				.attr('r', (d) => size(d.duration_minutes))
				.attr('cx', (d) => xScale(d.cause_en))
				.attr('cy', (d) => yScale(d.duration_minutes));

			// Update forceSimulation with the new filteredData
			simulation.nodes(filteredData);

			// Trigger tick to update the simulation
			simulation.alpha(1).restart();
		});
	});
</script>

<h3>Traject disruptions in 2022:</h3>
<div class="tooltip" />

<div class="beeswarm" />
