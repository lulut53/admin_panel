<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="$route.meta.navbarClasses ? $route.meta.navbarClasses : 'bg-success navbar-dark'"
    type=""
  >
    <!-- Search form -->
    <!-- <form class="navbar-search form-inline mr-sm-3"
          :class="$route.meta.searchClasses ? $route.meta.searchClasses : 'navbar-search-light'"
          id="navbar-search-main">
      <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div>
          <input class="form-control" placeholder="Search" type="text">
        </div>
      </div>
      <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </form> -->
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler sidenav-toggler-dark"
             @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
      <li class="nav-item d-sm-none">
        <a class="nav-link" href="#" data-action="search-show" data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>

    </ul>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <!-- <li class="nav-item dropdown">
        <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="ni ni-bell-55"></i>
        </a>
      </li> -->
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
        <a slot="title-container" type="secondary">
          <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Profile image" :src="foto">
                  </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{ username }}</span>
            </div>
          </div>
        </a>
                        <router-link to="/administrator/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </router-link>
        <div class="dropdown-divider"></div>
                        <!-- <router-link to="/logout" class="dropdown-item"> -->
                        <div class="dropdown-item" @click="doLogout">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </div>
                        <!-- </router-link> -->
        </base-dropdown>


      </li>
    </ul>
    <modal :show.sync="isLoading" :clickToClose="false">
      <!-- <template slot="header">
        <h3 class="modal-title text-center">Loading</h3>
      </template> -->
      <h3 class="text-center">Loading</h3>
      <div style="display: flex; margin-top: 30px !important; justify-content: center;">
      <br/>
      <!-- <center> -->
        <half-circle-spinner
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
      />
      </div>
    <!-- </center> -->
    </modal>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import { HalfCircleSpinner } from 'epic-spinners';
import { mapActions } from 'vuex';
import swal from 'sweetalert2';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
    HalfCircleSpinner
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: '',
      isLoading: false,
      username : 'Dicicilaja Admin',
      foto: "/images/default-avatar.jpg"
    };
  },
  methods: {
    ...mapActions('auth', [
        'logout'
    ]),
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    async doLogout() {
      this.isLoading = true
      let res = await this.logout();
      const delay = ms => new Promise(res => setTimeout(res, ms));
      await delay(2000);

      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('role')
      window.localStorage.removeItem('user')

      swal.fire({
        type: 'success',
        title: 'Anda telah logout',
        timer: 1500,
      })

      this.$router.push('/login')
    }
  },
  created () {
    if (window.localStorage.getItem('access_token')) {
      let data = JSON.parse(window.localStorage.getItem('user'))

      this.username = data.attributes.nama
      // Avatar URL checked
      this.foto = data.attributes.avatar_url && !data.attributes.avatar_url.includes("lorempixel") 
        ? data.attributes.avatar_url 
        : "/images/default-avatar.jpg"
    }
  },
  mounted() {
    this.$root.$on('nama_profil', (text) => { // here you need to use the arrow function
      this.username = text;
    });
    this.$root.$on('foto_profil', (text) => { // here you need to use the arrow function
      this.foto = text;
    });
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
