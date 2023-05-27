<template>
    <div class="barangList">
        <b-button variant="success" class="mb-3" @click="showTambahBarang = true">Tambah Barang</b-button>
        <table class="table table-hover">
            <!-- table headers -->
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Nama Barang</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Nama Supplier</th>
                    <th scope="col">Alamat Supplier</th>
                    <th scope="col">No Telp Supplier</th>
                    <th scope="col">Aksi</th>
                </tr>
            </thead>
            <!-- table data -->
            <tbody>
                <tr v-for="(barang, index) in barangs.data" :key="barang.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ barang.namaBarang }}</td>
                    <td>{{ barang.stok }}</td>
                    <td>{{ barang.harga }}</td>
                    <td v-if="barang.supplier">{{ barang.supplier.namaSupplier }}</td>
                    <td v-if="barang.supplier">{{ barang.supplier.alamat }}</td>
                    <td v-if="barang.supplier">{{ barang.supplier.noTelp }}</td>

                    <td>
                        <button class="btn btn-primary" @click="openUpdateForm(barang)">Update</button>
                        <button class="btn btn-danger" @click="deleteBarang(barang)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <paginate :page-count="Math.ceil(barangs.totalItems / barangs.pageSize)" :click-handler="goToPage"
            :container-class="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'"
            :prev-link-class="'page-link'" :next-link-class="'page-link'" :page-link-class="'page-link'"
            :active-class="'active'"></paginate>
        <TambahBarang v-if="showTambahBarang" @close="showTambahBarang = false" />

        <UpdateBarang v-if="showUpdateForm" :barang="selectedBarang" @update-success="getBarangs"
            @update-cancel="cancelUpdate" />
    </div>
</template>
  
<script>
import axios from 'axios';
import TambahBarang from './TambahBarang.vue';
import UpdateBarang from './UpdateBarang.vue';
import Paginate from 'vuejs-paginate';

export default {
    components: {
        TambahBarang,
        UpdateBarang,
        Paginate,
    },
    data() {
        return {
            barangs: {},
            showUpdateForm: false,
            updatedBarang: {},
            showTambahBarang: false,
            pageSize: 5,
            currentPage: 1,
            totalPages: 0
        };
    },
    methods: {
        getBarangs() {
            const offset = 0;
            const limit = 10;

            const config = {
                params: {
                    offset: offset,
                    limit: limit,
                },
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            };

            axios
                .get('http://159.223.57.121:8090/barang/find-all', config)
                .then((response) => {
                    this.barangs = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        deleteBarang(barang) {
            axios
                .delete(`http://159.223.57.121:8090/barang/delete/${barang.id}`)
                .then(() => {
                    this.getBarangs();
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        openUpdateForm(barang) {
            this.showUpdateForm = true;
            this.selectedBarang = barang;
        },

        cancelUpdate() {
            this.showUpdateForm = false;
            this.selectedBarang = null;
        },

        goToPage(pageNumber) {
            const offset = (pageNumber - 1) * this.barangs.pageSize;
            const limit = this.barangs.pageSize;

            const config = {
                params: {
                    offset: offset,
                    limit: limit,
                },
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            };

            axios
                .get('http://159.223.57.121:8090/barang/find-all', config)
                .then((response) => {
                    this.barangs = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
    created() {
        this.getBarangs();
    },

};
</script>


<style scoped>
.barangList {
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
  