<script>
	import Bar from '../components/bar.svelte';
	import ProvincesMap from '../components/provinces-map.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
	<script src="custom.js"></script>
</svelte:head>

<main>
	<article>
		<section>
			<ProvincesMap />
		</section>
		<section>
			<Bar />
		</section>
		<section>3</section>
		<section>4</section>
		<section>5</section>
	</article>
</main>