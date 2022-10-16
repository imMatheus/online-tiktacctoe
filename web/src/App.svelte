<script lang="ts">
    import { onMount } from 'svelte'
    import Board from './lib/Board.svelte'
    import Leaderboard from './lib/Leaderboard.svelte'
    import { socket } from './stores'
    import axios from 'axios'
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
    console.log('server url: ', import.meta.env.VITE_SERVER_URL)

    onMount(() => {
        // const socket = io(import.meta.env.VITE_SERVER_URL)
        $socket.on('connect', () => {
            console.log('you connected with id: ', $socket.id)
            socket.set($socket)
        })
    })
</script>

<div class="px-2">
    <div class="mx-auto max-w-7xl">
        <Board />
        <button
            class="bg-blue-500 p-4 rounded-full"
            on:click={() => $socket.emit('join-queue', $socket.id)}
            >join queue</button
        >
        <h1 class="text-3xl font-bold underline">
            Socket id: {$socket.id}
        </h1>

        <Leaderboard />
    </div>
</div>
