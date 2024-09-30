<template>
  <div>
    <header v-if="isMobile">
      <div id="burger-menu" class="d-flex align-items-center">
        <span class="burger-icon fa fa-bars" @click="toggleMenu"></span>
      </div>
      <div id="menu-content" v-if="isMenuVisible">
        <MenuItems />
      </div>
    </header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 p-3 expanded" id="left-side-menu">
          <div id="burger-menu" class="d-flex align-items-center mb-3">
            <span class="burger-icon fa fa-bars" @click="toggleMenu"></span>
          </div>
          <div id="menu-content" v-if="isMenuVisible">
            <MenuItems />
          </div>
        </div>
        <div class="col-md-9 col-sm-12" id="main-content">
          <main>
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItems from './MenuItems.vue';


export default {
  name: 'EditorAdminDashboard',
  components: {
    MenuItems
  },
  data() {
    return {
      isMenuVisible: true,
      isMobile: false
    };
  },
  mounted() {
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;

      if (!this.isMobile) {
        this.isMenuVisible = true;
        this.toggleMenu();
        // document.getElementById('left-side-menu').classList.add('expanded');
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', () => { });
  },
  methods: {
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
      if (this.isMenuVisible) {
        document.getElementById('left-side-menu').classList.add('expanded');
      } else {
        document.getElementById('left-side-menu').classList.remove('expanded');
      }
    }
  },
  watch: {
    $route () {
      if (this.isMobile) {
        this.isMenuVisible = false;
      }
    }
  }
};
</script>


<style>
#left-side-menu {
  background-color: #0056b3;
  padding: 20px;
  transition: width 0.3s ease-in-out;
  height: 100vh;
  width: 50px;
  /* Set the initial width to the burger icon's width */
}

#burger-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* Align to the left */
  cursor: pointer;
  font-size: 24px;
  color: white;
}

#left-side-menu.expanded {
  width: 250px;
}

#left-side-menu.expanded #burger-menu {
  display: flex;
}

#left-side-menu.expanded #menu-content {
  display: block;
}

@media (max-width: 768px) {

  /* Adjust the breakpoint as needed */
  #left-side-menu {
    display: none;
  }

  #menu-content {
    position: absolute;
    display: block;
    width: 100%;
    margin-top: 10px;
    background-color: #0056b3;
    height: 100vh;
    left: 0;
    top: 45px;
    z-index: 10;
  }

  #burger-menu {
    /* Align to the left */
    cursor: pointer;
    position: relative;
    left: 0;
    width: 100%;
    background-color: #0056b3;
    padding: 20px;
  }
}

#main-content {
  padding: 20px;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  display: block;
}

.menu li a {
  text-decoration: none;
  color: #fff;
  /* Change to your desired text color */
  font-size: 18px;
  font-weight: 400;
  padding: 15px;
  transition: color 0.3s ease-in-out;
}

.menu li:hover,
.menu li:focus {
  color: #ff6b00;
  /* Change to your desired hover color */
  background-color: #333;
}
</style>