<template>
    <div>
        <h2 class="dd">Lista de Auspiciadores Aprobados</h2>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
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
                    <tr v-for="sponsor in sponsors" :key="sponsor.id">
                        <td>{{ sponsor.company_name }}</td>
                        <td>{{ sponsor.manager_name }}</td>
                        <td>{{ sponsor.phone }}</td>
                        <td>{{ sponsor.district }}</td>
                        <td>{{ sponsor.province }}</td>
                        <td>{{ sponsor.company_type }}</td>
                        <td>
                            <button @click="deleteSponsor(sponsor.id)" class="btn btn-sm btn-danger ml-2">
                                <i class="material-icons">delete</i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div>
        <h2 class="dd">Lista de Auspiciadores Denegados</h2>
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
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
                    <tr v-for="sponsor in sponsorsRechazados" :key="sponsor.id">
                        <td>{{ sponsor.company_name }}</td>
                        <td>{{ sponsor.manager_name }}</td>
                        <td>{{ sponsor.phone }}</td>
                        <td>{{ sponsor.district }}</td>
                        <td>{{ sponsor.province }}</td>
                        <td>{{ sponsor.company_type }}</td>
                        <td>
                            <button @click="deleteSponsor(sponsor.id)" class="btn btn-sm btn-danger ml-2">
                                <i class="material-icons">delete</i> Eliminar
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
    name: 'AuspiciadoresTable',
    data() {
        return {
            sponsors: [],
            sponsorsRechazados: []
        };
    },
    mounted() {
        this.fetchSponsors();
    },
    methods: {
        fetchSponsors() {
            axios.get('http://localhost:3000/sponsors')
                .then(response => {
                    const aprobados = response.data.filter(sponsor => sponsor.status === 'Aprobado');
                    const rechazados = response.data.filter(sponsor => sponsor.status === 'Denegado');
                    this.sponsors = aprobados;
                    this.sponsorsRechazados = rechazados;
                })
                .catch(error => {
                    console.error('Error al obtener la lista de auspiciadores:', error);
                });
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
.table-responsive {
    overflow-x: auto;
    padding: 25px;
}

.dd {
    margin-left: 50px;
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
    border-top: 1px solid #dee2e6;
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

.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}

.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
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
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    cursor: pointer;
}

.btn:hover {
    color: #212529;
    text-decoration: none;
}

.ml-2 {
    margin-left: 0.5rem;
}
</style>
