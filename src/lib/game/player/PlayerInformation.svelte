<script lang="ts">
	import type Player from './Player.type';

	const { player }: { player: Player } = $props();
</script>

<li class="p-4">
	<h1 class="text-xl font-semibold">{player.name}</h1>
	<ul class="ml-2">
		{#each player.handCards as handCard}
			<li>
				{handCard.title}
			</li>
		{/each}
	</ul>
</li>
