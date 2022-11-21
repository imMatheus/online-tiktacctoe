<script lang="ts">
	import axios from 'axios';
	import { currentUser } from '../../lib/stores';
	import type { User } from '$lib/types/User';
	import { goto } from '$app/navigation';
	import Banner from '$lib/components/Banner.svelte';

	let name = '';
	let password = '';
	let error = '';

	interface Response {
		user: User;
		session: string;
		login: boolean;
		cookie: string;
	}

	async function login() {
		try {
			const { data } = await axios.post<Response>('/login', {
				name,
				password
			});

			console.log('we send a login request');
			console.log(data);

			if (data.user?._id) {
				window.localStorage.setItem('session', data.session);
				document.cookie = data.cookie;
				document.cookie = 'session=' + data.session;
				$currentUser = data.user;
				goto('/');
			}
		} catch (e: any) {
			console.log(e?.response?.data?.message);
			error = e?.response?.data?.message;
		}
	}

	function logout() {
		window.localStorage.removeItem('session');
		$currentUser = null;
	}
</script>

<div class="font-black">
	<form on:submit|preventDefault={login} class="italic">
		<div class="my-4 grid gap-4 md:grid-cols-2">
			<div>
				<label for="name" class="italic"
					>Username <span class="text-sm">{'(2-20 characters)'}</span></label
				>
				<div class="relative group">
					<input
						class="w-full relative z-10 rounded-xl border-4 border-black bg-fire p-2 outline-none"
						id="name"
						name="name"
						type="text"
						maxlength="20"
						bind:value={name}
					/>

					<div
						class="absolute top-0 left-0 h-full w-full rounded-2xl bg-black transition-all group-focus-within:left-1 group-focus-within:top-1"
					/>
				</div>
			</div>

			<div>
				<label for="name" class="italic"
					>Password <span class="text-sm">{'(min 5 characters)'}</span></label
				>
				<div class="relative group">
					<input
						class="w-full relative z-10 rounded-xl border-4 border-black bg-fire p-2 outline-none"
						id="password"
						name="password"
						type="password"
						bind:value={password}
					/>

					<div
						class="absolute top-0 left-0 h-full w-full rounded-2xl bg-black transition-all group-focus-within:left-1 group-focus-within:top-1"
					/>
				</div>
			</div>
		</div>

		{#if error}
			<p
				class="text my-4 rounded-md border border-red-700 bg-red-200 p-3 text-sm font-black text-red-700"
			>
				{error}
			</p>
		{/if}
		<button type="submit" class="block w-full">
			<Banner text="Login" className="bg-blueberry" />
		</button>
	</form>

	<button class="block w-full" on:click={logout}>
		<Banner text="Logout" className="bg-fuchsia" />
	</button>
	<h2 class="my-5">{JSON.stringify($currentUser)}</h2>
</div>

<style>
</style>
