<template>
    <div class="update-form">
        <h2>Update Barang</h2>
        <input v-model="updatedBarang.namaBarang" class="form-control" placeholder="Nama Barang">
        <input v-model="updatedBarang.harga" class="form-control" placeholder="Harga">
        <input v-model="updatedBarang.stok" class="form-control" placeholder="Stok">
        <input v-model="updatedBarang.supplier.namaSupplier" class="form-control" placeholder="Nama Supplier">
        <button class="btn btn-success" @click="updateBarang">Submit</button>
        <button class="btn btn-danger" @click="cancelUpdate">Cancel</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['barang'],
    data() {
        return {
            updatedBarang: null
        };
    },
    created() {
     
        this.updatedBarang = {...this.barang};
    },
    methods: {
        updateBarang() {
            axios.put(`http://159.223.57.121:8090/barang/update/${this.updatedBarang.id}`, this.updatedBarang)
                .then(() => {
                    this.showUpdateForm = false;
                    this.getBarangs();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        cancelUpdate() {
    
            this.$emit('update-cancel');
        }
    }
};
</script>
