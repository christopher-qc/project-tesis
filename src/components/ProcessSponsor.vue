<template>
    <div>
        <h2>Auspiciadores Pendientes de Aprobación</h2>
        <table>
            <thead>
                <tr>
                    <th>Nombre de la Empresa</th>
                    <th>Nombre del Encargado</th>
                    <th>Teléfono</th>
                    <th>Distrito</th>
                    <th>Provincia</th>
                    <th>Tipo de Empresa</th>
                    <th>Logo URL</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sponsor in pendingSponsors" :key="sponsor.id">
                    <td>{{ sponsor.company_name }}</td>
                    <td>{{ sponsor.manager_name }}</td>
                    <td>{{ sponsor.phone }}</td>
                    <td>{{ sponsor.district }}</td>
                    <td>{{ sponsor.province }}</td>
                    <td>{{ sponsor.company_type }}</td>
                    <td>{{ sponsor.logo_url }}</td>
                    <td>{{ sponsor.description }}</td>
                    <td>
                        <button @click="approveSponsor(sponsor.id)">
                            <i class="material-icons">edit</i>
                        </button>
                        <button class="ml-5" @click="denySponsor(sponsor.id)">
                            <i class="material-icons">close</i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ListarPendientes',
    data() {
        return {
            pendingSponsors: []
        };
    },
    mounted() {
        this.fetchPendingSponsors();
    },
    methods: {
        fetchPendingSponsors() {
            axios.get('http://localhost:3000/sponsors')
                .then(response => {
                    const dd = response.data.filter(sponsor => sponsor.status === 'Pendiente');
                    this.pendingSponsors = dd;
                })
                .catch(error => {
                    console.error('Error fetching pending sponsors:', error);
                });
        },
        approveSponsor(id) {
            this.updateSponsorStatus(id, 'Aprobado');
        },
        denySponsor(id) {
            this.updateSponsorStatus(id, 'Denegado');
        },
        updateSponsorStatus(id, status) {
            axios.put(`http://localhost:3000/sponsors/${id}`, { status })
                .then(response => {
                    console.log('Sponsor status updated:', response.data);
                    // Remove the sponsor from pendingSponsors array
                    this.pendingSponsors = this.pendingSponsors.filter(sponsor => sponsor.id !== id);
                })
                .catch(error => {
                    console.error('Error updating sponsor status:', error);
                });
        }
    }
};
</script>

<style>
table {
    width: 100%;
    border-collapse: collapse;
}

table,
th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 8px 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.ml-5 {
    margin-left: 5px;
}
</style>
