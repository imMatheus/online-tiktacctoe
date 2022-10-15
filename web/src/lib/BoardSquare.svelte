<script lang="ts">
    import type { SquareValue, Winner } from 'src/types/Board'

    export let value: SquareValue
    export let winner: Winner
    export let onClick: () => void
</script>

<button
    disabled={!!winner}
    class="bg-red-500 disabled:opacity-75 rounded-2xl text-2xl md:text-7xl font-semibold flex justify-center items-center"
    on:click={onClick}
>
    {value}
</button>
