// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'vue-toastification/dist/index.css';





// // import { library } from '@fortawesome/fontawesome-svg-core'
// // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// createApp(App).use(store).use(router).mount('#app')


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'vue-toastification/dist/index.css'; // Toastification CSS
import Toast, { POSITION } from 'vue-toastification'; // Import Toast library

createApp(App)
  .use(store)
  .use(router)
  .use(Toast, {
    position: POSITION.TOP_RIGHT,  // You can customize the position
    timeout: 5000, // Set how long the toast should be visible
  })
  .mount('#app');
