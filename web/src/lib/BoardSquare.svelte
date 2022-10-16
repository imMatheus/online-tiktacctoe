<script lang="ts">
    import type { SquareValue, Winner } from 'src/types/Board'

    export let value: SquareValue
    export let disabled: boolean
    export let onClick: () => void
</script>

<button
    {disabled}
    class="bg-gray-800 disabled:opacity-75 rounded-2xl text-2xl sm:text-5xl text-gray-100 font-semibold flex justify-center items-center"
    on:click={onClick}
>
    {value}
</button>
