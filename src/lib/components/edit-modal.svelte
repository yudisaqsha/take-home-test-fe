<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { InventoryItem, FormData, Category } from "../types/inventory";
  import { initialFormState } from "../types/inventory";
  import { inventoryStore } from "../stores/inventory.store";
  import { inventoryApi } from "$lib/services/inventory.service";

  // Props
  export let isOpen: boolean;
  export let onClose: () => void;
  export let item: InventoryItem | null = null;

  // Local state
  let formData: FormData = { ...initialFormState };
  let isBrowser = false;

  let categories: Category[] = [];

  onMount(async () => {
    isBrowser = true;
    if (isOpen) setupKeyListener();

    try {
      categories = await inventoryApi.getCategory();
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  });

  onDestroy(() => {
    if (isBrowser) removeKeyListener();
  });

  $: if (item) {
    formData = {
      name: item.name,
      categoryId: item.categoryId,
      stock: item.stock,
      buy_price: item.buy_price,
      sell_price: item.sell_price,
    };
  }

  function handleSubmit(): void {
    if (!item) return;
    inventoryStore.editItem(item.id, formData);
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
    <div class="bg-white rounded-lg w-1/2 p-6" on:click|stopPropagation>
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Edit Data</h2>
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
      <form on:submit|preventDefault={handleSubmit}>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editName"
          >
            Name
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editName"
            name="name"
            type="text"
            placeholder="Enter name"
            bind:value={formData.name}
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editCategory"
          >
            Category
          </label>
          <select
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editCategory"
            name="category"
            bind:value={formData.categoryId}
            required
          >
            {#each categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editStock"
          >
            Stock
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editStock"
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            bind:value={formData.stock}
            required
            min="0"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editbuy_price"
          >
            Buy Price
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editbuy_price"
            name="buy_price"
            type="number"
            step="0.01"
            placeholder="Enter buy price"
            bind:value={formData.buy_price}
            required
            min="0"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="editsell_price"
          >
            Sell Price
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="editsell_price"
            name="sell_price"
            type="number"
            step="0.01"
            placeholder="Enter sell price"
            bind:value={formData.sell_price}
            required
            min="0"
          />
        </div>
        <div class="flex justify-end">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            type="button"
            on:click={onClose}
          >
            Cancel
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}
