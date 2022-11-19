<script lang="ts">
	import '../app.css';
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import type { User } from '$lib/types/User';

	import axios from 'axios';
	axios.defaults.baseURL = PUBLIC_SERVER_URL;

	import { currentUser } from '$lib/stores';

	onMount(async () => {
		console.log('wweeeeeeee');

		console.log(window.localStorage.getItem('session'));

		interface Response {
			user: User;
		}

		const { data } = await axios.get<Response>('/me', {
			headers: {
				session: window.localStorage.getItem('session')
			}
		});

		if (data.user) {
			$currentUser = data.user;
		}
	});
</script>

<slot />
