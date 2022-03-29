<template>
  <div class="d-flex justify-center w-100">
    <el-card class="box-card" style="width: 400px">
      <div slot="header"> Login </div>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
        <el-form-item label="Password" prop="email">
          <el-input v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Confirm" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">Submit</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        password: '123456',
        email: 'mamatov.umar@mail.ru',
      },
      rules: {
        password: { required: true, trigger: 'blur' },
        email: { required: true, trigger: 'blur' },
      }
    };
  },

  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          firebase
              .auth()
              .signInWithEmailAndPassword(this.ruleForm.email.replace(/\s/g, ''), this.ruleForm.password)
              .then(() => {
                this.$router.push('/');
              })
              .catch(error => {
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                  this.$message.error({
                    title: 'Ошибка', offset: 60,
                    message: 'Пользователя с такими данными не существует',
                  });
                } else if (error.code === 'auth/invalid-email') {
                  this.$message.error({
                    title: 'Ошибка', offset: 60,
                    message: 'Некорректный email',
                  });

                } else {
                  this.$message.error({
                    title: 'Ошибка', offset: 60,
                    message: error,
                  });

                }
              });
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">

</style>
