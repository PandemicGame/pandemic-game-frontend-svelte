<script lang="ts">
	import type Player from './Player.type';
	import PlayerInformation from './PlayerInformation.svelte';

	let { players }: { players: Player[] } = $props();
</script>

<ul>
	{#each players as player}
		<PlayerInformation {player} />
	{/each}
</ul>
