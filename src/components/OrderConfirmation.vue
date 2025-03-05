<template>
  <div class="order-confirmation">
    <h1>Order Confirmation</h1>
    <p>Thank you for your order, {{ customerName }}!</p>
    <p>Your order has been successfully placed.</p>
    <p>An email confirmation has been sent to {{ email }}.</p>
    <router-link to="/" class="home-link">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customerName: '',
      email: '',
    };
  },
  mounted() {
    // Retrieve order details from the route query or Vuex store
    this.customerName = this.$route.query.customerName || 'Customer';
    this.email = this.$route.query.email || 'example@example.com';
  },
};
</script>

<style scoped>
.order-confirmation {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.home-link:hover {
  background-color: #0056b3;
}
</style>