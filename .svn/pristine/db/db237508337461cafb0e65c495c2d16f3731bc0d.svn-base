<template>
  <div id="app" :style="{height: cliHeight}">
    <router-view />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cliHeight: 0,
      }
    },
    mounted() {
      console.log(document.body.clientHeight);
      this.cliHeight = document.body.clientHeight + 'px';
    },
    methods: {}
  }
</script>
<style lang="scss">
  #app {
    // min-height: 800px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>