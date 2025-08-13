<script lang="ts">
	let contextMenu = $state<HTMLDivElement | undefined>();
	let menuItems = $state<ContextMenuItem[]>([]);

	document.addEventListener('click', function (event: MouseEvent) {
		const target = event.target;
		if (target instanceof Node && !contextMenu?.contains(target)) {
			hideMenu();
		}
	});

	export function hideMenu() {
		contextMenu?.classList.add('hidden');
		contextMenu?.classList.remove('block');
	}

	function showMenu() {
		contextMenu?.classList.add('block');
		contextMenu?.classList.remove('hidden');
	}

	export function openMenu(e: MouseEvent) {
		e.stopPropagation();

		if (!contextMenu) {
			return;
		}

		determineContextWindowPosition(contextMenu, e);
		showMenu();
	}

	function determineContextWindowPosition(cm: HTMLDivElement, e: MouseEvent) {
		cm.style.display = 'block';
		const menuWidth = cm.offsetWidth;
		const menuHeight = cm.offsetHeight;
		cm.style.display = '';

		let posX = e.pageX;
		let posY = e.pageY;

		if (posX + menuWidth > window.innerWidth) {
			posX = window.innerWidth - menuWidth;
		}

		if (posY + menuHeight > window.innerHeight) {
			posY = window.innerHeight - menuHeight;
		}

		cm.style.left = posX + 'px';
		cm.style.top = posY + 'px';
	}

	interface ContextMenuItem {
		icon?: string;
		text: string;
		clickListener: () => void;
	}

	export function createMenuItems(mi: ContextMenuItem[]) {
		menuItems = mi;
	}
</script>

<div bind:this={contextMenu} class="absolute z-10 hidden">
	<ul class="menu flex flex-col overflow-hidden rounded-md shadow-xl">
		{#each menuItems as menuItem}
			<li
				class="h-full w-full cursor-pointer bg-white p-4 text-gray-800 transition-all ease-linear hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800/50">
				<button onclick={menuItem.clickListener}>
					{#if menuItem.icon}
						<i class={menuItem.icon + ' mr-1'}></i>
					{/if}
					{menuItem.text}
				</button>
			</li>
		{/each}
	</ul>
</div>
