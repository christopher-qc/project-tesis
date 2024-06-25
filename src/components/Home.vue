<template>
  <div class="sponsor-container">
    <h1 class="title">NUESTROS AUSPICIADORES</h1>
    <Carousel :items="carouselItems" @update-index="handleUpdateIndex" />

    <div class="sponsor-card" v-if="sponsor">
      <div class="sponsor-header">
        <h2>{{ sponsor.company_name }}</h2>
        <div class="social-icons">
          <div @click="redirect(sponsor.facebook_url)">
            <img src="./facebook.png" alt="Facebook">
          </div>
          <div @click="redirect(sponsor.instagram_url)">
            <img src="./instagram.png" alt="Instagram">
          </div>
        </div>
      </div>
      <div class="sponsor-details">
        <p><strong>Nombre del Encargado:</strong> {{ sponsor.manager_name }}</p>
        <p><strong>Teléfono:</strong> {{ sponsor.phone }}</p>
        <p><strong>Nro. Ruc:</strong> {{ sponsor.ruc }}</p>
        <p><strong>Distrito:</strong> {{ sponsor.district }}</p>
        <p><strong>Provincia:</strong> {{ sponsor.province }}</p>
        <p><strong>Descripción:</strong> {{ sponsor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel.vue';
import axios from 'axios';

export default {
  components: {
    Carousel
  },
  data() {
    return {
      carouselItems: [],
      sponsor: null
    };
  },
  created() {
    this.fetchSponsors();
  },
  methods: {
    fetchSponsors() {
      axios.get('http://localhost:3000/sponsors')
        .then(response => {
          const filteredSponsors = response.data.filter(sponsor => sponsor.status === 'Aprobado');
          this.carouselItems = filteredSponsors;
          this.sponsor = this.carouselItems[0]; // Assign the first sponsor initially
        })
        .catch(error => {
          console.error('Error fetching sponsors:', error);
        });
    },
    handleUpdateIndex(index) {
      this.sponsor = this.carouselItems[index];
    },
    redirect(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.sponsor-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.sponsor-card {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sponsor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.sponsor-header h2 {
  color: #333;
  font-size: 24px;
  margin: 0;
}

.social-icons {
  display: flex;
  gap: 10px;
}

.social-icons img {
  width: 30px;
  cursor: pointer;
}

.sponsor-details {
  font-size: 16px;
}

.sponsor-details p {
  margin: 5px 0;
}
</style>
