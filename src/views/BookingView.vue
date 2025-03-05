<template>
  <div>
    <VideoPopup />
    <!-- Banner -->
    <div>
      <div class="banner">
        <img src="@/assets/banner.png" alt="Stylist Banner" class="banner-image">
        <button @click="goToPage" class="banner-button">Tutorial Collabs</button>
      </div>
      <br>
      <!-- Booking Form (Only shown if logged in) -->
      <div v-if="isLoggedIn">
        <h1>Book Your Makeup Session</h1>
        <form id="bookingForm" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Full Name:</label>
            <input type="text" id="name" name="name" required v-model="form.name" class="modern-input">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required v-model="form.email" class="modern-input">
          </div>
          <div class="form-group">
            <label for="date">Select Date:</label>
            <Datepicker v-model="selectedDate" class="date-picker modern-input" required />
          </div>
          <div class="form-group">
            <label for="time">Select Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              required
              v-model="form.time"
              class="modern-input"
            />
          </div>
          <div class="form-group">
            <label for="stylist">Choose Stylist:</label>
            <select id="stylist" name="stylist" required v-model="form.stylist" class="modern-input">
              <option value="stylist1">Stylist 1</option>
              <option value="stylist2">Stylist 2</option>
            </select>
          </div>
          <br>
          <div class="form-group">
            <label for="comments">What would you like us to know about your booking?</label>
            <textarea id="comments" name="comments" rows="4" placeholder="Please provide any special requests or information." v-model="form.comments" class="modern-input"></textarea>
          </div>
          <button type="submit" class="modern-button">Book Now!</button>
          <br><br>
        </form>
      </div>
      <!-- Login/Signup Modal (Shown if not logged in) -->
      <div v-if="!isLoggedIn" class="modal-overlay">
        <div class="modal-content">
          <h2>Please Login or Sign Up</h2>
          <p>To book a makeup session, please log in or create an account.</p>
          <button @click="redirectToLogin" class="modern-button">Login / Sign Up</button>
        </div>
      </div>
      <!-- Confirmation Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>Booking Confirmed!</h2>
          <p>Your booking has been successfully submitted.</p>
          <button @click="closeModal" class="modern-button">Exit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';
import VideoPopup from "@/components/VideoPopup.vue";

export default {
  components: {
    Datepicker,
    VideoPopup,
  },
  data() {
    return {
      selectedDate: null,
      showModal: false,
      isLoggedIn: false, // Track login status
      form: {
        name: '',
        email: '',
        time: '',
        stylist: '',
        comments: ''
      }
    };
  },
  created() {
    // Check if the user is logged in (e.g., from localStorage or Vuex)
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      // Example: Check if the user is logged in (replace with your logic)
      const user = localStorage.getItem('user');
      this.isLoggedIn = !!user;
    },
    redirectToLogin() {
      this.$router.push('/login'); // Redirect to the login page
    },
    goToPage() {
      this.$router.push('/customroutezainu');
    },
    async handleSubmit() {
      // Check if all fields are filled
      if (!this.form.name || !this.form.email || !this.form.time || !this.form.stylist || !this.selectedDate) {
        alert("Please fill in all the fields.");
        return;
      }

      // Format the date to YYYY-MM-DD (or any format your backend expects)
      const formattedDate = this.selectedDate.toISOString().split('T')[0]; // Extracts YYYY-MM-DD

      // Prepare the data to be sent
      const bookingData = {
        fullName: this.form.name,
        email: this.form.email,
        bookingDate: formattedDate, // Use the formatted date
        bookingTime: this.form.time, // Time is already in HH:MM format
        stylist: this.form.stylist,
        specialRequest: this.form.comments
      };

      console.log('Sending booking data:', bookingData); // Debugging

      try {
        // Make a POST request to the backend API with the booking data
        const response = await fetch('http://localhost:3001/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });

        console.log('Response status:', response.status); // Debugging

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData); // Debugging
          throw new Error(errorData.message || 'Failed to create booking');
        }

        const data = await response.json();
        console.log('Booking created:', data); // Debugging

        // If successful, show the modal and reset the form
        this.showModal = true;
        this.form = {
          name: '',
          email: '',
          time: '',
          stylist: '',
          comments: ''
        };
        this.selectedDate = null;
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("An error occurred. Please try again.");
      }
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style scoped>
/* General Styling */
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(to right, #ffffff, #ffffff);
  margin: 0;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 700;
  font-family: 'Sue Ellen Francisco';
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
}
.banner {
  width: 100%;
  height: 530px;
  position: relative;
  overflow: hidden;
}
.banner-image {
  width: 100%;
  object-fit: cover;
}
.banner-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  width: 200px;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
}
.banner-button:hover {
  background-color: #f0f0f0;
  transform: translateX(-50%) scale(1.05);
}
/* Form Styles */
form {
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  font-weight: bold;
  display: inline-block;
  margin-bottom: 5px;
  font-size: 14px;
}
.modern-input {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}
.modern-input:focus {
  border-color: #ff5c75;
  box-shadow: 0 0 8px rgba(255, 92, 117, 0.3);
  background-color: #fff;
  outline: none;
}
.modern-button {
  width: 100%;
  padding: 12px;
  background: #000000;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s ease;
}
.modern-button:hover {
  background: #ff5c75;
  transform: translateY(-2px);
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 300px;
}
.modal-content h2 {
  margin-bottom: 1rem;
}
.modal-content p {
  margin-bottom: 1.5rem;
}
/* Confirmation Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}
.modal-content h2 {
  margin-bottom: 15px;
}
.modal-content button {
  background-color: #ff5c75;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease, transform 0.2s ease;
}
.modal-content button:hover {
  background-color: #ff3f5f;
  transform: translateY(-2px);
}
/* Media Queries for Responsiveness */
@media (max-width: 1200px) {
  form {
    max-width: 80%;
  }
}
@media (max-width: 768px) {
  .banner-button {
    width: 150px;
    font-size: 14px;
  }
  form {
    max-width: 90%;
    margin-left: 10px;
    margin-right: 10px;
  }
  .modern-input {
    padding: 10px;
    font-size: 12px;
  }
}
@media (max-width: 480px) {
  .banner {
    height: 300px;
  }
  .banner-button {
    width: 120px;
    font-size: 12px;
  }
  h1 {
    font-size: 20px;
  }
  .form-group {
    margin-bottom: 12px;
  }
  .modal-content {
    width: 80%;
  }
  .modern-button {
    padding: 10px;
  }
}
</style>

