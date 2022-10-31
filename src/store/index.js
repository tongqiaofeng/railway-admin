import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseUrl: 'http://192.168.0.164:8083/app/yumo/api',
    socketUrl: '192.168.0.164:8083/app/yumo/api/socketServer/',
    // socketUrl: '192.168.0.122:9999',
    // baseUrl: 'http://hk.wistechx.cn:8086/app/yumo/api',
    // socketUrl: 'hk.wistechx.cn:8086/app/yumo/api/socketServer/',
    // 正式
    // baseUrl: 'http://test.wistechx.cn:9001/app/yumo/api',
    // socketUrl: 'test.wistechx.cn:9001/app/yumo/api/socketServer/',

    isLogin: false,
    token: null,
    nick: '', //用户昵称
    allowBack: false
  },
  mutations: {
    // 更改用户状态信息
    userStatus(state, token) {
      if (token) {
        state.isLogin = true;
      } else if (token == null) {
        // 退出登录的时候清空sessionStorage里的内容
        sessionStorage.setItem('token', '');
        sessionStorage.setItem('nick', '');
        state.isLogin = false;
        state.token = '';
      }
    },

    userToken(state, token) {
      if (token) {
        state.token = token;
      } else {
        state.token = null;
      }
    },

    nick(state, nick) {
      if (nick) {
        state.nick = nick;
      } else {
        state.nick = '';
      }
    },

    allowBack(state, allowBack) {
      state.allowBack = false;
      allowBack
    },

  },
  actions: {
    // 应用mutations
    setToken({
      commit
    }, token) {
      commit('userToken', token)
    },

    setNick({
      commit
    }, nick) {
      commit('nick', nick)
    },

    updateAppSetting({
      commit
    }, allowBack) {
      allowBack
      commit('allowBack', false)
    },
  },
  modules: {}
});