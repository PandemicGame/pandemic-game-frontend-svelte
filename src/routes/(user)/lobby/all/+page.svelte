<script lang="ts">
	import Lobby from '$lib/lobby/Lobby.type';
	import { lobbyService } from '$lib/lobby/LobbyService';
	import { lobbyStore } from '$lib/lobby/LobbyStore';
	import { userWebSocketConnector } from '$lib/user/UserWebSocketConnector';
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
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

	function joinLobby(lobby: Lobby) {
		lobbyService.joinLobby(lobby.id);
	}
</script>

<div class="flex h-screen w-screen flex-col justify-between gap-4 px-8 py-4">
	<div class="flex w-full flex-col">
		<h1 class="text-center text-2xl">All Lobbies</h1>
		<div class="table-wrap w-full">
			<table class="table w-full table-fixed">
				<thead>
					<tr>
						<th>Name</th>
						<th>Owner</th>
						<th class="!text-right">Members</th>
					</tr>
				</thead>
				<tbody class="[&>tr]:hover:preset-tonal-primary w-full overflow-hidden">
					{#each lobbies as lobby, i}
						<tr class="w-full" onclick={() => joinLobby(lobby)}>
							<td>{lobby.name}</td>
							<td>
								<div class="truncate">{lobby.getOwnerName()}</div>
							</td>
							<td class="text-right">
								<Tooltip
									open={lobbyMemberTooltipOpenStates[i]}
									onOpenChange={(e) => (lobbyMemberTooltipOpenStates[i] = e.open)}
									positioning={{ placement: 'top' }}
									openDelay={200}>
									<Tooltip.Trigger>{lobby.members.length}</Tooltip.Trigger>
									<Portal>
										<Tooltip.Positioner>
											<Tooltip.Content
												class="card bg-surface-100-900 p-2 shadow-xl">
												<ul>
													{#each lobby.members as member}
														<li>{member.name}</li>
													{/each}
												</ul>

												<Tooltip.Arrow
													style="--arrow-size: calc(var(--spacing) * 2); --arrow-background: var(--color-surface-100-900);">
													<Tooltip.ArrowTip />
												</Tooltip.Arrow>
											</Tooltip.Content>
										</Tooltip.Positioner>
									</Portal>
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
