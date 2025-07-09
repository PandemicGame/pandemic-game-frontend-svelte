<script lang="ts">
	import Lobby from '$lib/lobby/Lobby.type';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { lobbyStore } from '$lib/lobby/LobbyStore';
	import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
	import { Tooltip } from '@skeletonlabs/skeleton-svelte';
	import { onDestroy, onMount } from 'svelte';

	let lobbies = $state<Lobby[]>([]);

	let lobbyMemberTooltipOpenStates = $state<boolean[]>([]);

	const unsubscribe = lobbyStore.subscribe((l) => {
		lobbies = l;
		lobbyMemberTooltipOpenStates = lobbies.map((lobby) => false);
	});

	onDestroy(() => unsubscribe());

	onMount(() => {
		const unsubscribeWaitForWS = userWebSocketConnector.isAuthenticated.subscribe((c) => {
			if (c) {
				lobbyService.fetchAllLobbies();
			}
		});
		return () => unsubscribeWaitForWS();
	});
</script>

<div class="flex h-screen w-screen flex-col justify-between gap-4 px-8 py-4">
	<div class="flex flex-col">
		<h1 class="text-center text-2xl">All Lobbies</h1>
		<div class="table-wrap">
			<table class="table caption-bottom">
				<thead>
					<tr>
						<th>Name</th>
						<th>Owner</th>
						<th class="!text-right">Members</th>
					</tr>
				</thead>
				<tbody class="[&>tr]:hover:preset-tonal-primary">
					{#each lobbies as lobby, i}
						<tr>
							<td>{lobby.name}</td>
							<td>{lobby.getOwnerName()}</td>
							<td class="text-right">
								<Tooltip
									open={lobbyMemberTooltipOpenStates[i]}
									onOpenChange={(e) => (lobbyMemberTooltipOpenStates[i] = e.open)}
									positioning={{ placement: 'top' }}
									contentBase="card preset-filled p-4"
									openDelay={200}
									arrow>
									{#snippet trigger()}
										{lobby.members?.length}
									{/snippet}
									{#snippet content()}
										<ul>
											{#each lobby.members ?? [] as member}
												<li>{member.name}</li>
											{/each}
										</ul>
									{/snippet}
								</Tooltip>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<div class="flex flex-row justify-end gap-2">
		<a
			href="/"
			class="btn preset-filled-error-500"
			draggable="false"
			data-sveltekit-preload-data="off">Back to Main Menu</a>
	</div>
</div>
