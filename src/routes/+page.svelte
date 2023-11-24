<script>
	import ProvincesMap from '../components/provinces-map.svelte';
	import RouteMap from '../components/route.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="style.css" />
	<script src="custom.js"></script>
</svelte:head>

<div class="train fade-in-right">
	<img src="../images/train.svg" alt="train of NS" />
</div>

<main>
	<article>
		<section>
			<div class="title-box">
				<h1 class="fade-in">From Home to School: A Visual Journey</h1>
				<p class="fade-in typed">Every morning, I take the train from my house to school. It's a routine that feels like a little
					adventure. I watch the world go by from the train window, and it's a journey full of memories
					and new experiences. Come with me as we explore this daily trip.</p>
				<div class="scroll-box fade-in">
					<div class="icon-scroll"></div>
					<p class="new-point">Scroll to see more!</p>
				</div>
			</div>

			<div class="train-part fade-in">
				<img
					class="trainstation right"
					src="../images/links-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section class="explain-slide">

			<div class="center-box">
				<span>1/3</span>
				<h3 class="fade-in">A general idea of where trainstations in the Netherlands are based</h3>
				<p class="fade-in typed">Every morning, I take the train from my house to school. It's a routine that feels like a little
					adventure. I watch the world go by from the train window, and it's a journey full of memories
					and new experiences. Come with me as we explore this daily trip.</p>
			</div>

			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img
					class="trainstation right"
					src="../images/links-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section class="provinces">

			<ProvincesMap />

			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img
					class="trainstation right"
					src="../images/links-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section class="explain-slide">
			<div class="center-box">
				<span>2/3</span>
				<h3 class="fade-in">Now let's start my journey</h3>
				<p class="fade-in typed">Every morning, I take the train from my house to school. It's a routine that feels like a little
					adventure. I watch the world go by from the train window, and it's a journey full of memories
					and new experiences. Come with me as we explore this daily trip.</p>
			</div>
			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img
					class="trainstation right"
					src="../images/links-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section class="route-slide">

			<RouteMap />

			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img
					class="trainstation right"
					src="../images/links-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section>

			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
	</article>
</main>
