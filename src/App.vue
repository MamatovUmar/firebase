<template>
  <div id="app">
    <el-menu mode="horizontal" class="mb-30" router>
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/about"> About </el-menu-item>
      <el-menu-item v-if="!isLogin" index="/login"> Login </el-menu-item>
      <el-menu-item v-else @click="logout()"> Logout </el-menu-item>
    </el-menu>

    <el-container>
      <router-view v-if="isLogin || !this.$route.meta.auth"/>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';

export default {
  computed: {
    ...mapGetters({
      isLogin: 'User/isLogin'
    })
  },

  methods: {
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
        this.$store.commit('User/setData', null);
      });
    }
  }
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');

body{
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.mb-30{
  margin-bottom: 30px !important;
}
.d-flex{
  display: flex;
}
.justify-center{
  justify-content: center;
}
.align-center{
  align-items: center;
}
.w-100{
  width: 100%;
}
</style>
