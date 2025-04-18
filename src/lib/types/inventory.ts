export interface InventoryItem {
  id: string;
  name: string;
  categoryId: string;
  category?: Category; // optional, if you include joined category data
  stock: number;
  buy_price: number;
  sell_price: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface FormData {
  name: string;
  categoryId: string;
  stock: number;
  buy_price: number;
  sell_price: number;
}

export const initialFormState: FormData = {
  name: "",
  categoryId: "", // to be set by the form
  stock: 0,
  buy_price: 0,
  sell_price: 0,
};
