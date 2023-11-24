<script>
	import { onMount } from 'svelte';
	import * as d3 from 'd3';

	let width = 800;
	let height = 500;
	let margin = { top: 50, right: 50, bottom: 100, left: 50 }; // Increased bottom margin to make room for x-axis labels
	let svg;

	onMount(() => {
		var svg = d3
			.select('.chart')
			.append('svg')
			.attr('height', height)
			.attr('width', width)
			.attr('viewBox', '0 0 ' + width + ' ' + height)
			.attr('preserveAspectRatio', 'xMinYMin meet')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.style('width', '100%')
			.style('height', 'auto');

		d3.json('data/disruptions.json')
			.then(function (json) {
				let data = json;

				// Use reduce to get unique causes
				let groupedData = data.reduce((result, current) => {
					const key = current.cause_en;
					(result[key] || (result[key] = [])).push(current);
					return result;
				}, {});

				let causes = Object.keys(groupedData);

				let xScale = d3
					.scaleBand()
					.domain(causes)
					.range([margin.left, width - margin.right]);

				let yScale = d3
					.scaleLinear()
					.domain(d3.extent(data.map((d) => d.duration_minutes)))
					.range([height - margin.bottom, margin.top]);

				let color = d3.scaleOrdinal().domain(causes).range(d3.schemePaired);

				let durationDomain = d3.extent(data.map((d) => +d.duration_minutes));
				let size = d3.scaleSqrt().domain(durationDomain).range([5, 20]);

				const tooltip = d3.select('.chart').append('div').attr('class', 'tooltip');

				svg
					.selectAll('.circ')
					.data(data)
					.enter()
					.append('circle')
					.attr('class', 'circ')
					.attr('stroke', 'black')
					.attr('fill', (d) => color(d.cause_en))
					.attr('r', (d) => size(d.duration_minutes))
					.attr('cx', (d) => xScale(d.cause_en))
					.attr('cy', (d) => yScale(d.duration_minutes))
					.on('mouseover', function () {
						const currentData = d3.select(this).datum();

						tooltip.transition().duration(200).style('opacity', 0.9);
						tooltip
							.html(`<p>Traject: ${currentData.ns_lines}</p><p>Duration: ${currentData.duration_minutes} minutes</p><p>Cause: ${currentData.cause_en} minutes</p>`)
							.style('left', `${d3.event.pageX}px`)
							.style('top', `${d3.event.pageY - 28}px`);
					})
					.on('mouseout', function () {
						tooltip.transition().duration(500).style('opacity', 0);
					});

				let simulation = d3
					.forceSimulation(data)
					.force('x', d3.forceX((d) => xScale(d.cause_en)).strength(0.8))
					.force('y', d3.forceY((d) => yScale(d.duration_minutes)).strength(1))
					.force(
						'collide',
						d3.forceCollide((d) => size(d.duration_minutes))
					)
					.on('tick', tick);

				function tick() {
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
							`translate(${xScale(d) + xScale.bandwidth() - 105},${
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
</script>

<h3>Disruptions in 2022:</h3>
<div class="chart" />