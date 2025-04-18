// src/services/api.service.ts
import axios from "axios";
import type { InventoryItem, FormData, Category } from "../types/inventory";

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const inventoryApi = {
  // Get all inventory items
  getAllItems: async (): Promise<InventoryItem[]> => {
    try {
      const response = await apiClient.get<any>("/inventory");
      return response.data.inventory;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      throw error;
    }
  },
  getCategory: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<any>(
        `/inventory/category`
      );
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  },
  // Add a new inventory item
  addItem: async (item: FormData): Promise<InventoryItem> => {
    try {
      const response = await apiClient.post<any>("/inventory/add", item);
      return response.data.item;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  },
  updateItem: async (id: string, item: FormData): Promise<InventoryItem> => {
    try {
      const response = await apiClient.put<any>(`/inventory/${id}`, item);
      return response.data.item;
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  },

  deleteItem: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/inventory/${id}`);
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  },
};
