<script lang="ts">
  import type { InventoryItem } from "../types/inventory";
  import { onMount } from "svelte";
  import { inventoryStore } from "../stores/inventory.store";
  import axios from "axios";
  import { inventoryApi } from "$lib/services/inventory.service";
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    } catch (e) {
      console.error("Date formatting error:", e, "for value:", dateStr);
      return "Invalid date";
    }
  };
  export let onEdit: (item: InventoryItem) => void;
  export let onDelete: (item: InventoryItem) => void;
  let loading = true;
  let items: InventoryItem[] = [];

  // Subscribe to the store for real-time updates
  $: items = $inventoryStore; // Svelte's reactive store syntax

  onMount(() => {
    loading = true;
    inventoryStore.loadItems().finally(() => {
      loading = false;
    });
  });
</script>

<div class="overflow-x-auto mt-8">
  {#if loading}
    <p class="text-gray-500">Loading inventory...</p>
  {:else}
    <table class="min-w-full border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >#</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Name</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Category</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Stock</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Buy Price</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Sell Price</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Date Added</th
          >
          <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700"
            >Actions</th
          >
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each items as item, index}
          <tr>
            <td class="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
            <td class="px-6 py-4 text-sm text-gray-900">{item.name}</td>
            <td class="px-6 py-4 text-sm text-gray-900"
              >{item.category?.name || "Uncategorized"}</td
            >
            <td class="px-6 py-4 text-sm text-gray-900">{item.stock}</td>
            <td class="px-6 py-4 text-sm text-gray-900">Rp. {item.buy_price}</td
            >
            <td class="px-6 py-4 text-sm text-gray-900"
              >Rp. {item.sell_price}</td
            >
            <td class="px-6 py-4 text-sm text-gray-900"
              >{item && item.createdAt
                ? formatDate(item.createdAt)
                : "Pending"}</td
            >
            <td class="px-6 py-4 text-sm text-gray-900">
              <button
                class="bg-black hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                on:click={() => onEdit(item)}
              >
                Edit
              </button>
              <button
                class="bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                on:click={() => onDelete(item)}
              >
                Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>
