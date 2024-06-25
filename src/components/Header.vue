<template>
    <header class="site-header">
        <div class="logo">
            <router-link to="/">
                <img src="https://i.ibb.co/JsRdfWb/logotipo-removebg-preview.png" alt="Logo">
            </router-link>
        </div>
        <nav class="navigation">
            <router-link to="/sponsor-form" class="nav-link">
                Formulario de Auspiciadores
            </router-link>
            <template v-if="isAdmin">
                <router-link to="/sponsor-table" class="nav-link">
                    Tabla de Auspiciadores
                </router-link>
                <router-link to="/process-sponsor" class="nav-link">
                    Auspiciadores Pendientes
                </router-link>
                <button class="logout-btn" @click="clearLocalStorage">
                    <i class="material-icons">cancel</i>
                </button>
            </template>
            <template v-else>
                <router-link to="/login" class="nav-link">
                    <i class="material-icons">person</i>
                </router-link>
            </template>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isAdmin: false
        }
    },
    created() {
        this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    },
    methods: {
        clearLocalStorage() {
            localStorage.clear();
            this.isAdmin = false;
        }
    }
}
</script>

<style scoped>
.site-header {
    background: rgb(0,206,255);
    background: linear-gradient(60deg, rgba(0,206,255,1) 0%, rgba(103,0,171,0.9948354341736695) 64%, rgba(248,0,255,1) 100%);
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 150px;
    height: auto;
    margin-right: 10px;
}

.navigation {
    display: flex;
}

.nav-link {
    margin-right: 20px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
}

.nav-link:hover {
    text-decoration: underline;
}

.logout-btn {
    border: none;
    background: none;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding: 0;
}

.logout-btn:hover {
    text-decoration: underline;
}
</style>
