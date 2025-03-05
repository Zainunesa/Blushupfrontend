<template>
  <div class="admin-orders-container">
    <header class="header">
      <h2>Manage Orders</h2>
    </header>

    <main class="main-content">
      <!-- Orders Table -->
      <section class="orders-table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Total Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.status }}</td>
              <td>R{{ order.totalAmount.toFixed(2) }}</td>
              <td>
                <button @click="viewOrderDetails(order)" class="btn btn-info">View Details</button>
                <button @click="confirmDelete(order)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Order Details Modal -->
      <div v-if="isOrderDetailsModalOpen" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Order Details - Order #{{ selectedOrder.id }}</h5>
              <button type="button" class="close" @click="closeOrderDetailsModal">&times;</button>
            </div>
            <div class="modal-body">
              <p><strong>Customer Name:</strong> {{ selectedOrder.customerName }}</p>
              <p><strong>Status:</strong> {{ selectedOrder.status }}</p>
              <p><strong>Total Amount:</strong> R{{ selectedOrder.totalAmount.toFixed(2) }}</p>
              <p><strong>Order Date:</strong> {{ selectedOrder.orderDate }}</p>

              <h5>Items:</h5>
              <ul>
                <li v-for="item in selectedOrder.items" :key="item.productId">
                  {{ item.productName }} (x{{ item.quantity }}) - R{{ item.price.toFixed(2) }}
                </li>
              </ul>
              <div class="modal-actions">
                <button @click="closeOrderDetailsModal" class="btn btn-secondary">Close</button>
              </div>
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
              <p>Are you sure you want to delete this order (Order #{{ orderToDelete?.id }})?</p>
              <div class="modal-actions">
                <button @click="deleteOrder" class="btn btn-danger">Yes, Delete</button>
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
  name: 'AdminOrders',
  data() {
    return {
      orders: [
        {
          id: 1,
          customerName: 'John Doe',
          status: 'Shipped',
          totalAmount: 350.75,
          orderDate: '2025-02-28',
          items: [
            { productId: 1, productName: 'Blush Powder', quantity: 1, price: 128.99 },
            { productId: 2, productName: 'Lipstick', quantity: 1, price: 155.99 },
          ],
        },
        {
          id: 2,
          customerName: 'Jane Smith',
          status: 'Processing',
          totalAmount: 245.50,
          orderDate: '2025-02-25',
          items: [
            { productId: 3, productName: 'Foundation', quantity: 1, price: 234.99 },
          ],
        },
        // More orders...
      ],
      isOrderDetailsModalOpen: false,
      selectedOrder: null,
      isDeleteConfirmOpen: false,
      orderToDelete: null,
    };
  },
  methods: {
    viewOrderDetails(order) {
      this.selectedOrder = order;
      this.isOrderDetailsModalOpen = true;
    },
    closeOrderDetailsModal() {
      this.isOrderDetailsModalOpen = false;
      this.selectedOrder = null;
    },
    confirmDelete(order) {
      this.orderToDelete = order;
      this.isDeleteConfirmOpen = true;
    },
    closeDeleteConfirm() {
      this.isDeleteConfirmOpen = false;
      this.orderToDelete = null;
    },
    deleteOrder() {
      if (this.orderToDelete) {
        this.orders = this.orders.filter(order => order.id !== this.orderToDelete.id);
      }
      this.closeDeleteConfirm();
    },
  },
};
</script>

<style scoped>
.admin-orders-container {
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

.orders-table {
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
  width: 500px;
  max-width: 100%;
}

.modal h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
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

.modal-actions .btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.modal-actions .btn-primary:hover {
  background-color: #0056b3;
}

.modal-actions .btn-secondary:hover {
  background-color: #5a6268;
}

.modal-actions .btn-danger:hover {
  background-color: #c82333;
}
</style>
