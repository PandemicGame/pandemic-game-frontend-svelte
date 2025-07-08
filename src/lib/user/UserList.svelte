<script lang="ts">
	import type User from './User.type';

	let { users }: { users: User[] } = $props();
</script>

<div class="h-full w-full overflow-hidden">
	<ul class="overflow-y-scroll">
		{#each users as user}
			<li>
				{user.name}
			</li>
		{/each}
	</ul>
</div>
