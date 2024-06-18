<!-- Header.vue -->
<template>
    <header class="site-header">
        <div class="logo">
            <router-link to="/">
                <img src="../assets/vue.svg" alt="Logo">
            </router-link>
        </div>
        <nav class="navigation">
            <router-link to="/sponsor-form">
                <p>Formulario de Auspiciadores</p>
            </router-link>
            <router-link to="/sponsor-table">
                <p>Tabla de Auspiciadores</p>
            </router-link>
            <router-link to="/process-sponsor">
                <p>Tadddddddd</p>
            </router-link>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    // Aquí podrías agregar lógica adicional según tus necesidades
}
</script>

<style scoped>
.site-header {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 50px;
    height: auto;
    margin-right: 10px;
}

.navigation {
    display: flex;
}

.navigation p {
    margin-right: 20px;
    color: white;
    text-decoration: none;
    font-weight: bold;
}

.navigation p:hover {
    text-decoration: underline;
}
</style>
