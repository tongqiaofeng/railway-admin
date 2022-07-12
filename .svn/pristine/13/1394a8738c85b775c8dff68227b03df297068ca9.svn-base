<template>
  <div class="img-con">
    <!-- 图片展示 -->
    <div v-if="pageSel == 0" class="button-word">
      <button class="checkword" @click="checkWord">文件预览</button>
      <button class="checkword" @click="downWord">文件下载</button>
    </div>
    <div v-if="pageSel == 1">
      <div ref="imageList">
        <el-carousel
          height="600px"
          indicator-position="outside"
          :arrow="imgList.length > 1 ? 'always' : 'never'"
          :autoplay="false"
          ref="carousel"
        >
          <el-carousel-item v-for="(imgs, index) in imgList" :key="index">
            <div style="width: 100%;height: 550px;margin: 0 auto;">
              <img
                style="width: 100%;height: 100%;object-fit:contain;"
                ref="image"
                v-show="imgs !== '' && imgs !== null"
                :src="img + '/file/' + imgs"
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div v-if="pageSel == 2">
      <div class="goback" @click="backToButton">
        <img src="../assets/imgs/home/goback.png" class="img" />
        <p class="p-font">返回</p>
      </div>
      <div v-for="i in numPages" :key="i">
        <pdf :src="pdfSrc" :page="i"></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      imgType: ["jpeg", "png", "jpg", "tif", "bmp", "gif"],
      imgList: [],
      pageSel: 0,
      wordUrl: "",
      wordPdfUrl: "",
      wordEurl: "",

      currentPage: 0, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      pdfSrc: "", // pdf文件地址
      numPages: 0,

      num: 0,
      numMsg: "数据加载中",
    };
  },
  components: {
    pdf,
  },
  mounted() {
    console.log("参数9999iiiiiiiiiiiiiiiiii");
    console.log(this.$route.params.id);
    let id = 0;
    let jobNum = "";
    if (this.$route.params.id !== undefined) {
      // if (this.$route.params.id.indexOf("&") !== -1) {
      //   console.log(this.$route.params.id);
      //   id = this.$route.params.id.split("&")[0];
      //   window.location.href = window.location.href.split("&")[0];
      // } else {
      id = this.$route.params.id;
      jobNum = this.$route.params.jobNumber;
      // }
    }
    this.$axios
      .post(this.$store.state.baseUrl + "/pdfUrlGet", {
        id: id,
        jobNumber: jobNum,
      })
      .then((res) => {
        console.log("文档详情");
        console.log(res);
        document.title = res.data.name;
        if (res.data.pdfUrl == "") {
          this.pageSel = 1;
          if (res.data.url !== null && res.data.url !== "") {
            if (res.data.url.indexOf("|") !== -1) {
              this.imgList = res.data.url.split("|");
            } else {
              this.imgList.push(res.data.url);
            }
          } else {
            this.imgList = [];
          }
          this.$nextTick(() => {
            this.slideBanner();
            console.log(this.$refs.imageList);
            new Viewer(this.$refs.imageList, {
              navbar: true, //底部缩略图
              title: true, //当前图片标题
              keyboard: true, //是否支持键盘
              toggleOnDblclick: false,
            });
          });
        } else {
          this.pageSel = 0;
          this.wordUrl = res.data.url;
          this.wordPdfUrl = res.data.pdfUrl;
        }
      });
  },
  methods: {
    // 返回
    backToButton() {
      this.pageSel = 0;
    },
    // 文件预览
    checkWord() {
      this.pageSel = 2;
      console.log(this.wordPdfUrl);

      let eurl = this.$store.state.baseUrl + "/file/" + this.wordPdfUrl;

      console.log(eurl);
      // window.open(eurl);
      this.pdfSrc = eurl;
      this.$nextTick(() => {
        console.log("pdf文件");
        console.log(pdf);

        this.pdfSrc = pdf.createLoadingTask(this.pdfSrc);
        this.pdfSrc.promise
          .then((pdf) => {
            this.numPages = pdf.numPages;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    // 下载
    downWord() {
      console.log(this.wordUrl);
      let eurl = this.$store.state.baseUrl + "/file/" + this.wordUrl;
      console.log(eurl);
      window.location.href = eurl;
    },
    // 手指左右滑动轮播
    slideBanner() {
      //选中item的盒子
      let box = document.querySelector(".el-carousel__container");
      //手指起点X坐标
      let startPoint = 0;
      //手指滑动重点X坐标
      let stopPoint = 0;

      //重置坐标
      let resetPoint = () => {
        startPoint = 0;
        stopPoint = 0;
      };

      //手指按下
      box.addEventListener("touchstart", (e) => {
        //手指按下的时候停止自动轮播
        this.stopAuto();
        //手指点击位置的X坐标
        startPoint = e.changedTouches[0].pageX;
      });
      //手指滑动
      box.addEventListener("touchmove", (e) => {
        //手指滑动后终点位置X的坐标
        stopPoint = e.changedTouches[0].pageX;
      });
      //当手指抬起的时候，判断图片滚动离左右的距离
      box.addEventListener("touchend", (e) => {
        console.log(e);
        console.log("1：" + startPoint);
        console.log("2：" + stopPoint);
        if (stopPoint == 0 || startPoint - stopPoint == 0) {
          resetPoint();
          return;
        }
        if (startPoint - stopPoint > 0) {
          resetPoint();
          console.log(this.$refs.carousel);
          this.$refs.carousel.next();
          return;
        }
        if (startPoint - stopPoint < 0) {
          resetPoint();
          console.log(this.$refs.carousel);
          this.$refs.carousel.prev();
          return;
        }
      });
    },
    stopAuto() {},
  },
};
</script>

<style lang="scss" scoped>
.img-con {
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;

  .button-word {
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    .checkword {
      background-color: #3d81fd;
      color: #fff;
      text-align: center;
      border: none;
      outline: none;
      border-radius: 4px;
    }
  }

  .goback {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
}

.checkword {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.goback {
  width: 60px;

  .img {
    height: 18px;
  }

  .p-font {
    margin: 0;
    font-size: 18px;
  }
}
</style>
<style lang="scss">
@media screen and (max-width: 767px) {
  .el-carousel__arrow {
    width: 50px;
    height: 50px;
    font-size: 15px;
  }
}

.el-carousel__indicator.is-active button {
  background-color: #3d81fd;
}

.el-carousel__item.is-active {
  z-index: 0;
}
</style>
