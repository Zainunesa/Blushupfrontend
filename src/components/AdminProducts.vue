<template>
  <div class="admin-products-container">
    <header class="header">
      <h2>Manage Products</h2>
      <button @click="openAddProductModal" class="btn btn-primary">Add New Product</button>
    </header>

    <main class="main-content">
      <!-- Product Table -->
      <section class="product-table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>R{{ product.price.toFixed(2) }}</td>
              <td>
                <button @click="openEditProductModal(product)" class="btn btn-warning">Edit</button>
                <button @click="confirmDelete(product)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Add/Edit Product Modal -->
      <div v-if="isModalOpen" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Edit Product' : 'Add New Product' }}</h5>
              <button type="button" class="close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm">
                <label for="name">Product Name:</label>
                <input type="text" id="name" v-model="productForm.name" required />

                <label for="description">Description:</label>
                <textarea id="description" v-model="productForm.description" required></textarea>

                <label for="price">Price:</label>
                <input type="number" id="price" v-model="productForm.price" required />

                <div class="modal-actions">
                  <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }} Product</button>
                  <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="isDeleteConfirmOpen" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirm Deletion</h5>
              <button type="button" class="close" @click="closeDeleteConfirm">&times;</button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this product: {{ productToDelete?.name }}?</p>
              <div class="modal-actions">
                <button @click="deleteProduct" class="btn btn-danger">Yes, Delete</button>
                <button @click="closeDeleteConfirm" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminProducts',
  data() {
    return {
      products: [
        { id: 1, name: "Blush Powder", description: "A beautiful blush powder", price: 128.99 },
        { id: 2, name: "Lipstick", description: "Long-lasting lipstick", price: 155.99 },
        { id: 3, name: "Foundation", description: "Perfect foundation for all skin types", price: 234.99 },
      ],
      productForm: {
        id: null,
        name: '',
        description: '',
        price: null,
      },
      isModalOpen: false,
      isDeleteConfirmOpen: false,
      productToDelete: null,
      isEditing: false,
    };
  },
  methods: {
    openAddProductModal() {
      this.productForm = { id: null, name: '', description: '', price: null }; // Clear form for new product
      this.isEditing = false;
      this.isModalOpen = true;
    },
    openEditProductModal(product) {
      this.productForm = { ...product }; // Populate form with selected product details
      this.isEditing = true;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitForm() {
      if (this.isEditing) {
        // Edit existing product
        const index = this.products.findIndex(p => p.id === this.productForm.id);
        if (index !== -1) {
          this.products[index] = { ...this.productForm }; // Update product
        }
      } else {
        // Add new product
        const newProduct = {
          ...this.productForm,
          id: Date.now(), // Unique ID for new product
        };
        this.products.push(newProduct);
      }
      this.closeModal();
    },
    confirmDelete(product) {
      this.productToDelete = product;
      this.isDeleteConfirmOpen = true;
    },
    closeDeleteConfirm() {
      this.isDeleteConfirmOpen = false;
      this.productToDelete = null; // Clear the product to delete
    },
    deleteProduct() {
      if (this.productToDelete) {
        this.products = this.products.filter(product => product.id !== this.productToDelete.id);
      }
      this.closeDeleteConfirm();
    },
  },
};
</script>

<style scoped>
.admin-products-container {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  font-size: 2rem;
}

.product-table {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.table th,
.table td {
  text-align: left;
  padding: 10px;
}

.table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.table td button {
  margin-right: 10px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 100%;
}

.modal h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.modal input,
.modal textarea {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px;
  font-size: 1rem;
}

.modal-actions .btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.modal-actions .btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.modal-actions .btn-primary:hover {
  background-color: #0056b3;
}

.modal-actions .btn-secondary:hover {
  background-color: #5a6268;
}
</style>
