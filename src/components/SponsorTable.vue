<template>
    <div>
        <h2>Lista de Auspiciadores</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre de la Empresa</th>
                    <th>Nombre del Encargado</th>
                    <th>Teléfono</th>
                    <th>Distrito</th>
                    <th>Provincia</th>
                    <th>Tipo de Empresa</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sponsor in sponsors" :key="sponsor.id">
                    <td>{{ sponsor.company_name }}</td>
                    <td>{{ sponsor.manager_name }}</td>
                    <td>{{ sponsor.phone }}</td>
                    <td>{{ sponsor.district }}</td>
                    <td>{{ sponsor.province }}</td>
                    <td>{{ sponsor.company_type }}</td>
                    <td>{{ sponsor.description }}</td>
                    <td>
                        <button @click="editSponsor(sponsor)">Editar</button>
                        <button @click="deleteSponsor(sponsor.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AuspiciadoresTable',
    data() {
        return {
            sponsors: []
        };
    },
    mounted() {
        this.fetchSponsors();
    },
    methods: {
        fetchSponsors() {
            axios.get('http://localhost:3000/sponsors')
                .then(response => {
                    const dd = response.data.filter(sponsor => sponsor.status === 'Aprobado');
                    this.sponsors = dd;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de auspiciadores:', error);
                });
        },
        editSponsor(sponsor) {
            // Aquí puedes implementar la lógica para editar un auspiciador
            console.log('Editar auspiciador:', sponsor);
        },
        deleteSponsor(id) {
            axios.delete(`http://localhost:3000/sponsors/${id}`)
                .then(response => {
                    console.log('Auspiciador eliminado exitosamente:', response.data);
                    this.fetchSponsors(); // Actualizar la lista después de eliminar
                })
                .catch(error => {
                    console.error('Error al eliminar el auspiciador:', error);
                });
        }
    }
};
</script>

<style scoped>
/* Estilos opcionales para la tabla */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>
