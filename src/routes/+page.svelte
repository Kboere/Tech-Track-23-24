<script>
	import ProvincesMap from '../components/provinces-map.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
	<script src="custom.js"></script>
</svelte:head>

<div class="train">
	<img src="../images/train.svg" alt="train of NS">
</div>

<main>
	<article>
		<section>
			<ProvincesMap />
			<div class="train-part">
				<img class="trainstation right" src="../images/links-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section>
			<div class="train-part">
				<img class="trainstation left" src="../images/rechts-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="trainstation right" src="../images/links-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section>
			<div class="train-part">
				<img class="trainstation left" src="../images/rechts-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="trainstation right" src="../images/links-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section>
			<div class="train-part">
				<img class="trainstation left" src="../images/rechts-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="trainstation right" src="../images/links-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section>
			<div class="train-part">
				<img class="trainstation left" src="../images/rechts-trainstation2.svg" alt="trainstation of geldermalsen">
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
	</article>
</main>
