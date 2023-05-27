<template>
    <div class="supplierList">
        <b-button variant="success" class="mb-3" @click="showTambahSupplier = true">Tambah Supplier</b-button>
        <table class="table table-hover">
            <!-- table headers -->
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Supplier</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">No Telp</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <!-- table data -->
            <tbody>
                <tr v-for="(supplier, index) in suppliers.data" :key="supplier.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ supplier.namaSupplier }}</td>
                    <td>{{ supplier.alamat }}</td>
                    <td>{{ supplier.noTelp }}</td>
                    <td>
                        <button class="btn btn-primary" @click="openUpdateForm(supplier)">Update</button>
                        <button class="btn btn-danger" @click="deleteSupplier(supplier)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="showUpdateForm" class="update-form">
            <h2>Update Supplier</h2>
            <input v-model="updatedSupplier.namaSupplier" class="form-control" placeholder="Nama Supplier">
            <input v-model="updatedSupplier.alamat" class="form-control" placeholder="Alamat">
            <input v-model="updatedSupplier.noTelp" class="form-control" placeholder="No Telp">
            <button class="btn btn-success" @click="updateSupplier">Submit</button>
        </div>

        <TambahSupplier v-if="showTambahSupplier" @close="showTambahSupplier = false" />
    </div>
</template>
  
<script>
import axios from 'axios';
import TambahSupplier from './TambahSupplier.vue';

export default {
    components: {
        TambahSupplier,
    },
    data() {
        return {
            suppliers: {},
            showUpdateForm: false,
            updatedSupplier: {},
            showTambahSupplier: false,
        };
    },
    methods: {
        getSuppliers() {
            const offset = 0;
            const limit = 10;
            const token = localStorage.getItem('token');
            axios
                .get('http://159.223.57.121:8090/supplier/find-all', {
                    params: {
                        offset: offset,
                        limit: limit
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    // console.log(response.data);
                    this.suppliers = response.data;
                    console.log(this.suppliers); 
                })
                .catch(error => {
                    // Handle the error
                    console.error(error);
                });
        },
      deleteSupplier(supplier) {
            axios
                .delete(`http://159.223.57.121:8090/supplier/delete/${supplier.id}`)
                .then(() => {
                    this.getSuppliers();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        openUpdateForm(supplier) {
            this.showUpdateForm = true;
            this.updatedSupplier = { ...supplier };
        },
        updateSupplier() {
            axios
                .put(`http://159.223.57.121:8090/supplier/update/${this.updatedSupplier.id}`, this.updatedSupplier)
                .then(() => {
                    this.showUpdateForm = false;
                    this.getSuppliers();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    created() {
        this.getSuppliers();
    },
};
</script>
  
<style scoped>
.supplierList {
    margin: 20px;
}

.table {
    margin-bottom: 1rem;
    color: #212529;
    background-color: #fff;
}

th {
    background-color: #f8f9fa;
    border-color: #dee2e6;
    padding: 0.75rem;
    text-align: left;
}

td {
    padding: 0.75rem;
    border-top: 1px solid #dee2e6;
}

.btn {
    margin-right: 5px;
}

.update-form {
    margin-top: 20px;
}
</style>
  