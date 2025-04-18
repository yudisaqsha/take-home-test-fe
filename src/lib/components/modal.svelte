<script lang="ts">
  // Define types
  interface InventoryItem {
    id: number;
    name: string;
    category: string;
    stock: number;
    buyPrice: number;
    sellPrice: number;
    dateAdded: string;
  }

  interface FormData {
    name: string;
    category: string;
    stock: number;
    buyPrice: number;
    sellPrice: number;
  }

  // Component state
  let items: InventoryItem[] = [
    {
      id: 1,
      name: "Example Data A",
      category: "Inventory",
      stock: 150,
      buyPrice: 10.0,
      sellPrice: 15.0,
      dateAdded: "2025-04-18",
    },
    {
      id: 2,
      name: "Example Data B",
      category: "Archive",
      stock: 85,
      buyPrice: 8.0,
      sellPrice: 12.5,
      dateAdded: "2025-04-17",
    },
  ];

  // Modal visibility state
  let isAddModalOpen: boolean = false;
  let isEditModalOpen: boolean = false;
  let isDeleteModalOpen: boolean = false;
  let currentItem: InventoryItem | null = null;

  // Form data state
  let formData: FormData = {
    name: "",
    category: "Inventory",
    stock: 0,
    buyPrice: 0,
    sellPrice: 0,
  };

  // Initial form state for resetting
  const initialFormState: FormData = {
    name: "",
    category: "Inventory",
    stock: 0,
    buyPrice: 0,
    sellPrice: 0,
  };

  // Functions to open modals
  function openAddModal(): void {
    formData = { ...initialFormState };
    isAddModalOpen = true;
  }

  function openEditModal(item: InventoryItem): void {
    currentItem = item;
    formData = {
      name: item.name,
      category: item.category,
      stock: item.stock,
      buyPrice: item.buyPrice,
      sellPrice: item.sellPrice,
    };
    isEditModalOpen = true;
  }

  function openDeleteModal(item: InventoryItem): void {
    currentItem = item;
    isDeleteModalOpen = true;
  }

  // Form submission handlers
  function handleAddSubmit() {
    const newItem: InventoryItem = {
      id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
      ...formData,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    items = [...items, newItem];
    isAddModalOpen = false;
  }

  function handleEditSubmit() {
    if (!currentItem) return;

    const itemId = currentItem.id;
    items = items.map((item) =>
      item.id === itemId ? { ...item, ...formData } : item
    );
    isEditModalOpen = false;
  }

  function handleDelete() {
    if (!currentItem) return;

    const itemId = currentItem.id;
    items = items.filter((item) => item.id !== itemId);
    isDeleteModalOpen = false;
  }

  // Close modals
  function closeAddModal() {
    isAddModalOpen = false;
  }

  function closeEditModal() {
    isEditModalOpen = false;
  }

  function closeDeleteModal() {
    isDeleteModalOpen = false;
  }
</script>
