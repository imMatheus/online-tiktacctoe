<script lang="ts">
  import axios from "axios";
  import { currentUser } from "../../lib/stores";
  import type { User } from "$lib/types/User";
  import { goto } from "$app/navigation";

  let name = "";
  let password = "";

  interface Response {
    user: User;
    session: string;
    login: boolean;
    cookie: string;
  }

  async function login() {
    const { data } = await axios.post<Response>("/login", {
      name,
      password,
    });

    console.log("we send a login request");
    console.log(data);

    if (data.user?._id) {
      window.localStorage.setItem("session", data.session);
      document.cookie = data.cookie;
      document.cookie = "session=" + data.session;
      $currentUser = data.user;
      goto("/");
    }
  }

  function logout() {
    window.localStorage.removeItem("session");
    $currentUser = null;
  }
</script>

<div class="">
  <form on:submit|preventDefault={login}>
    <input class="rounded-md bg-green-500 p-2" type="text" bind:value={name} />
    <input
      class="rounded-md bg-green-500 p-2"
      type="text"
      bind:value={password}
    />
    <button type="submit">Login</button>
  </form>

  <h2 class="">{JSON.stringify($currentUser)}</h2>

  <button class="rounded bg-red-600 p-4" on:click={logout}>Logout</button>
</div>

<style>
</style>
