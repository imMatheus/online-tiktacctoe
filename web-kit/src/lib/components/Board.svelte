<script lang="ts">
	import type { Board, Winner, Status } from '$lib/types/Board';
	import { checkWinner } from '$lib/utils/checkWinner';
	import Banner from '$lib/components/Banner.svelte';
	import BoardSquare from './BoardSquare.svelte';

	type Turn = Winner;
	let game: Board = ['', '', '', '', '', '', '', '', ''];
	let turn: Turn = 'x';
	let status: Status = 'ongoing';
	$: {
		status = checkWinner(game);
	}

	function changeSquare(index: number) {
		if (game[index] !== '' || status !== 'ongoing') return;

		game[index] = turn;
		turn = turn === 'x' ? 'o' : 'x';
		game = [...game];
	}

	function restartGame() {
		game = ['', '', '', '', '', '', '', '', ''];
		turn = 'x';
		status = 'ongoing';
	}
</script>

<h2 class="bg-pink-500 text-center text-7xl">
	{turn}
</h2>
{JSON.stringify(game, null, 2)}
{#if status !== 'ongoing'}
	<h2 class="bg-red-500 text-center text-7xl">
		The winner is {status}
	</h2>
{/if}
<div class="mx-auto grid aspect-square max-w-xs grid-cols-3 grid-rows-3 gap-2">
	{#each game as value, index}
		<BoardSquare {value} disabled={status !== 'ongoing'} onClick={() => changeSquare(index)} />
	{/each}
</div>
<div class="grid md:grid-cols-2 gap-4 mt-4">
	<button on:click={restartGame}>
		<Banner text="Restart game" className="bg-fire" />
	</button>
	<Banner text="Go back" className="bg-purple" href="/" />
</div>

<style>
</style>
