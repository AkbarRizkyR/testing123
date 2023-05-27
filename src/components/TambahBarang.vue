<template>
    <div class="tambah-barang">
        <b-card>
            <h1 class="mb-4">Add New Barang</h1>
            <b-form @submit.prevent="submitForm">
                <b-row>
                    <b-col md="6">
                        <b-form-group label="Nama Barang" label-for="namaBarang">
                            <b-form-input id="namaBarang" v-model="namaBarang" type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Stok" label-for="stok">
                            <b-form-input id="stok" v-model="stok" type="number"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <b-form-group label="Harga" label-for="harga">
                            <b-form-input id="harga" v-model="harga" type="number"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Supplier" label-for="supplier">
                            <b-form-input id="supplier" v-model="supplier" type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-card>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            namaBarang: '',
            stok: '',
            harga: '',
            supplier: '',
        }
    },
    methods: {
        submitForm() {
            const newBarang = {
                namaBarang: this.namaBarang,
                stok: this.stok,
                harga: this.harga,
                supplier: this.supplier,
            };

            axios.post('http://159.223.57.121:8090/barang/create', newBarang)
                .then(() => {
                    this.$router.push('/barang');
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
}
</script>
  
<style scoped>
.tambah-barang {
    margin: 20px;
}
</style>
  