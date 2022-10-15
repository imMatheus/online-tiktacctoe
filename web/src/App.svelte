<script lang="ts">
    import axios from 'axios'
    axios.defaults.baseURL = 'http://localhost:4000'
    import Board from './lib/Board.svelte'
    const promise = axios.get('/games')
</script>

<Board />
<h1 class="text-3xl font-bold underline text-green-500">Hello world!</h1>

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
