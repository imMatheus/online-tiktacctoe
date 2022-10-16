<script lang="ts">
    import { onMount } from 'svelte'
    import Board from './lib/Board.svelte'
    import Leaderboard from './lib/Leaderboard.svelte'
    import { socket } from './stores'
    import axios from 'axios'
    import BoardSquare from './lib/BoardSquare.svelte'
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
    console.log('server url: ', import.meta.env.VITE_SERVER_URL)

    onMount(() => {
        // const socket = io(import.meta.env.VITE_SERVER_URL)
        $socket.on('connect', () => {
            console.log('you connected with id: ', $socket.id)
            socket.set($socket)
        })
    })

    let name = ''
    let password = ''

    async function login() {
        const res = await axios.post<{ session: string; cookie: string }>(
            '/login',
            {
                name,
                password,
            }
        )

        console.log('we send a login request')
        console.log(res.data.cookie)
        document.cookie = res.data.cookie
        document.cookie = 'session=' + res.data.session
    }
</script>

<div class="px-2">
    <div class="bg-orange-500 p-10">
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
        <form on:submit|preventDefault={login}>
            <input
                class="bg-green-500 p-2 rounded-md"
                type="text"
                bind:value={name}
            />
            <input
                class="bg-green-500 p-2 rounded-md"
                type="text"
                bind:value={password}
            />
            <button type="submit">Login</button>
        </form>

        <Leaderboard />
    </div>
</div>
