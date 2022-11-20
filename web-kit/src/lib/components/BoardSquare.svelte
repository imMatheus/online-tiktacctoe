<script lang="ts">
  import classNames from "classnames";
  import type { Winner } from "$lib/types/Board";
  export let value: Winner;
  export let disabled: boolean;
  export let onClick: () => void;
</script>

<button
  {disabled}
  class="flex items-center justify-center rounded-2xl bg-black pb-2 font-semibold disabled:opacity-75"
  on:click={onClick}
>
  <p
    class={classNames(
      "text-2xl sm:text-7xl font-semibold ",
      value === "x" ? "text-fuchsia" : "text-blueberry"
    )}
  >
    {value}
  </p>
</button>
