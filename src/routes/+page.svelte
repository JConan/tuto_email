<script>
    import { applyAction, enhance } from "$app/forms";
    import "the-new-css-reset/css/reset.css";
    export let data;
    export let form;

    const sample = {
        title: "hello message",
        content: `This is a demo message for testing purpose.\nThe message should be sent to the contact email address.`,
    };
    let submitting = false;
</script>

<main>
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
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" value={sample.title} />
            <label for="content">Content:</label>
            <textarea id="content" name="content" value={sample.content} />

            <input
                type="submit"
                value={submitting ? "envoie en cours..." : "envoyer"}
            />
        </form>
    {/if}
</main>

<style>
    main {
        font-family: "Roboto", sans-serif;
        margin: auto;
        margin-top: 2rem;
        width: 500px;
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
            }
            & textarea {
                height: 200px;
            }

            & input[type="submit"] {
                margin-top: 2rem;
                text-align: center;
                border-color: darkred;
                color: darkred;
                padding: 0.3rem;
                box-shadow: 4px 4px black;

                &:active {
                    transform: translate(4px, 4px);
                    box-shadow: unset;
                }
            }
        }
    }
</style>
