<script lang="ts">
    import type { Game } from '../types/Board'
    import { getDateSinceGame } from '../utils/getDateSinceGame'
    export let game: Game
</script>

<div class="py-1 items-center justify-between bg-gray-100 rounded px-4 flex">
    <div class="flex flex-col gap-1">
        <h4 class="font-extrabold text-2xl text-blue-500">
            {game.status === 'draw'
                ? 'Draw'
                : game.status === 'ongoing'
                ? 'Not finished'
                : game.status.toUpperCase() + ' won'}
        </h4>
        <p class="text-gray-500 text-sm">
            Played {getDateSinceGame(game.updatedAt)}
        </p>
    </div>
    <div
        class="w-20 h-20 lg:h-24 lg:w-24 bg-gray-100 gap-1 grid grid-cols-3 grid-rows-3"
    >
        {#each game.board as square}
            <div
                class="flex rounded items-center justify-center text-gray-100 bg-gray-800 text-xs"
            >
                {square}
            </div>
        {/each}
    </div>
</div>
