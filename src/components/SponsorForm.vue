<template>
  <div class="container">
    <form @submit.prevent="handleSubmit" class="sponsor-form">
      <div class="form-group">
        <label for="company_name">Nombre de la compañia:</label>
        <input v-model="form.company_name" id="company_name" type="text" required />
      </div>
      <div class="form-group">
        <label for="manager_name">Nombre del Encargado:</label>
        <input v-model="form.manager_name" id="manager_name" type="text" required />
      </div>
      <div class="form-group">
        <label for="phone">Telefono:</label>
        <input v-model="form.phone" id="phone" type="text" />
      </div>
      <div class="form-group">
        <label for="district">Distrito:</label>
        <input v-model="form.district" id="district" type="text" />
      </div>
      <div class="form-group">
        <label for="province">Provincia:</label>
        <input v-model="form.province" id="province" type="text" />
      </div>
      <div class="form-group">
        <label for="company_type">Tipo de compañia:</label>
        <input v-model="form.company_type" id="company_type" type="text" />
      </div>
      <div class="form-group">
        <label for="logo_url">Logo URL:</label>
        <input v-model="form.logo_url" id="logo_url" type="text" />
      </div>
      <div class="form-group">
        <label for="ruc">Nro. Ruc:</label>
        <input v-model="form.ruc" id="ruc" type="text" />
      </div>
      <div class="form-group">
        <label for="description">Descripcion:</label>
        <textarea v-model="form.description" id="description"></textarea>
      </div>
      <button type="submit">Enviar datos</button>
    </form>

    <div v-if="notificationMessage" :class="['notification', notificationType]">
      {{ notificationMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SponsorForm',
  data() {
    return {
      form: {
        company_name: '',
        manager_name: '',
        phone: '',
        district: '',
        province: '',
        company_type: '',
        logo_url: '',
        instagram_url:'',
        facebook_url:'',
        ruc:'',
        description: ''
      },
      notificationMessage: '',
      notificationType: ''
    };
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:3000/sponsors', this.form)
        .then(response => {
          console.log('Data submitted successfully', response.data);
          this.$emit('sponsor-added', response.data);
          this.resetForm();
          this.showNotification('Datos enviados con éxito', 'success');
        })
        .catch(error => {
          console.error('There was an error!', error);
          this.showNotification('Hubo un error al enviar los datos', 'error');
        });
    },
    resetForm() {
      this.form = {
        company_name: '',
        manager_name: '',
        phone: '',
        district: '',
        province: '',
        company_type: '',
        ruc:'',
        instagram_url:'',
        facebook_url:'',
        logo_url: '',
        description: ''
      };
    },
    showNotification(message, type) {
      this.notificationMessage = message;
      this.notificationType = type;
      setTimeout(() => {
        this.notificationMessage = '';
        this.notificationType = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 129vh;
  background-image: url('https://i.ibb.co/JQKGzdd/79ccb6bf-5980-4050-83a7-28cd3b015b96.jpg');
  background-size: cover; /* Ajusta la imagen para cubrir todo el contenedor */
  background-position: center;
}

.sponsor-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  color: #333;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 2px;
  height: 35px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  min-height: 100px;
}

button {
  padding: 12px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 15px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  transition: opacity 0.3s ease;
}

.notification.success {
  background-color: #4CAF50;
}

.notification.error {
  background-color: #F44336;
}
</style>
