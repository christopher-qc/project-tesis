<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="company_name">Company Name:</label>
      <input v-model="form.company_name" id="company_name" type="text" required />
    </div>
    <div>
      <label for="manager_name">Manager Name:</label>
      <input v-model="form.manager_name" id="manager_name" type="text" required />
    </div>
    <div>
      <label for="phone">Phone:</label>
      <input v-model="form.phone" id="phone" type="text" />
    </div>
    <div>
      <label for="district">District:</label>
      <input v-model="form.district" id="district" type="text" />
    </div>
    <div>
      <label for="province">Province:</label>
      <input v-model="form.province" id="province" type="text" />
    </div>
    <div>
      <label for="company_type">Company Type:</label>
      <input v-model="form.company_type" id="company_type" type="text" />
    </div>
    <div>
      <label for="logo_url">Logo URL:</label>
      <input v-model="form.logo_url" id="logo_url" type="text" />
    </div>
    <div>
      <label for="description">Description:</label>
      <textarea v-model="form.description" id="description"></textarea>
    </div>
    <button type="submit">Submit</button>
  </form>
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
        description: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:3000/sponsors', this.form)
        .then(response => {
          console.log('Data submitted successfully', response.data);
          this.$emit('sponsor-added', response.data);
          this.resetForm();
        })
        .catch(error => {
          console.error('There was an error!', error);
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
        logo_url: '',
        description: ''
      };
    },
  }
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

div {
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
