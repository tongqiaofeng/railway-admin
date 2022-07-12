<template>
  <div class="img-con">
    <div v-for="i in numPages" :key="i">
      <pdf :src="pdfSrc" :page="i"></pdf>
    </div>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  export default {
    data() {
      return {
        pdfSrc: '', // pdf文件地址
        numPages: 0,

      }
    },
    components: {
      pdf
    },
    mounted() {
      console.log('444');
      this.checkWord();
    },
    methods: {
      // jump() {
      //   this.$router.push({
      //     path: '/file',
      //     query: {
      //       url: 'http://192.168.0.164:8088/app/yumo/api/file/f58d4a0e291c471cae2878dd0e4f4176.pdf'
      //     }
      //   });
      // },
      // 文件预览
      checkWord() {
        console.log('111');
        console.log(this.$route.query.url);
        let eurl = this.$route.query.url;

        // let eurl = this.$store.state.baseUrl + '/file/' + this.$route.query.url;

        console.log(eurl);

        this.pdfSrc = eurl;
        this.$nextTick(() => {
          this.pdfSrc = pdf.createLoadingTask(this.pdfSrc);
          this.pdfSrc.promise.then(pdf => {
            this.numPages = pdf.numPages;
          }).catch(err => {
            console.log(err);
          })
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .img-con {
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>