<script lang="ts">
  import "../app.css";
  import type { InventoryItem } from "../../src/lib/types/inventory";
  import InventoryTable from "../../src/lib/components/inventory-table.svelte";
  import AddModal from "../../src/lib/components/add-modal.svelte";
  import EditModal from "../../src/lib/components/edit-modal.svelte";
  import DeleteModal from "../../src/lib/components/delete-modal.svelte";

  // Modal visibility state
  let isAddModalOpen: boolean = false;
  let isEditModalOpen: boolean = false;
  let isDeleteModalOpen: boolean = false;

  // Current item being edited or deleted
  let currentItem: InventoryItem | null = null;

  // Modal handlers
  function openAddModal(): void {
    isAddModalOpen = true;
  }

  function closeAddModal(): void {
    isAddModalOpen = false;
  }

  function handleEdit(item: InventoryItem): void {
    currentItem = item;
    isEditModalOpen = true;
  }

  function closeEditModal(): void {
    isEditModalOpen = false;
    currentItem = null;
  }

  function handleDelete(item: InventoryItem): void {
    currentItem = item;
    isDeleteModalOpen = true;
  }

  function closeDeleteModal(): void {
    isDeleteModalOpen = false;
    currentItem = null;
  }
</script>

<div class="container w-auto h-auto bg-white mx-auto mt-12 py-5">
  <div class="flex flex-row justify-between items-center mx-5">
    <div>
      <h1 class="text-xl font-medium">Data Inventory</h1>
    </div>
    <div>
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        on:click={openAddModal}
      >
        Add Data
      </button>
    </div>
  </div>

  <InventoryTable onEdit={handleEdit} onDelete={handleDelete} />

  <!-- Modals -->
  <AddModal isOpen={isAddModalOpen} onClose={closeAddModal} />

  <EditModal
    isOpen={isEditModalOpen}
    onClose={closeEditModal}
    item={currentItem}
  />

  <DeleteModal
    isOpen={isDeleteModalOpen}
    onClose={closeDeleteModal}
    item={currentItem}
  />
</div>
