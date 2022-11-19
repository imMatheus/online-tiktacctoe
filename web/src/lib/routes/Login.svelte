<script lang="ts">
    import axios from 'axios'
    import { currentUser } from '../../stores'

    let name = ''
    let password = ''

    interface Response {
        user: User
        session: string
        login: boolean
        cookie: string
    }

    interface User {
        _id: string
        name: string
        avatar_url: string
    }

    async function login() {
        const { data } = await axios.post<Response>('/login', {
            name,
            password,
        })

        console.log('we send a login request')
        console.log(data.cookie)

        window.localStorage.setItem('session', data.session)
        document.cookie = data.cookie
        document.cookie = 'session=' + data.session

        if (data.user?._id) {
            $currentUser = data.user
            // window.location = 'https://adasd.com'
        }
    }

    function logout() {
        window.localStorage.removeItem('session')
        $currentUser = null
    }
</script>

<div class="">
    <form on:submit|preventDefault={login}>
        <input
            class="bg-green-500 p-2 rounded-md"
            type="text"
            bind:value={name}
        />
        <input
            class="bg-green-500 p-2 rounded-md"
            type="text"
            bind:value={password}
        />
        <button type="submit">Login</button>
    </form>

    <h2 class="">{JSON.stringify($currentUser)}</h2>

    <button class="bg-red-600 p-4 rounded" on:click={logout}>Logout</button>
</div>

<style>
</style>
