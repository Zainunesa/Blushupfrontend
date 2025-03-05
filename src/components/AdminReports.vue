<template>
  <div class="report-container">
    <!-- Header -->
    <header class="report-header">
      <h2>Admin Reports</h2>
      <button @click="exportReport" class="btn btn-primary export-btn">Export Report</button>
    </header>

    <!-- Main Content -->
    <main class="report-content">
      <!-- Sales Performance Chart -->
      <section class="report-card">
        <h3>Sales Performance</h3>
        <div class="chart-container">
          <line-chart :data="salesData" :options="chartOptions"></line-chart>
          
        </div>
      </section>

      <!-- Product Popularity Table -->
      <section class="report-card">
        <h3>Product Popularity</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Total Sold</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in popularProducts" :key="product.id">
              <td>{{ index + 1 }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.totalSold }}</td>
              <td>R{{ product.revenue.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Customer Demographics -->
      <section class="report-card">
        <h3>Customer Demographics</h3>
        <ul class="demographics-list">
          <li><strong>Total Customers:</strong> {{ totalCustomers }}</li>
          <li><strong>Average Age:</strong> {{ averageAge }} years</li>
          <li><strong>Gender Ratio (F:M):</strong> {{ genderRatio }}</li>
        </ul>
      </section>

      <!-- Inventory Status -->
      <section class="report-card">
        <h3>Inventory Status</h3>
        <div class="inventory-status">
          <p><strong>Low Stock Products:</strong> {{ lowStockProducts.length }}</p>
          <ul>
            <li v-for="product in lowStockProducts" :key="product.id">
              {{ product.name }} - {{ product.stock }} units remaining
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.vue"; // Replace with your chart library

export default {
  name: "AdminReports",
  components: {
    LineChart,
  },
  data() {
    return {
      salesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Monthly Sales ($)",
            data: [5000, 7000, 8000, 6000, 9000, 10000],
            borderColor: "#ff69b4", // Blush pink
            backgroundColor: "#ff69b4",
            fill: false,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      popularProducts: [
        { id: 1, name: "Blush Powder", totalSold: 150, revenue: 3000 },
        { id: 2, name: "Lipstick", totalSold: 120, revenue: 2400 },
        { id: 3, name: "Foundation", totalSold: 100, revenue: 2000 },
      ],
      totalCustomers: 500,
      averageAge: 32,
      genderRatio: "60:40",
      lowStockProducts: [
        { id: 1, name: "Mascara", stock: 10 },
        { id: 2, name: "Eyeliner", stock: 5 },
      ],
    };
  },
  methods: {
    exportReport() {
      alert("Report exported successfully!");
      // Add logic to export the report as PDF or CSV
    },
  },
};
</script>

<style scoped>
/* General Styles */
.report-container {
  padding: 20px;
  background-color: #f8f9fa; /* Light gray */
  min-height: 100vh;
}

/* Header Styles */
.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.report-header h2 {
  font-size: 2rem;
  color: #333;
}
.export-btn {
  background-color: #ff69b4; /* Blush pink */
  border-color: #ff69b4;
  color: white;
  font-weight: bold;
}
.export-btn:hover {
  background-color: #ff1493; /* Darker blush pink */
  border-color: #ff1493;
}

/* Report Card Styles */
.report-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.report-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

/* Chart Container */
.chart-container {
  height: 300px;
}

/* Table Styles */
.table {
  width: 100%;
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

/* Demographics List */
.demographics-list {
  list-style: none;
  padding: 0;
}
.demographics-list li {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
}

/* Inventory Status */
.inventory-status ul {
  list-style: disc;
  padding-left: 20px;
}
.inventory-status li {
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: #666;
}

/* Responsive Design */
@media (max-width: 768px) {
  .report-card {
    padding: 15px;
  }
  .chart-container {
    height: 250px;
  }
}
</style>