<script>
	import { applyAction, enhance } from '$app/forms';
	export let data;
	export let form;
	let submitting = false;
</script>

<h1>Send a mail to {data.contactAddress}</h1>

{#if form?.success}
	<p>Message envoyé avec succès</p>
	<p>
		<a href="/">Nouveau message</a>
	</p>
{:else}
	<form
		method="post"
		use:enhance={() => {
			submitting = true;
			return async ({ result }) => {
				submitting = false;
				await applyAction(result);
			};
		}}
	>
		<label for="title">Contact:</label>
		<input type="text" id="contact" name="contact" />
		{#if form?.errors?.contact}
			<span>{form?.errors?.contact}</span>
		{/if}

		<label for="title">Title:</label>
		<input type="text" id="title" name="title" />
		{#if form?.errors?.title}
			<span>{form?.errors?.title}</span>
		{/if}

		<label for="content">Content:</label>
		<textarea id="content" name="content" />
		{#if form?.errors?.content}
			<span>{form?.errors?.content}</span>
		{/if}

		<input type="submit" value={submitting ? 'envoie en cours...' : 'envoyer'} />
	</form>
{/if}

<style>
	:global(main._contact) {
		margin-top: 2rem;
		padding: 0 25%;
		& h1 {
			font-size: 24px;
			text-decoration: underline;
			margin: 1rem;
		}
		& p {
			margin: 1rem;
			text-align: center;
			& a {
				color: blue;
			}
		}
		& form {
			display: grid;

			& label {
				text-decoration: underline;
				margin: 0.75rem;
				margin-top: 1.175rem;
			}
			& input,
			textarea {
				border: 1px solid lightgray;
				border-radius: 5px;
				padding: 0.3rem;
			}
			& textarea {
				height: 200px;
			}

			& input[type='submit'] {
				margin-top: 2rem;
				text-align: center;
				border-color: darkred;
				color: darkred;
				box-shadow: 4px 4px black;

				&:active {
					transform: translate(4px, 4px);
					box-shadow: unset;
				}
			}
			& span {
				color: red;
				text-align: right;
				font-size: 14px;
				padding: 0.3rem;
			}
		}
	}
	@media (max-width: 1024px) {
		:global(main._contact) {
			padding: 5% 10%;
		}
	}
	@media (max-width: 768px) {
		:global(main._contact) {
			padding: 0.75rem 0.75rem;
		}
		:global(main._contact h1) {
			font-size: 20px;
		}
		:global(main._contact label) {
			font-size: 14px;
		}
		:global(main._contact span) {
			font-size: 10px;
		}
	}
</style>
