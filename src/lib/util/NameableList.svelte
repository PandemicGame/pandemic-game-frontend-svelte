<script lang="ts">
	import type Nameable from './Nameable';

	let { nameables }: { nameables: Nameable[] } = $props();
</script>

<div class="h-full w-full overflow-hidden">
	<ul class="overflow-y-scroll">
		{#each nameables as nameable}
			<li class="truncate">
				{nameable.name}
			</li>
		{/each}
	</ul>
</div>
