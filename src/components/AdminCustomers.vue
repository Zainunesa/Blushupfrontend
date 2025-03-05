<template>
  <div class="admin-customers-container">
    <header class="header">
      <h2>Manage Customers</h2>
      <button @click="openAddCustomerModal" class="btn btn-primary">Add New Customer</button>
    </header>

    <main class="main-content">
      <!-- Customer Table -->
      <section class="customer-table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td>
                <button @click="openEditCustomerModal(customer)" class="btn btn-warning">Edit</button>
                <button @click="confirmDelete(customer)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Add/Edit Customer Modal -->
      <div v-if="isModalOpen" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEditing ? 'Edit Customer' : 'Add New Customer' }}</h5>
              <button type="button" class="close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitForm">
                <label for="name">Customer Name:</label>
                <input type="text" id="name" v-model="customerForm.name" required />

                <label for="email">Email:</label>
                <input type="email" id="email" v-model="customerForm.email" required />

                <label for="phone">Phone:</label>
                <input type="text" id="phone" v-model="customerForm.phone" required />

                <div class="modal-actions">
                  <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Add' }} Customer</button>
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
              <p>Are you sure you want to delete this customer: {{ customerToDelete?.name }}?</p>
              <div class="modal-actions">
                <button @click="deleteCustomer" class="btn btn-danger">Yes, Delete</button>
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
  name: 'AdminCustomer',
  data() {
    return {
      customers: [
        { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
        { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "234-567-8901" },
        { id: 3, name: "Mark Johnson", email: "mark.johnson@example.com", phone: "345-678-9012" },
      ],
      customerForm: {
        id: null,
        name: '',
        email: '',
        phone: '',
      },
      isModalOpen: false,
      isDeleteConfirmOpen: false,
      customerToDelete: null,
      isEditing: false,
    };
  },
  methods: {
    openAddCustomerModal() {
      this.customerForm = { id: null, name: '', email: '', phone: '' }; // Clear form for new customer
      this.isEditing = false;
      this.isModalOpen = true;
    },
    openEditCustomerModal(customer) {
      this.customerForm = { ...customer }; // Populate form with selected customer details
      this.isEditing = true;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    submitForm() {
      if (this.isEditing) {
        // Edit existing customer
        const index = this.customers.findIndex(c => c.id === this.customerForm.id);
        if (index !== -1) {
          this.customers[index] = { ...this.customerForm }; // Update customer
        }
      } else {
        // Add new customer
        const newCustomer = {
          ...this.customerForm,
          id: Date.now(), // Unique ID for new customer
        };
        this.customers.push(newCustomer);
      }
      this.closeModal();
    },
    confirmDelete(customer) {
      this.customerToDelete = customer;
      this.isDeleteConfirmOpen = true;
    },
    closeDeleteConfirm() {
      this.isDeleteConfirmOpen = false;
      this.customerToDelete = null; // Clear the customer to delete
    },
    deleteCustomer() {
      if (this.customerToDelete) {
        this.customers = this.customers.filter(customer => customer.id !== this.customerToDelete.id);
      }
      this.closeDeleteConfirm();
    },
  },
};
</script>

<style scoped>
.admin-customers-container {
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

.customer-table {
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
