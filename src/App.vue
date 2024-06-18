<template>
  <div id="app">

    <Header />

    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Home from './components/Home.vue';

export default {
  computed: {
    isHome() {
      return this.$route.name === 'Home';
    }
  },
  components: {
    Header,
    Home,
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
</style>
