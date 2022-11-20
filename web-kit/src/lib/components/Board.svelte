<script lang="ts">
  import type { Board } from "$lib/types/Board";
  import BoardSquare from "./BoardSquare.svelte";
  type Turn = "x" | "o";
  let game: Board = ["", "", "", "", "", "", "", "", ""];
  let turn: Turn = "x";
  let status: Turn | "ongoing" = "ongoing";

  function changeSquare(index: number) {
    if (game[index] !== "" || status !== "ongoing") return;

    game[index] = turn;
    turn = turn === "x" ? "o" : "x";
    game = [...game];
  }
</script>

{#if game}
  <h2 class="bg-pink-500 text-center text-7xl">
    {turn}
  </h2>
  {JSON.stringify(game, null, 2)}
  {#if status !== "ongoing"}
    <h2 class="bg-red-500 text-center text-7xl">
      The winner is {status}
    </h2>
  {/if}
  <div
    class="mx-auto grid aspect-square max-w-xs grid-cols-3 grid-rows-3 gap-2"
  >
    {#each game as value, index}
      <BoardSquare
        {value}
        disabled={status !== "ongoing"}
        onClick={() => changeSquare(index)}
      />
    {/each}
  </div>
{/if}

<style>
</style>
