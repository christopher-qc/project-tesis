<template>
    <div>
        <h2>Auspiciadores Pendientes</h2>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th>Nombre de la Empresa</th>
                        <th>Nombre del Encargado</th>
                        <th>Teléfono</th>
                        <th>Distrito</th>
                        <th>Provincia</th>
                        <th>Tipo de Empresa</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pendingSponsors.length === 0">
                        <td colspan="7" class="text-center">NO HAY AUSPICIADORES PENDIENTES</td>
                    </tr>
                    <tr v-else v-for="sponsor in pendingSponsors" :key="sponsor.id">
                        <td>{{ sponsor.company_name }}</td>
                        <td>{{ sponsor.manager_name }}</td>
                        <td>{{ sponsor.phone }}</td>
                        <td>{{ sponsor.district }}</td>
                        <td>{{ sponsor.province }}</td>
                        <td>{{ sponsor.company_type }}</td>
                        <td>
                            <button @click="approveSponsor(sponsor.id)" class="btn btn-success btn-sm">
                                <i class="material-icons">check</i> Aprobar
                            </button>
                            <button @click="denySponsor(sponsor.id)" class="btn btn-danger btn-sm ml-2">
                                <i class="material-icons">close</i> Denegar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
                    const pending = response.data.filter(sponsor => sponsor.status === 'Pendiente');
                    this.pendingSponsors = pending;
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

<style scoped>
.table-responsive {
    overflow-x: auto;
    padding: 25px;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
    background-color: transparent;
}

.table th,
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border: 1px solid #dee2e6;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

.table tbody + tbody {
    border-top: 2px solid #dee2e6;
}

.table-bordered {
    border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
}

.table-bordered thead th,
.table-bordered thead td {
    border-bottom-width: 2px;
}

.table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.075);
}

.btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}

.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
}

.btn:hover {
    color: #212529;
    text-decoration: none;
}

.ml-2 {
    margin-left: 0.5rem;
}

.text-center {
    text-align: center;
}
</style>
