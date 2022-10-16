<script lang="ts">
    import { onMount } from 'svelte'
    import axios from 'axios'
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
    console.log('server url: ', import.meta.env.VITE_SERVER_URL)
    import { socket } from './stores'

    onMount(() => {
        // const socket = io(import.meta.env.VITE_SERVER_URL)
        $socket.on('connect', () => {
            console.log('you connected with id: ', $socket.id)
            socket.set($socket)
        })
    })

    import Board from './lib/Board.svelte'
    const promise = axios.get('/games')
</script>

<Board />
<button
    class="bg-blue-500 p-4 rounded-full"
    on:click={() => $socket.emit('join-queue', $socket.id)}>join queue</button
>
<h1 class="text-3xl font-bold underline text-green-500">
    Hello world!{$socket.id}
</h1>

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
