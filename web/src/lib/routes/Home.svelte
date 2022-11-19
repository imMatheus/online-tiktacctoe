<script lang="ts">
    import { onMount } from 'svelte'
    import Board from '../Board.svelte'
    import Leaderboard from '../Leaderboard.svelte'
    import { socket, currentUser } from '../../stores'

    onMount(() => {
        // const socket = io(import.meta.env.VITE_SERVER_URL)
        $socket.on('connect', () => {
            socket.set($socket)
        })
    })
</script>

<div class="px-2">
    <div class="bg-orange-500 p-10">
        <h2 class="">{JSON.stringify($currentUser)}</h2>
        {JSON.stringify(document.cookie, null, 2)}
    </div>
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
