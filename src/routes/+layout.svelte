<div id="page">
	<header>
		<ul>
			<li><a href="/">Home</a></li>
		</ul>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	:global(:root) {
		font-family: 'Roboto', sans-serif;
	}
	:global(:root),
	:global(body),
	#page {
		height: 100%;
	}

	#page {
		display: flex;
		flex-direction: column;

		& header ul {
			display: flex;
			padding: 0.5rem;
			align-items: center;
		}

		& main {
			flex-grow: 1;
			overflow-y: auto;
			padding-bottom: 1rem;
		}
	}
</style>
