<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { InventoryItem } from "../types/inventory";
  import { inventoryStore } from "../stores/inventory.store";

  export let isOpen: boolean;
  export let onClose: () => void;
  export let item: InventoryItem | null = null;

  let isBrowser = false;

  onMount(() => {
    isBrowser = true;
    if (isOpen) setupKeyListener();
  });

  onDestroy(() => {
    if (isBrowser) removeKeyListener();
  });

  function handleDelete(): void {
    if (!item) return;
    if (item.stock > 0) {
      alert("Can't delete item that has stock more than 0!");
      return;
    }
    inventoryStore.deleteItem(item.id);
    onClose();
  }

  function handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal-overlay")) {
      onClose();
    }
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      onClose();
    }
  }

  function setupKeyListener(): void {
    if (isBrowser) {
      document.addEventListener("keydown", handleKeyDown);
    }
  }

  function removeKeyListener(): void {
    if (isBrowser) {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }

  $: if (isOpen && isBrowser) {
    setupKeyListener();
  } else if (!isOpen && isBrowser) {
    removeKeyListener();
  }
</script>

{#if isOpen && item}
  <div
    class="modal-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    on:click={handleOutsideClick}
  >
    <div class="bg-white rounded-lg w-1/3 p-6" on:click|stopPropagation>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Confirm Deletion</h2>
        <div class="flex">
          <span class="text-xs text-gray-500 mr-2 self-center"
            >(ESC to close)</span
          >
          <button on:click={onClose} class="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      <p class="mb-6">
        Are you sure you want to delete "{item.name}"? This action cannot be
        undone.
      </p>
      <div class="flex justify-end">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          on:click={onClose}
        >
          Cancel
        </button>
        <button
          class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
          on:click={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
{/if}
