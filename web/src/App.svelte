<script lang="ts">
    import axios from 'axios'
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL
    import { currentUser } from './stores'

    import { onMount } from 'svelte'

    onMount(async () => {
        console.log('wweeeeeeee')

        console.log(window.localStorage.getItem('session'))

        interface Response {
            user: {
                avatar_url: string
                iat: number
                name: string
                _id: string
            }
        }

        const { data } = await axios.get<Response>('/me', {
            headers: {
                session: window.localStorage.getItem('session'),
            },
        })

        if (data.user) {
            $currentUser = data.user
        }
    })

    import Router from 'svelte-spa-router'
    import Home from './lib/routes/Home.svelte'
    import Game from './lib/routes/Game.svelte'
    import Login from './lib/routes/Login.svelte'
    import NotFound from './lib/routes/NotFound.svelte'

    const routes = {
        '/': Home,
        '/games/:id': Game,
        '/login': Login,
        '*': NotFound,
    }
</script>

<main>
    <Router {routes} />
</main>
