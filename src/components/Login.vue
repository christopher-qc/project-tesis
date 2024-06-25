<template>
    <div class="login-container">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title text-center mb-4">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
            <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      login() {
        this.errorMessage = '';
  
        if (!this.username || !this.password) {
          this.errorMessage = 'Por favor ingresa un nombre de usuario y contraseña.';
          return;
        }
        
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: this.username, password: this.password }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            const isAdmin = data.isAdmin !== undefined ? data.isAdmin : true;
  
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userData', JSON.stringify(data));
            localStorage.setItem('isAdmin', isAdmin.toString());
  
            this.errorMessage = '';
  
            this.$router.push('/');
          })
          .catch(error => {
            console.error('Error:', error);
            this.errorMessage = 'Credenciales incorrectas. Por favor intenta de nuevo.';
          });
      }
    }
  };
  </script>
  
  <style scoped>
 .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 0 1rem;
}

.card {
  width: 100%;
  max-width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-body {
  padding: 2rem;
}

.card-title {
    text-align: center;
  font-size: 2  .5rem;
  font-weight: 700;
  color: #333;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
}

.form-control {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

.btn {
  display: inline-block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.text-danger {
  font-size: 0.875rem;
  color: #e3342f;
}

.mb-3 {
    margin-bottom: 25px;
}
  </style>
  