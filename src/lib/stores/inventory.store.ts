// src/stores/inventory.store.ts
import { writable } from "svelte/store";
import type { InventoryItem, FormData } from "../types/inventory";
import { inventoryApi } from "../services/inventory.service";

// Initial empty state
const initialItems: InventoryItem[] = [];

// Create a writable store

const createInventoryStore = () => {
  const { subscribe, set, update } = writable<InventoryItem[]>(initialItems);

  return {
    subscribe,

    // Load all inventory items from API
    loadItems: async () => {
      try {
        const items = await inventoryApi.getAllItems();
        set(items);
      } catch (error) {
        console.error("Failed to load inventory items:", error);
        // Optionally set fallback data or handle error
      }
    },

    // Add a new item via API
    addItem: async (formData: FormData) => {
      try {
        await inventoryApi.addItem(formData);
        // Reload all items to ensure we have complete data
        const items = await inventoryApi.getAllItems();
        set(items);
        return items[items.length - 1]; // Return the last item as the new one
      } catch (error) {
        console.error("Failed to add item:", error);
        throw error;
      }
    },

    // Edit an existing item via API
    editItem: async (id: string, formData: FormData) => {
      try {
        const updatedItem = await inventoryApi.updateItem(id, formData);
        update((items) =>
          items.map((item) => (item.id === id ? updatedItem : item))
        );
        const items = await inventoryApi.getAllItems();
        set(items);
        return updatedItem;
      } catch (error) {
        console.error("Failed to update item:", error);
        throw error;
      }
    },

    // Delete an item via API
    deleteItem: async (id: string) => {
      try {
        await inventoryApi.deleteItem(id);
        update((items) => items.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Failed to delete item:", error);
        throw error;
      }
    },
  };
};

export const inventoryStore = createInventoryStore();

// Auto-load items when the app starts
inventoryStore.loadItems();
