<template>
    <div class="tambah-supplier">
        <b-card>
            <h1 class="mb-4">Add New Supplier</h1>
            <b-form @submit.prevent="submitForm">
                <b-row>
                    <b-col md="6">
                        <b-form-group label="Nama Supplier" label-for="namaSupplier">
                            <b-form-input id="namaSupplier" v-model="namaSupplier" type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6">
                        <b-form-group label="Alamat" label-for="alamat">
                            <b-form-input id="alamat" v-model="alamat" type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6">
                        <b-form-group label="No Telp" label-for="noTelp">
                            <b-form-input id="noTelp" v-model="noTelp" type="text"></b-form-input>
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
            namaSupplier: '',
            alamat: '',
            noTelp: '',
        };
    },
    methods: {
        submitForm() {
            const newSupplier = {
                namaSupplier: this.namaSupplier,
                alamat: this.alamat,
                noTelp: this.noTelp,
            };

            axios
                .post('http://159.223.57.121:8090/supplier/create', newSupplier)
                .then(() => {
                    this.$router.push('/supplier');
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
  
<style scoped>
.tambah-supplier {
    margin: 20px;
}
</style>
  