<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import type { User } from '$lib/types/User';
	import { currentUser } from '$lib/stores';
</script>

{#if !$currentUser}
	<Banner text="Login" className="bg-fire" href="login" />
{:else}
	<Banner text="Open play (online)" className="bg-fuchsia" href="/queue" />
	<Banner text="Friend vs Friend (online)" className="bg-purple" href="/fvf" />
{/if}

<Banner text="Friend vs Friend (local)" className="bg-blueberry" href="/local" />
