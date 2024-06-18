<template>
  <div>
    <Carousel :items="carouselItems" @update-index="handleUpdateIndex" />
    <div class="sponsor-card" v-if="sponsor">
      <h2>{{ sponsor.company_name }}</h2>
      <p><strong>Manager:</strong> {{ sponsor.manager_name }}</p>
      <p><strong>Phone:</strong> {{ sponsor.phone }}</p>
      <p><strong>District:</strong> {{ sponsor.district }}</p>
      <p><strong>Province:</strong> {{ sponsor.province }}</p>
      <p><strong>Description:</strong> {{ sponsor.description }}</p>
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
          console.log(filteredSponsors);
          this.carouselItems = filteredSponsors;
          this.sponsor = this.carouselItems[0]; // Asignar el primer patrocinador al cargar
        })
        .catch(error => {
          console.error('Error fetching sponsors:', error);
        });
    },
    handleUpdateIndex(index) {
      this.sponsor = this.carouselItems[index];
    }
  },
  mounted() {
    this.fetchSponsors();
  }
};
</script>

<style>
.sponsor-card {
  background-color: #f0f0f0;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
