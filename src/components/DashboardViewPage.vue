<template>
    <b-container fluid class="dashboard">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">My App</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown text="User" right>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-row no-gutters>
            <b-col md="3" class="sidebar">
                <div class="user-profile text-center">
                    <b-avatar :src="userImgUrl" size="100"></b-avatar>
                    <h4 class="mt-3">{{ profileName }}</h4>
                    <p class="online-status" v-if="isOnline">Online</p>
                </div>
                <div class="menu mt-5">
                    <b-button variant="primary" block class="mb-2" @click="currentView = 'barang'">Barang</b-button>
                    <b-button variant="secondary" block @click="currentView = 'supplier'">Supplier</b-button>
                </div>
            </b-col>
            <b-col md="9" class="main-content">
                <barang-view v-if="currentView === 'barang'" />
                <supplier-view v-if="currentView === 'supplier'" />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import BarangView from './BarangList.vue';
import SupplierView from './SupplierList.vue';

export default {
    components: {
        BarangView,
        SupplierView
    },
    data() {
        return {
            profileName: localStorage.getItem('profileName'),
            userImgUrl: 'path_to_image.jpg',
            isOnline: true,
            currentView: 'barang'
        }
    },
    methods: {
        logout() {

            localStorage.removeItem('token');

            localStorage.removeItem('profileName');
            localStorage.removeItem('username');

            this.$router.push('/login');
        }
    }

}
</script>
  
<style scoped>
.dashboard {
    height: 100vh;
}

.sidebar {
    background: linear-gradient(135deg, #71b7e6, #9b59b6);
    color: white;
    height: 100vh;
    padding: 20px;
    position: sticky;
    top: 0;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.user-profile {
    margin-top: 20px;
}

.online-status {
    color: #2ecc71;
    font-size: 0.9rem;
}

.menu button {
    transition: 0.3s;
}

.menu button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.header {
    height: 80px;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    font-size: 24px;
    font-weight: bold;
}

.logo img {
    height: 40px;
    margin-right: 10px;
}
</style>
  