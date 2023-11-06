<svelte:head>
	<link rel="stylesheet" href="style.css" />
    <script src="custom.js"></script>
</svelte:head>

<script>
    import Bar from '../components/bar.svelte';
</script>

<div class="container">
    <!-- Each section is a div with the "section" class -->
    <div class="section">
     <h2>Section 1</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   <div class="section">
    <Bar />
     <h2>Section 2</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   <div class="section">
     <h2>Section 3</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   <div class="section">
     <h2>Section 4</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
   <div class="section">
     <h2>Section 5</h2>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
   </div>
 </div>