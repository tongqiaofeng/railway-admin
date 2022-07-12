<template>
  <div class="container-login-one">
    <div class="container-login-main">
      <div class="main-left">
        <img src="../assets/imgs/login/back02.png" />
      </div>
      <div class="main-right" @keydown="keyLogin()">
        <div class="login-top">
          <div class="top-img">
            <img src="../assets/imgs/login/image2.png" />
          </div>
          <div>
            <span class="top-span-login">玉磨铁路备件智能管理系统</span>
          </div>
        </div>
        <div class="login-form">
          <div class="username">
            <input class="user-input" type="text" v-model="loginForm.user" placeholder="请输入用户名" autofocus="autofocus"
              prefix-icon="el-icon-s-custom" tabindex="1" auto-complete="on" />
          </div>
          <div class="password">
            <input class="pass-input" type="password" v-model="loginForm.psw" placeholder="请输入密码"
              prefix-icon="el-icon-lock" tabindex="2" auto-complete="on" />
          </div>
        </div>
        <div class="login-button">
          <button @click="handleLogin" class="loginBtn">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loginForm: {
          user: "",
          psw: ""
        },
        usernameImg: require('../assets/imgs/user1.png'),
        passwordImg: require('../assets/imgs/psw1.png'),
      }
    },
    beforeRouteEnter: (to, from, next) => {
      // 组件内守卫
      // 已登录状态回到登录状态，即 登出
      next(vm => {
        vm.$store.dispatch('setToken', null)
      })
    },
    mounted() {
      console.log(document.getElementsByClassName('container-login-one'));
      console.log(document.documentElement.clientHeight);
      console.log(document.body.clientHeight);
      console.log(window.innerHeight);
      document.getElementsByClassName('container-login-one')[0].style.height = document.body.clientHeight +
        'px';
    },
    methods: {
      // 登录
      handleLogin() {
        if (this.loginForm.user == "" || this.loginForm.psw == "") {
          this.$message.warning({
            message: "用户名或密码不能为空 !",
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/userLogin', {
            user: this.loginForm.user,
            psw: this.loginForm.psw
          }).then((res) => {
            console.log('登陆成功啦');
            console.log(res)
            this.$message.success({
              message: '登陆成功',
              showClose: true,
              duration: 2000
            });
            // 将用户昵称、用户角色和token等放入sessionStorage
            sessionStorage.setItem('nick', res.data.user);
            sessionStorage.setItem('userId', res.data.id);
            sessionStorage.setItem('token', res.data.token);
            // 申请权限
            sessionStorage.setItem('isApply', res.data.isApply);
            // 审批权限
            sessionStorage.setItem('isCheck', res.data.isCheck);
            // 系统管理员权限
            sessionStorage.setItem('isAdmin', res.data.isAdmin);

            // 将用户昵称、用户角色及token等放入vuex
            this.$store.dispatch('setNick', res.data.user);
            this.$store.dispatch('setToken', res.data.token);

            this.$store.state.isLogin = true;
            console.log(this.$store.state.isLogin);

            this.$router.push('/home');
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          }).catch((err) => {
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
            this.$store.dispatch('setToken', null);
            this.loginForm.password = "";
          })
        }
      },
      // 回车键登录
      keyLogin() {
        if (event.keyCode == 13) {
          this.handleLogin();
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .container-login-one {
    display: flex;
    align-items: center;
    /*定义body的元素垂直居中*/
    justify-content: center;
    background: url('../assets/imgs/login/back01.png') no-repeat;
    background-size: 100% 100%;


    .container-login-main {
      width: 1064px;
      // margin: 0 auto;
      // padding-top: 233px;
      display: flex;

      .main-right {
        width: 532px;
        height: 614px;
        padding: 0 10px;
        background-color: #fff;
        // background-color: rgba(0, 0, 0, 0.3);

      }
    }
  }

  .login-top {
    width: 470px;
    margin: 0 auto;
    margin-top: 60px;
    display: flex;

    .top-span-login {
      font-size: 36px;
      color: #15183a;
      font-family: '华文行楷';
    }
  }

  .login-form {
    width: 100%;
    margin-top: 50px;

    .username {
      width: 380px;
      margin: 0 auto;
      display: flex;
      border: 1px solid #dedede;

      p {
        margin: 0;
        margin-top: 10px;
      }
    }

    .user-input,
    .pass-input {
      width: 100%;
      height: 50px;
      padding-left: 20px;
      border: 0;
      background: 0;
      outline: none;
      font-size: 16px;
      // color: #dedede;
    }

    .password {
      width: 380px;
      margin: 0 auto;
      margin-top: 20px;
      display: flex;
      border: 1px solid #dedede;

      p {
        margin: 0;
        margin-top: 3px;
      }
    }
  }

  .login-button {
    width: 100%;
    margin-top: 60px;

    .loginBtn {
      width: 380px;
      height: 50px;
      margin: 0 auto;
      font-size: 16px;
      color: #fff;
      background-color: #3d82fe;
      border: 0;
      outline: none;
      cursor: pointer;
    }
  }

  input::-webkit-input-placeholder {
    color: #dedede;
  }

  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #dedede;
  }

  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #dedede;
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #dedede;
  }
</style>
<style lang="scss">
  input:-internal-autofill-selected {
    background-color: transparent !important;
    background-image: none !important;
    color: -internal-light-dark-color(black, white) !important;
  }
</style>