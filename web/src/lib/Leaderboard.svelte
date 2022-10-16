<script lang="ts">
    import type { Game } from '../types/Board'
    import axios from 'axios'
    const promise = axios.get<Game[]>('/games')

    import Spinner from './Spinner.svelte'
    import LeaderboardRow from './LeaderboardRow.svelte'
</script>

<div class="mt-5">
    {#await promise}
        <Spinner />
    {:then { data }}
        <h2 class="font-bold text-3xl mb-4">Leaderboard</h2>
        <div class="space-y-1">
            {#each data as game}
                <LeaderboardRow {game} />
            {/each}
        </div>
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
