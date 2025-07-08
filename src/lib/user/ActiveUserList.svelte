<script lang="ts">
	import { onDestroy } from 'svelte';
	import type User from './User.type';
	import UserList from './UserList.svelte';
	import { activeUsers } from './UserStore';

	let users: User[] = $state<User[]>([]);

	const unsubscribe = activeUsers.subscribe((u) => (users = u));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="h-full w-full">
	<UserList {users} />
</div>
