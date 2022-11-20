<script lang="ts">
  import Banner from "$lib/components/Banner.svelte";
</script>

<div class="">
  <h1 class="mb-4 text-6xl font-black italic md:mb-7 md:text-7xl">
    <span class="text-blueberry">404</span>
    <span class="text-fuchsia">not</span>
    <span class="text-fire">found</span>
  </h1>

  <Banner
    text="Go Back"
    className="bg-gradient-to-tr from-blueberry via-fuchsia to-fire"
    href="/"
  />
</div>

<style>
</style>
