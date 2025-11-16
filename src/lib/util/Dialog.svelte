<script lang="ts">
	import { Dialog as D, Portal } from '@skeletonlabs/skeleton-svelte';

	let openState = $state(false);

	let closable: boolean = $state(true);
	let t: string | null = $state(null);
	let d: string | null = $state(null);
	let approveListener: (() => void) | null = $state(null);
	let rejectListener: (() => void) | null = $state(null);

	export function openDialog(
		isClosable: boolean = true,
		title: string | null = null,
		description: string | null = null,
		onApproved: (() => void) | null = null,
		onRejected: (() => void) | null = null
	): void {
		openState = true;
		closable = isClosable;
		t = title;
		d = description;
		approveListener = onApproved;
		rejectListener = onRejected;
	}

	export function closeDialog(): void {
		openState = false;
	}

	function onApprove(): void {
		if (approveListener) {
			approveListener();
		}
	}

	function onReject(): void {
		if (rejectListener) {
			rejectListener();
		}
	}
</script>

<D closeOnInteractOutside={closable} open={openState} onOpenChange={(e) => (openState = e.open)}>
	<Portal>
		<D.Backdrop class="bg-surface-50-950/50 fixed inset-0 z-50" />
		<D.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<D.Content class="card bg-surface-100-900 w-md space-y-2 p-4 shadow-xl">
				<D.Title class="text-2xl font-bold">{t}</D.Title>
				<D.Description>
					{d}
				</D.Description>
				<footer class="flex justify-end gap-2">
					{#if approveListener || rejectListener}
						{#if rejectListener}
							<D.CloseTrigger class="btn preset-tonal" onclick={onReject}>
								Reject
							</D.CloseTrigger>
						{/if}
						{#if approveListener}
							<D.CloseTrigger class="btn preset-tonal" onclick={onApprove}>
								Approve
							</D.CloseTrigger>
						{/if}
					{:else}
						<D.CloseTrigger class="btn preset-tonal">Close</D.CloseTrigger>
					{/if}
				</footer>
			</D.Content>
		</D.Positioner>
	</Portal>
</D>
