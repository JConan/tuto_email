<script lang="ts">
	import { page } from '$app/stores';
	import 'the-new-css-reset/css/reset.css';
</script>

<div id="page">
	<header>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</header>
	<main class={$page.url.pathname.replaceAll('/', '_')}>
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

	:global(a) {
		color: blue;
		text-decoration: none;

		&:hover {
			color: darkred;
		}
	}

	#page {
		display: flex;
		flex-direction: column;

		& header ul {
			display: flex;
			padding: 0.5rem;
			align-items: center;
			list-style: none;

			& li {
				margin: 0 0.5rem;
			}
		}

		& main {
			flex-grow: 1;
			overflow-y: auto;
			padding-bottom: 1rem;
		}
	}
</style>
