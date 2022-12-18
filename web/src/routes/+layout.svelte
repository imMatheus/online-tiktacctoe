<script lang="ts">
    import '../app.css'
    import { PUBLIC_SERVER_URL } from '$env/static/public'
    import { onMount } from 'svelte'
    import type { User } from '$lib/types/User'

    import axios from 'axios'
    axios.defaults.baseURL = PUBLIC_SERVER_URL
    axios.defaults.withCredentials = true

    import { currentUser } from '$lib/stores'

    onMount(async () => {
        interface Response {
            user: User
        }

        const { data } = await axios.get<Response>('/me', {})

        if (data.user) {
            $currentUser = data.user
        }
    })
</script>

<div class="w-full p-2">
    <div class="mx-auto max-w-2xl">
        {#if $currentUser}
            <div
                class="absolute top-4 right-4 flex items-center gap-2 md:right-6 md:top-6"
            >
                <img
                    src={$currentUser.avatar_url}
                    class="h-10 w-10 rounded-full border border-black bg-white"
                    alt={`${$currentUser?.name} avatar url`}
                />

                <h3 class="text-sm font-bold">{$currentUser.name}</h3>
            </div>
        {/if}

        <slot />
    </div>
</div>

<style>
    :global(body) {
        @apply bg-cream;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
