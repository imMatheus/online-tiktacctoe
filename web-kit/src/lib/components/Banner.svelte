<script lang="ts">
  import classNames from "classnames";
  export let href: string | undefined = undefined;
  export let text: string;
  export let className: HTMLDivElement["className"];
</script>

{#if href}
  <a {href}>
    <div class="group relative mb-3 cursor-pointer">
      <div
        class={classNames(
          "relative z-10 text-center rounded-2xl border-2 border-black p-4 text-xl font-black md:border-4 md:text-2xl",
          className
        )}
      >
        {text}
      </div>
      <div
        class="absolute top-1 left-1 h-full w-full rounded-2xl bg-black transition-all group-hover:left-2 group-hover:top-2"
      />
    </div>
  </a>
{:else}
  <div class="group relative mb-3 cursor-pointer">
    <div
      class={classNames(
        "relative z-10 text-center rounded-2xl border-2 border-black p-4 text-xl font-black md:border-4 md:text-2xl",
        className
      )}
    >
      {text}
    </div>
    <div
      class="absolute top-1 left-1 h-full w-full rounded-2xl bg-black transition-all group-hover:left-2 group-hover:top-2"
    />
  </div>
{/if}
