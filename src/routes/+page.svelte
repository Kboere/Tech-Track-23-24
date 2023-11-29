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
				<p class="fade-in typed">
					Every morning, I take the train from my house to school. 
					Whilest scrolling through this project you will see you some fun facts of my (almost) every day little adventure to school.
					Get to know my route!
				</p>
				<div class="scroll-box fade-in">
					<div class="icon-scroll" />
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
				<p class="fade-in typed">
					The Netherlands is a country where travelling with public transport is really being supported. 
					It has a few benefits for the environment but also for students. 
					Because the trains run on electricity, they emit nothing and public transport is made free during the week for students so they can go to school. 
					
					So I also use public transport and asked myself where the largest train stations would be.
					That's why you see in the next slide, a map of the largest trainstations in the Netherlands with some fun facts. Scroll to see!
				</p>
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
				<h3 class="fade-in">Now let's see some data of my route</h3>
				<p class="fade-in typed">
					In the next slide you will see 2 fares. 1 which is from Geldermalsen to Utrecht, and the other is from Utrecht to Amsterdam Amstel. Each fare has its own data and graph which when hovering over shows extra data. Are you seeing the easter egg? it shouldn't be hard to count ;) Let's not wait anymore, go and have a look!  
				</p>
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
		<section class="explain-slide">
			<div class="center-box">
				<span>3/3</span>
				<h3 class="fade-in">You have reached the end!</h3>
				<p class="fade-in typed">
					Wooww that was fast! hopefully you have enjoyed this little interactive project of my route with the train to school! Want to know more? Don't hesitate to ask! 
				</p>
			</div>

			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>
			<div class="confetti-piece"></div>

			<div class="train-part">
				<img
					class="trainstation left"
					src="../images/rechts-trainstation2.svg"
					alt="trainstation of geldermalsen"
				/>
				<img
					class="trainstation right"
					src="../images/finish-flag.gif"
					alt="trainstation of geldermalsen"
				/>
				<img class="track" src="../images/track.svg" alt="traintrack" />
			</div>
		</section>
		<section class="last">
<h2>404</h2>
<p>Sorry, the size of your screen is too small! Flip your screen or use your laptop.</p>
		</section>
	</article>
</main>