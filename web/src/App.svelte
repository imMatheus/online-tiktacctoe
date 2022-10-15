<script lang="ts">
    import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:4000'
    import Counter from './lib/Counter.svelte'
    const promise = axios.get('/users')
</script>

<div class="card">
    <Counter />
</div>

{#await promise}
    <!-- promise is pending -->
    <p>waiting for the promise to resolve...</p>
{:then value}
    <!-- promise was fulfilled -->
    <pre> {JSON.stringify(value.data, null, 2)}</pre>
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}

<style>
    .card {
        background-color: red;
    }
</style>
