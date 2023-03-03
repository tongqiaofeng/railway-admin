<template>
  <div class="word-admin-container">
    <!-- <h1>文档管理</h1> -->
    <div style="text-align: left;">
      <span
        style="display: inline-block;width: 45px;color: #606266;font-size: 14px;"
        >车站：</span
      >
      <el-select
        v-model="station"
        clearable
        placeholder="请选择"
        style="margin-bottom: 10px;"
      >
        <el-option
          v-for="item in stationList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span
        style="display: inline-block;width: 80px;margin-left: 10px;color: #606266;font-size: 14px;"
        >上传时间：</span
      >
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-input
        style="width: 330px;margin-left: 10px;"
        v-model="keyword"
        placeholder="可输入文档名称进行搜索"
      >
      </el-input>
      <el-button style="margin-left: 10px;" type="primary" @click="wordCheck"
        >查 询</el-button
      >
      <el-button type="primary" @click="addWord">+ 新 建</el-button>
      <!-- <el-button type="primary" @click="qrcodeAll">批量生成</el-button>
      <div
        style="display: none;"
        class="qr_img"
        id="qrcode3"
        ref="qrcode3"
      ></div> -->

      <el-dialog
        title="添加文档"
        :visible.sync="dialogAddWordVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :append-to-body="false"
      >
        <el-form :model="wordForm" ref="wordFormRef" label-width="100px">
          <el-form-item label="站列表：">
            <el-select
              v-model="wordForm.wid"
              clearable
              placeholder="请选择"
              @change="widChange"
            >
              <el-option
                v-for="item in stationList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文档名称：" required>
            <div style="display: flex;">
              <el-input
                v-model="wordForm.name"
                placeholder="请输入"
                style="width: 100%;"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="文档文件：" required>
            <div style="display:flex;">
              <div class="upload-imgs">
                <div class="add">
                  <form enctype="multipart/form-data" style="width: 100px;">
                    <input
                      @change="inputChange($event)"
                      ref="uploadImgRef"
                      type="file"
                      name="fileName"
                      accept="image/*,.pptx,.xlsx,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf"
                      class="inputUpload"
                    />
                    <i class="el-icon-plus addIcon"></i>
                  </form>
                </div>
                <div
                  style="display:flex;position:relative;flex-wrap: wrap;"
                  id="delImg"
                  class="delImg"
                >
                  <div
                    v-for="(imgurl, index) of imgurls"
                    :key="index"
                    style="margin-left:10px;position:relative;"
                  >
                    <span
                      v-if="imgurl !== '' && imgurl !== null"
                      class="spanStyle"
                      @click="delImage(index)"
                      >x</span
                    >
                    <img
                      v-if="imgurl !== '' && imgurl !== null"
                      :src="imgFilter(imgurl)"
                      width="100px"
                      height="100px"
                      style="border-radius:5px;object-fit:cover;"
                    />
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label-width="0">
            <div style="display: flex;justify-content: space-between;">
              <div>
                <div style="margin: 0;line-height: 20px;">可查看工号：</div>
                <div
                  style="width: 105px;margin: 0;line-height: 20px;font-size: 12px;"
                >
                  (每个工号一行)
                </div>
              </div>
              <el-input
                type="textarea"
                :rows="10"
                v-model="wordForm.jobNumber"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogAddWordVisible = false">取 消</el-button>
          <el-button type="primary" @click="addWordSure" v-preventClick
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div style="margin-top: 20px;">
      <el-table :data="wordList" style="width: 980px" border>
        <el-table-column prop="stationName" label="车站名称"> </el-table-column>
        <el-table-column prop="name" label="文件名称"> </el-table-column>
        <el-table-column prop="time" label="上传时间"> </el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="qrcodeLook(scope.row)"
                >二维码预览及下载</el-button
              >
              <el-dialog
                title="二维码预览及下载"
                v-if="dialogQrcodeLookVisible"
                :visible.sync="dialogQrcodeLookVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :modal-append-to-body="false"
                :append-to-body="false"
              >
                <div>
                  <div style="display: flex;">
                    <el-input
                      v-model="qrcodeText"
                      placeholder="请输入二维码标题内容"
                    ></el-input>
                    <el-button type="primary" @click="createQr"
                      >确 认</el-button
                    >
                  </div>

                  <div style="margin-top: 20px;text-align: center;">
                    <div class="qr_img" id="qrcode" ref="qrcode"></div>
                  </div>
                </div>
                <div slot="footer">
                  <el-button
                    style="margin-left: 10px;"
                    type="primary"
                    @click="createPicture"
                  >
                    <div
                      style="display: none;"
                      class="qr_img"
                      id="qrcode2"
                      ref="qrcode2"
                    ></div>
                    二维码下载
                  </el-button>
                  <el-button @click="dialogQrcodeLookVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="dialogQrcodeLookVisible = false"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                style="margin-left: 30px;"
                type="text"
                @click="updateWord(scope.row)"
                >详情</el-button
              >
              <el-dialog
                title="修改文档"
                :visible.sync="dialogUpdateWordVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :modal-append-to-body="false"
                :append-to-body="false"
              >
                <el-form :model="wordForm" label-width="100px">
                  <el-form-item label="站列表：">
                    <el-select
                      v-model="wordForm.wid"
                      clearable
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in stationList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="文档名称：" required>
                    <div style="display: flex;">
                      <el-input
                        v-model="wordForm.name"
                        placeholder="请输入"
                        style="width: 100%;"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="文档文件：" required>
                    <div style="display:flex;">
                      <div class="upload-imgs">
                        <div class="add">
                          <form
                            enctype="multipart/form-data"
                            style="width: 100px;"
                          >
                            <input
                              @change="inputChange($event)"
                              ref="uploadImgRef"
                              type="file"
                              name="fileName"
                              accept="image/*,.pptx,.xlsx,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf"
                              class="inputUpload"
                            />
                            <i class="el-icon-plus addIcon"></i>
                          </form>
                        </div>
                        <div
                          style="display:flex;position:relative;flex-wrap: wrap;"
                          id="delImg"
                          class="delImg"
                        >
                          <div
                            v-for="(imgurl, index) of imgurls"
                            :key="index"
                            class="imgCheck"
                          >
                            <span
                              v-if="imgurl !== '' && imgurl !== null"
                              class="spanStyle"
                              @click="delImage(index)"
                              >x</span
                            >
                            <img
                              v-if="imgurl !== '' && imgurl !== null"
                              :src="imgFilter(imgurl)"
                              width="100px"
                              height="100px"
                              style="border-radius:5px;object-fit:cover;"
                              @click="downWord(imgurl)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label-width="0">
                    <div style="display: flex;justify-content: space-between;">
                      <div>
                        <div style="margin: 0;line-height: 20px;">
                          可查看工号：
                        </div>
                        <div
                          style="width: 105px;margin: 0;line-height: 20px;font-size: 12px;"
                        >
                          (每个工号一行)
                        </div>
                      </div>
                      <el-input
                        type="textarea"
                        :rows="10"
                        v-model="wordForm.jobNumber"
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogUpdateWordVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="updateWordSure"
                    v-preventClick
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                style="margin-left: 30px;color: red;"
                type="text"
                @click="deteleWord(scope.row)"
                >删除</el-button
              >
              <el-dialog
                title="删除文档"
                :visible.sync="dialogDeleteWordVisible"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                :modal-append-to-body="false"
                :append-to-body="false"
              >
                <div style="text-align: center;">
                  <p style="margin: 10px 0 0;font-size: 16px;color: #4e4e4e;">
                    确定删除该文档？删除后不可修改
                  </p>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeleteWordVisible = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="deteleWordSure"
                    v-preventClick
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 980px;height: 50px;position: relative;">
        <div style="margin:15px 0;position:absolute;right:0;">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      img: this.$store.state.baseUrl,
      time: "",
      keyword: "",
      dialogAddWordVisible: false,
      wordForm: {
        wid: "",
        name: "",
        jobNumber: "",
      },
      imgurls: [],

      page: 1,
      pageNum: 10,
      total: 0,
      wordList: [],
      wordTypeList: [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/tif",
        "image/bmp",
        "image/gif",
        "pptx",
        "xlsx",
        "xls",
        "pdf",
        "doc",
        "docx",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/pdf",
      ],
      imgType1: ["jpeg", "png", "jpg", "tif", "bmp", "gif"],
      imgType2: ["xlsx", "xls"],
      imgType3: ["doc", "docx"],
      imgTypeImg1: require("../assets/imgs/word/PowerPoint-icon.png"),
      imgTypeImg2: require("../assets/imgs/word/Excel-icon.png"),
      imgTypeImg3: require("../assets/imgs/word/pdf.png"),
      imgTypeImg4: require("../assets/imgs/word/Word-icon.png"),
      imgTypeImg5: require("../assets/imgs/word/down.png"),
      dialogQrcodeLookVisible: false,
      qrcode: "",
      urlValue: "", // 生成二维码的内容

      dialogUpdateWordVisible: false,
      updateWordDetails: {},

      dialogDeleteWordVisible: false,
      deleteWordDetails: {},
      qrcodeText: "",

      station: "",
      stationList: [],
    };
  },
  created() {
    this.wordCheck();
    this.getStationList();
  },
  methods: {
    // 新增文档站变化
    widChange() {
      sessionStorage.setItem("widValue", this.wordForm.wid);
    },
    // 批量生成
    // qrcodeAll() {
    //   let list = [
    //     { id: 37, name: "S3" },
    //     { id: 39, name: "S4" },
    //     { id: 40, name: "SI" },
    //     { id: 41, name: "SII" },
    //     { id: 42, name: "X3" },
    //     { id: 43, name: "X4" },
    //     { id: 46, name: "XI" },
    //     { id: 47, name: "XII" },
    //     { id: 48, name: "D1" },
    //     { id: 49, name: "D2" },
    //     { id: 50, name: "D3" },
    //     { id: 51, name: "D4" },
    //     { id: 52, name: "D5" },
    //     { id: 53, name: "D6" },
    //     { id: 55, name: "S" },
    //     { id: 56, name: "SN" },
    //     { id: 57, name: "X" },
    //     { id: 58, name: "XN" },
    //     { id: 59, name: "0118" },
    //     { id: 60, name: "0132" },
    //     { id: 61, name: "0144" },
    //     { id: 63, name: "0158" },
    //     { id: 64, name: "0172" },
    //     { id: 65, name: "0212" },
    //     { id: 66, name: "0230" },
    //     { id: 67, name: "0242" },
    //     { id: 69, name: "0256" },
    //     { id: 70, name: "0270" },
    //     { id: 71, name: "0284" },
    //     { id: 72, name: "0296" },
    //     { id: 73, name: "0310" },
    //     { id: 75, name: "0103" },
    //     { id: 76, name: "0121" },
    //     { id: 77, name: "0141" },
    //     { id: 78, name: "0159" },
    //     { id: 79, name: "0203" },
    //     { id: 80, name: "0223" },
    //     { id: 81, name: "0237" },
    //     { id: 82, name: "0257" },
    //     { id: 83, name: "0275" },
    //     { id: 84, name: "0295" },
    //     { id: 86, name: "限界测试表" },
    //     { id: 87, name: "1DGF" },
    //     { id: 88, name: "1DGJ" },
    //     { id: 89, name: "2DGF" },
    //     { id: 90, name: "2DGJ" },
    //     { id: 91, name: "3DGF" },
    //     { id: 92, name: "3DGJ" },
    //     { id: 93, name: "3GF" },
    //     { id: 94, name: "3GJ" },
    //     { id: 95, name: "4DGF" },
    //     { id: 97, name: "4DGJ" },
    //     { id: 98, name: "4GJF" },
    //     { id: 99, name: "4GJJ" },
    //     { id: 101, name: "5-9DGF" },
    //     { id: 102, name: "5-9DGJ" },
    //     { id: 103, name: "6-10DGF" },
    //     { id: 104, name: "6-10DGJ" },
    //     { id: 106, name: "7DGF" },
    //     { id: 107, name: "7DGJ" },
    //     { id: 108, name: "8DGF" },
    //     { id: 109, name: "8DGJ" },
    //     { id: 110, name: "11DGF" },
    //     { id: 112, name: "11DGJ" },
    //     { id: 113, name: "12DGF" },
    //     { id: 114, name: "12DGJ" },
    //     { id: 115, name: "13DG1J" },
    //     { id: 117, name: "13DGF" },
    //     { id: 119, name: "13DGJ" },
    //     { id: 120, name: "14DG1J" },
    //     { id: 122, name: "14DGF" },
    //     { id: 123, name: "14DGJ" },
    //     { id: 125, name: "IAGF" },
    //     { id: 126, name: "IAGJ" },
    //     { id: 128, name: "IGF" },
    //     { id: 129, name: "IGJ" },
    //     { id: 130, name: "IIBGF" },
    //     { id: 131, name: "IIBGJ" },
    //     { id: 132, name: "IIGF" },
    //     { id: 133, name: "IIGJ" },
    //     { id: 134, name: "S1LQAG-FS" },
    //     { id: 135, name: "0103AG-FS" },
    //     { id: 136, name: "0103AG-JS" },
    //     { id: 137, name: "0103BG-FS" },
    //     { id: 138, name: "0103BG-JS" },
    //     { id: 139, name: "0118AG-FS" },
    //     { id: 140, name: "0118AG-JS" },
    //     { id: 141, name: "0118BG-FS" },
    //     { id: 142, name: "0118BG-JS" },
    //     { id: 143, name: "0121AG-FS" },
    //     { id: 144, name: "0121AG-JS" },
    //     { id: 145, name: "0121BG-FS" },
    //     { id: 146, name: "0121BG-JS" },
    //     { id: 147, name: "0121CG-FS" },
    //     { id: 148, name: "0121CG-JS" },
    //     { id: 149, name: "0132AG-FS" },
    //     { id: 150, name: "0132AG-JS" },
    //     { id: 151, name: "0132BG-FS" },
    //     { id: 152, name: "0132BG-JS" },
    //     { id: 153, name: "0141AG-FS" },
    //     { id: 154, name: "0141AG-JS" },
    //     { id: 155, name: "0141BG-FS" },
    //     { id: 156, name: "0141BG-JS" },
    //     { id: 157, name: "0144AG-FS" },
    //     { id: 158, name: "0144AG-JS" },
    //     { id: 159, name: "0144BG-FS" },
    //     { id: 161, name: "0144BG-JS" },
    //     { id: 162, name: "0158AG-FS" },
    //     { id: 163, name: "0158AG-JS" },
    //     { id: 164, name: "SX1" },
    //     { id: 165, name: "0158BG-FS" },
    //     { id: 166, name: "0158BG-JS" },
    //     { id: 167, name: "0159AG-FS" },
    //     { id: 168, name: "0159AG-JS" },
    //     { id: 169, name: "SX3" },
    //     { id: 170, name: "SX5" },
    //     { id: 171, name: "0159BG-FS" },
    //     { id: 172, name: "SX7" },
    //     { id: 173, name: "SX9" },
    //     { id: 174, name: "0159BG-JS" },
    //     { id: 175, name: "SX11" },
    //     { id: 176, name: "0159CG-FS" },
    //     { id: 177, name: "SX13" },
    //     { id: 178, name: "SX15" },
    //     { id: 179, name: "SX17" },
    //     { id: 180, name: "SX19" },
    //     { id: 181, name: "0159CG-JS" },
    //     { id: 182, name: "SX21" },
    //     { id: 183, name: "0159DG-FS" },
    //     { id: 185, name: "0159DG-JS" },
    //     { id: 186, name: "0172AG-FS" },
    //     { id: 187, name: "0172AG-JS" },
    //     { id: 188, name: "0172BG-FS" },
    //     { id: 189, name: "SX-2" },
    //     { id: 190, name: "SX-4" },
    //     { id: 191, name: "SX-6" },
    //     { id: 192, name: "SX-8" },
    //     { id: 194, name: "SX-10" },
    //     { id: 195, name: "SX-12" },
    //     { id: 196, name: "SX-14" },
    //     { id: 197, name: "SX-16" },
    //     { id: 198, name: "SX-18" },
    //     { id: 199, name: "SX-20" },
    //     { id: 200, name: "SX-22" },
    //     { id: 201, name: "SX-24" },
    //     { id: 202, name: "SX-26" },
    //     { id: 203, name: "SX-28" },
    //     { id: 204, name: "SX-30" },
    //     { id: 205, name: "SF-1" },
    //     { id: 206, name: "SF-3" },
    //     { id: 207, name: "SF-5" },
    //     { id: 208, name: "SF-7" },
    //     { id: 209, name: "SF-9" },
    //     { id: 210, name: "SF-11" },
    //     { id: 211, name: "SF-13" },
    //     { id: 212, name: "SF-15" },
    //     { id: 213, name: "SF-17" },
    //     { id: 214, name: "SF-19" },
    //     { id: 215, name: "SF-21" },
    //     { id: 216, name: "0172BG-JS" },
    //     { id: 217, name: "0203AG-FS" },
    //     { id: 218, name: "0203AG-JS" },
    //     { id: 219, name: "SF-24" },
    //     { id: 220, name: "SF-26" },
    //     { id: 221, name: "SF-28" },
    //     { id: 222, name: "0203BG-FS" },
    //     { id: 223, name: "SF-30" },
    //     { id: 224, name: "SF-32" },
    //     { id: 225, name: "0203BG-JS" },
    //     { id: 226, name: "SF-34" },
    //     { id: 227, name: "0203CG-FS" },
    //     { id: 228, name: "0203CG-JS" },
    //     { id: 230, name: "0212AG-FS" },
    //     { id: 231, name: "SF-2" },
    //     { id: 232, name: "0212AG-JS" },
    //     { id: 233, name: "SF-4" },
    //     { id: 234, name: "SF-6" },
    //     { id: 235, name: "SF-8" },
    //     { id: 236, name: "SF-10" },
    //     { id: 237, name: "SF-12" },
    //     { id: 238, name: "0212BG-FS" },
    //     { id: 239, name: "SF-14" },
    //     { id: 240, name: "SF-16" },
    //     { id: 241, name: "SF-18" },
    //     { id: 242, name: "SF-20" },
    //     { id: 243, name: "SF-22" },
    //     { id: 244, name: "0212BG-JS" },
    //     { id: 245, name: "0223AG-FS" },
    //     { id: 246, name: "0223AG-JS" },
    //     { id: 247, name: "0223BG-FS" },
    //     { id: 248, name: "0223BG-JS" },
    //     { id: 249, name: "0230AG-FS" },
    //     { id: 250, name: "0230AG-JS" },
    //     { id: 251, name: "SJ-1" },
    //     { id: 252, name: "SJ-3" },
    //     { id: 253, name: "0230BG-FS" },
    //     { id: 254, name: "SJ-5" },
    //     { id: 255, name: "SJ-7" },
    //     { id: 256, name: "SJ-9" },
    //     { id: 257, name: "SJ-11" },
    //     { id: 258, name: "SJ-13" },
    //     { id: 259, name: "0230BG-JS" },
    //     { id: 262, name: "0230CG-FS" },
    //     { id: 263, name: "0230CG-JS" },
    //     { id: 264, name: "0237AG-FS" },
    //     { id: 265, name: "0237AG-JS" },
    //     { id: 266, name: "0237BG-FS" },
    //     { id: 267, name: "0237BG-JS" },
    //     { id: 269, name: "0237CG-FS" },
    //     { id: 270, name: "0237CG-JS" },
    //     { id: 271, name: "SJ-15" },
    //     { id: 272, name: "0242AG-FS" },
    //     { id: 273, name: "SJ-17" },
    //     { id: 274, name: "0242AG-JS" },
    //     { id: 275, name: "SJ-19" },
    //     { id: 276, name: "0242BG-FS" },
    //     { id: 277, name: "0242BG-JS" },
    //     { id: 278, name: "SJ-21" },
    //     { id: 279, name: "0256AG-FS" },
    //     { id: 280, name: "0256AG-JS" },
    //     { id: 282, name: "0256BG-FS" },
    //     { id: 283, name: "0256BG-JS" },
    //     { id: 284, name: "0257AG-FS" },
    //     { id: 285, name: "SJ-24" },
    //     { id: 286, name: "SJ-26" },
    //     { id: 287, name: "SJ-28" },
    //     { id: 288, name: "0257AG-JS" },
    //     { id: 289, name: "SJ-30" },
    //     { id: 290, name: "SJ-32" },
    //     { id: 291, name: "SJ-34" },
    //     { id: 292, name: "SJ-36" },
    //     { id: 293, name: "SJ-2" },
    //     { id: 294, name: "SJ-4" },
    //     { id: 295, name: "SJ-6" },
    //     { id: 296, name: "SJ-8" },
    //     { id: 297, name: "SJ-10" },
    //     { id: 298, name: "SJ-12" },
    //     { id: 299, name: "SJ-14" },
    //     { id: 300, name: "SJ-16" },
    //     { id: 301, name: "SJ-18" },
    //     { id: 302, name: "SJ-20" },
    //     { id: 303, name: "SJ-22" },
    //     { id: 304, name: "0257BG-FS" },
    //     { id: 305, name: "0257BG-JS" },
    //     { id: 306, name: "0257CG-FS" },
    //     { id: 307, name: "0257CG-JS" },
    //     { id: 308, name: "0270AG-FS" },
    //     { id: 309, name: "0270AG-JS" },
    //     { id: 310, name: "0295AG-JS" },
    //     { id: 311, name: "0295BG-FS" },
    //     { id: 313, name: "0295BG-JS" },
    //     { id: 314, name: "0295CG-FS" },
    //     { id: 315, name: "0295CG-JS" },
    //     { id: 316, name: "0295DG-FS" },
    //     { id: 317, name: "0295DG-JS" },
    //     { id: 318, name: "0296AG-FS" },
    //     { id: 319, name: "0296AG-JS" },
    //     { id: 320, name: "0296BG-FS" },
    //     { id: 321, name: "SF-23" },
    //     { id: 322, name: "SF-25" },
    //     { id: 324, name: "SJ-23" },
    //     { id: 325, name: "0296BG-JS" },
    //     { id: 326, name: "SX-32" },
    //     { id: 327, name: "SX-34" },
    //     { id: 328, name: "SX-36" },
    //     { id: 329, name: "0310AG-FS" },
    //     { id: 330, name: "0310AG-JS" },
    //     { id: 331, name: "0310BG-FS" },
    //     { id: 333, name: "0310BG-JS" },
    //     { id: 334, name: "S1LQAG-JS" },
    //     { id: 335, name: "S1LQBG-FS" },
    //     { id: 336, name: "S1LQBG-JS" },
    //     { id: 337, name: "X1LQG-FS" },
    //     { id: 338, name: "X1LQG-JS" },
    //     { id: 342, name: "1#-J1" },
    //     { id: 343, name: "1#-J2" },
    //     { id: 344, name: "1#-X1" },
    //     { id: 345, name: "1#-X2" },
    //     { id: 346, name: "2#-J1" },
    //     { id: 347, name: "2#-J2" },
    //     { id: 348, name: "2#-X1" },
    //     { id: 349, name: "2#-X2" },
    //     { id: 350, name: "3#-J1" },
    //     { id: 351, name: "3#-J2" },
    //     { id: 352, name: "3#-X1" },
    //     { id: 353, name: "3#-X2" },
    //     { id: 354, name: "4#-J1" },
    //     { id: 355, name: "4#-J2" },
    //     { id: 356, name: "4#-X1" },
    //     { id: 357, name: "4#-X2" },
    //     { id: 358, name: "5#-J1" },
    //     { id: 359, name: "5#-J2" },
    //     { id: 360, name: "5#-X1" },
    //     { id: 361, name: "5#-X2" },
    //     { id: 363, name: "6#-J1" },
    //     { id: 364, name: "6#-J2" },
    //     { id: 365, name: "6#-X1" },
    //     { id: 366, name: "6#-X2" },
    //     { id: 367, name: "7#-J1" },
    //     { id: 368, name: "7#-J2" },
    //     { id: 369, name: "7#-X1" },
    //     { id: 371, name: "7#-X2" },
    //     { id: 372, name: "8#-J1" },
    //     { id: 373, name: "8#-J2" },
    //     { id: 374, name: "8#-X1" },
    //     { id: 375, name: "8#-X2" },
    //     { id: 376, name: "9#J1" },
    //     { id: 377, name: "9#J2" },
    //     { id: 378, name: "9#X1" },
    //     { id: 379, name: "9#X2" },
    //     { id: 380, name: "10#J1" },
    //     { id: 381, name: "10#J2" },
    //     { id: 382, name: "10#X1" },
    //     { id: 383, name: "10#X2" },
    //     { id: 384, name: "11#J1" },
    //     { id: 385, name: "11#J2" },
    //     { id: 387, name: "12#J1" },
    //     { id: 388, name: "12#J2" },
    //     { id: 389, name: "13#J1" },
    //     { id: 390, name: "13#J2" },
    //     { id: 392, name: "13#X1" },
    //     { id: 393, name: "13#X2" },
    //     { id: 394, name: "14#J1" },
    //     { id: 395, name: "14#J2" },
    //     { id: 396, name: "14#X1" },
    //     { id: 397, name: "14#X2" },
    //     { id: 399, name: "D2-XB-2" },
    //     { id: 401, name: "D4-HZ12" },
    //     { id: 402, name: "SN-XB-1" },
    //     { id: 403, name: "SN-XB-2" },
    //     { id: 404, name: "S-XB-1" },
    //     { id: 405, name: "S-XB-2" },
    //     { id: 406, name: "X-2" },
    //     { id: 407, name: "D6-HZ12" },
    //     { id: 408, name: "X3-XB-1" },
    //     { id: 409, name: "X3-XB-2" },
    //     { id: 411, name: "X-4" },
    //     { id: 412, name: "X4-XB-1" },
    //     { id: 414, name: "X4-XB-2" },
    //     { id: 415, name: "XII-XB-1" },
    //     { id: 416, name: "XII-XB-2" },
    //     { id: 417, name: "XI-XB-1" },
    //     { id: 419, name: "2#J1-XB-1" },
    //     { id: 420, name: "2#J2-HZ24" },
    //     { id: 422, name: "2#X1-HZ24" },
    //     { id: 423, name: "2#X2-HZ24" },
    //     { id: 425, name: "4#J1-XB-1" },
    //     { id: 426, name: "4#J2-HZ24" },
    //     { id: 427, name: "4#X1-HZ24" },
    //     { id: 428, name: "4#X2-HZ24" },
    //     { id: 429, name: "6#J1-XB-1" },
    //     { id: 431, name: "6#J2-HZ24" },
    //     { id: 432, name: "6#X1-HZ24" },
    //     { id: 434, name: "6#X2-HZ24" },
    //     { id: 435, name: "D-2" },
    //     { id: 436, name: "8#J1-XB-1" },
    //     { id: 437, name: "8#J2-HZ24" },
    //     { id: 439, name: "8#X1-HZ24" },
    //     { id: 440, name: "8#X2-HZ24" },
    //     { id: 441, name: "10#J1-XB-1" },
    //     { id: 443, name: "10#J2-HZ24" },
    //     { id: 444, name: "10#X1-HZ24" },
    //     { id: 445, name: "10#X2-HZ24" },
    //     { id: 446, name: "12#J1-XB-2" },
    //     { id: 447, name: "12#J2-HZ24" },
    //     { id: 448, name: "14#J1-XB-2" },
    //     { id: 450, name: "14#J2-HZ24" },
    //     { id: 451, name: "14#X1-XB-1" },
    //     { id: 452, name: "14#X2-HZ24" },
    //     { id: 453, name: "D-4" },
    //     { id: 454, name: "XX-1" },
    //     { id: 455, name: "XX-3" },
    //     { id: 456, name: "XX-5" },
    //     { id: 457, name: "XX-7" },
    //     { id: 458, name: "XX-9" },
    //     { id: 459, name: "XX-11" },
    //     { id: 460, name: "XX-13" },
    //     { id: 461, name: "XX-15" },
    //     { id: 462, name: "XX-17" },
    //     { id: 463, name: "XX-19" },
    //     { id: 464, name: "XX-21" },
    //     { id: 465, name: "XX-23" },
    //     { id: 466, name: "XF-10" },
    //     { id: 467, name: "XX-2" },
    //     { id: 468, name: "XX-4" },
    //     { id: 469, name: "XX-6" },
    //     { id: 470, name: "XX-8" },
    //     { id: 471, name: "XX-10" },
    //     { id: 472, name: "XX-12" },
    //     { id: 473, name: "XX-14" },
    //     { id: 474, name: "XX-16" },
    //     { id: 475, name: "XX-18" },
    //     { id: 476, name: "XX-20" },
    //     { id: 477, name: "XX-22" },
    //     { id: 478, name: "XX-24" },
    //     { id: 479, name: "XX-26" },
    //     { id: 480, name: "XX-28" },
    //     { id: 481, name: "XX-30" },
    //     { id: 482, name: "XX-32" },
    //     { id: 483, name: "1GJ-XB-1" },
    //     { id: 484, name: "2DGF-XB-1" },
    //     { id: 485, name: "2DGJ-XB-1" },
    //     { id: 486, name: "XF-1" },
    //     { id: 487, name: "XF-3" },
    //     { id: 488, name: "3GJ-XB-1" },
    //     { id: 489, name: "XF-5" },
    //     { id: 490, name: "XF-7" },
    //     { id: 491, name: "XF-9" },
    //     { id: 492, name: "XF-11" },
    //     { id: 493, name: "XF-13" },
    //     { id: 494, name: "4DGF-XB-1" },
    //     { id: 495, name: "XF-15" },
    //     { id: 496, name: "XF-17" },
    //     { id: 497, name: "XF-19" },
    //     { id: 498, name: "XF-21" },
    //     { id: 499, name: "4DGJ-XB-1" },
    //     { id: 501, name: "4GJ-XB-1" },
    //     { id: 502, name: "6-10DGF-XB-1" },
    //     { id: 503, name: "6-10DGJ-XB-1" },
    //     { id: 504, name: "8DGF-XB-1" },
    //     { id: 505, name: "8DGJ-XB-1" },
    //     { id: 506, name: "12DGF-XB-1" },
    //     { id: 507, name: "12DGJ-XB-1" },
    //     { id: 508, name: "14DG1J-XB-1" },
    //     { id: 510, name: "14DGF-XB-1" },
    //     { id: 511, name: "14DGJ-XB-2" },
    //     { id: 512, name: "G-2" },
    //     { id: 513, name: "G-4" },
    //     { id: 514, name: "G-6" },
    //     { id: 515, name: "IIBGF-XB-1" },
    //     { id: 516, name: "IIBGJ-XB-1" },
    //     { id: 517, name: "IIGJ-XB-1" },
    //     { id: 518, name: "XF-24" },
    //     { id: 519, name: "XF-26" },
    //     { id: 520, name: "XF-28" },
    //     { id: 521, name: "XF-30" },
    //     { id: 522, name: "XF-32" },
    //     { id: 523, name: "XF-34" },
    //     { id: 524, name: "XF-36" },
    //     { id: 525, name: "XF-38" },
    //     { id: 526, name: "XF-40" },
    //     { id: 527, name: "XF-2" },
    //     { id: 528, name: "XF-4" },
    //     { id: 529, name: "XF-6" },
    //     { id: 530, name: "XF-8" },
    //     { id: 531, name: "XF-10" },
    //     { id: 532, name: "XF-12" },
    //     { id: 533, name: "XF-14" },
    //     { id: 534, name: "XF-16" },
    //     { id: 535, name: "XF-18" },
    //     { id: 536, name: "XF-20" },
    //     { id: 537, name: "XF-22" },
    //     { id: 538, name: "XJ-1" },
    //     { id: 539, name: "XJ-3" },
    //     { id: 540, name: "XJ-5" },
    //     { id: 541, name: "XJ-7" },
    //     { id: 542, name: "XJ-9" },
    //     { id: 543, name: "XJ-11" },
    //     { id: 544, name: "XJ-13" },
    //     { id: 545, name: "XJ-15" },
    //     { id: 546, name: "XJ-17" },
    //     { id: 547, name: "XJ-19" },
    //     { id: 548, name: "XJ-21" },
    //     { id: 549, name: "XJ-23" },
    //     { id: 550, name: "XJ-24" },
    //     { id: 551, name: "XJ-26" },
    //     { id: 552, name: "XJ-28" },
    //     { id: 553, name: "XJ-30" },
    //     { id: 554, name: "XJ-32" },
    //     { id: 555, name: "XJ-34" },
    //     { id: 556, name: "XJ-36" },
    //     { id: 557, name: "XJ-38" },
    //     { id: 558, name: "XJ-2" },
    //     { id: 559, name: "XJ-4" },
    //     { id: 560, name: "XJ-6" },
    //     { id: 561, name: "XJ-8" },
    //     { id: 562, name: "XJ-10" },
    //     { id: 563, name: "XJ-12" },
    //     { id: 564, name: "XJ-14" },
    //     { id: 565, name: "XJ-16" },
    //     { id: 566, name: "XJ-18" },
    //     { id: 567, name: "XJ-20" },
    //     { id: 568, name: "XJ-22" },
    //     { id: 570, name: "D1" },
    //     { id: 571, name: "D3" },
    //     { id: 572, name: "X-1" },
    //     { id: 573, name: "XN-XB-1" },
    //     { id: 574, name: "XN-XB-2" },
    //     { id: 575, name: "X-XB-1" },
    //     { id: 576, name: "X-XB-2" },
    //     { id: 577, name: "D5" },
    //     { id: 578, name: "S1-XB-1" },
    //     { id: 579, name: "S1-XB-2" },
    //     { id: 580, name: "S3-XB-1" },
    //     { id: 581, name: "S3-XB-2" },
    //     { id: 582, name: "S4-XB-1" },
    //     { id: 583, name: "S4-XB-2" },
    //     { id: 584, name: "SⅡ-XB-1" },
    //     { id: 585, name: "SⅡ-XB-2" },
    //     { id: 586, name: "X-3" },
    //     { id: 587, name: "1J1-XB-1" },
    //     { id: 588, name: "1J2" },
    //     { id: 589, name: "1X1" },
    //     { id: 590, name: "1X2" },
    //     { id: 591, name: "3J1-XB-1" },
    //     { id: 592, name: "3J2" },
    //     { id: 593, name: "3X1" },
    //     { id: 594, name: "3X2" },
    //     { id: 595, name: "5J1-XB-1" },
    //     { id: 596, name: "5J1-XB-2" },
    //     { id: 597, name: "5J2" },
    //     { id: 598, name: "5X1" },
    //     { id: 599, name: "D-1" },
    //     { id: 600, name: "7J1-XB-1" },
    //     { id: 601, name: "7J2" },
    //     { id: 602, name: "7X1" },
    //     { id: 603, name: "9J1-XB-1" },
    //     { id: 604, name: "9J2" },
    //     { id: 605, name: "9X1" },
    //     { id: 606, name: "9X2" },
    //     { id: 607, name: "11-1-XB-2" },
    //     { id: 608, name: "11-2" },
    //     { id: 609, name: "13J1-XB-2" },
    //     { id: 610, name: "13X1" },
    //     { id: 611, name: "D-3" },
    //     { id: 612, name: "7X2" },
    //     { id: 613, name: "1AGF-XB-1" },
    //     { id: 614, name: "1AGJ-XB-1" },
    //     { id: 615, name: "1DGF-XB-1" },
    //     { id: 616, name: "1DGJ-XB-1" },
    //     { id: 617, name: "1GF-XB-1" },
    //     { id: 618, name: "3DGF-XB-1" },
    //     { id: 619, name: "3DGJ-XB-1" },
    //     { id: 620, name: "3GF-XB-1" },
    //     { id: 621, name: "4GF-XB-1" },
    //     { id: 622, name: "5-9DGF-XB-1" },
    //     { id: 623, name: "5-9DGJ-XB-1" },
    //     { id: 624, name: "7DGF-XB-1" },
    //     { id: 625, name: "7DGJ-XB-1" },
    //     { id: 626, name: "11DGF-XB-1" },
    //     { id: 627, name: "11DGJ-XB-1" },
    //     { id: 628, name: "13DG1F-XB-1" },
    //     { id: 629, name: "13DGF-XB-1" },
    //     { id: 630, name: "13DGJ-XB-1" },
    //     { id: 631, name: "ⅡGF" },
    //     { id: 632, name: "G-1" },
    //     { id: 633, name: "G-3" },
    //     { id: 634, name: "G-5" },
    //     { id: 635, name: "G-7" },
    //     { id: 636, name: "电源屏" },
    //     { id: 637, name: "UPS" },
    //     { id: 638, name: "计算机联锁" },
    //     { id: 639, name: "CTC" },
    //     { id: 640, name: "集中监测" },
    //     { id: 641, name: "区间综合监控系统" },
    //     { id: 642, name: "道岔缺口监测系统" },
    //     { id: 643, name: "分线柜配线表" },
    //     { id: 644, name: "接口柜配线表" },
    //     { id: 645, name: "1#" },
    //     { id: 646, name: "2#" },
    //     { id: 647, name: "3#" },
    //     { id: 648, name: "4#" },
    //     { id: 649, name: "5#" },
    //     { id: 650, name: "6#" },
    //     { id: 651, name: "7#" },
    //     { id: 652, name: "8#" },
    //     { id: 653, name: "9#" },
    //     { id: 654, name: "10#" },
    //     { id: 655, name: "11#" },
    //     { id: 656, name: "12#" },
    //     { id: 657, name: "13#" },
    //     { id: 658, name: "14#" },
    //   ];

    //   for (let i = 0; i < list.length; i++) {
    //     for (var t = new Date().getTime(); new Date().getTime() - t <= 700; );

    //     console.log("下载" + i);
    //     this.urlValue = "http://train.wistechx.cn/1?" + list[i].id;
    //     this.qrcodeText = list[i].name;
    //     //生成前先清空二维码
    //     // this.$nextTick(() => {
    //     document.getElementById("qrcode3").innerHTML = "";
    //     console.log(document.getElementById("qrcode3"));
    //     console.log(this.$refs.qrcode3);
    //     // this.$refs.qrcode3.innerHTML = "";
    //     this.qrcode = new QRCode(document.getElementById("qrcode3"), {
    //       width: 1000, // 宽
    //       height: 1000, //高
    //       text: this.urlValue, //生成二维码的内容
    //       render: "canvas", //设置渲染方式（canvas,table 默认canvas）
    //       correctLevel:
    //         this.qrcodeText !== ""
    //           ? QRCode.CorrectLevel.Q
    //           : QRCode.CorrectLevel.L, //二维码纠错级别（L,M,Q,H）
    //     });
    //     let canvasData = document
    //       .getElementById("qrcode3")
    //       .getElementsByTagName("canvas");
    //     console.log(canvasData);
    //     if (this.qrcodeText !== "") {
    //       let chr = this.qrcodeText.split("");
    //       let temp = "";
    //       let row = [];
    //       let context = canvasData[0].getContext("2d");
    //       // context.fillStyle = "rgb(0,177,253)";
    //       context.fillStyle = "#fff";
    //       // context.fillRect(350, 350, 300, 300);
    //       CanvasRenderingContext2D.prototype.roundRect = function(
    //         x,
    //         y,
    //         w,
    //         h,
    //         r
    //       ) {
    //         if (w < 2 * r) r = w / 2;
    //         if (h < 2 * r) r = h / 2;
    //         this.beginPath();
    //         this.moveTo(x + r, y);
    //         this.arcTo(x + w, y, x + w, y + h, r);
    //         this.arcTo(x + w, y + h, x, y + h, r);
    //         this.arcTo(x, y + h, x, y, r);
    //         this.arcTo(x, y, x + w, y, r);
    //         this.closePath();
    //         return this;
    //       };
    //       // context.fillRect(350, 350, 300, 300);
    //       context.lineWidth = 10;
    //       // context.strokeStyle = "rgb(0,177,253)";
    //       context.strokeStyle = "#fff";
    //       context.roundRect(350, 350, 300, 300, 20).stroke();
    //       context.fill();
    //       let len = this.qrcodeText.replace(/[^\xoo-\xff]/g, "01").length;
    //       console.log(len);
    //       if (len == 2 || len == 4) {
    //         context.font = "bold 14rem '楷体'";
    //       } else if (len == 6 || len == 10 || len == 12) {
    //         context.font = "bold 7rem '楷体'";
    //       } else if (len == 8) {
    //         context.font = "bold 8rem '楷体'";
    //       } else if (len == 14 || len == 16 || len == 18) {
    //         context.font = "bold 6rem '楷体'";
    //       } else {
    //         context.font = "bold 5rem '楷体'";
    //       }
    //       context.textAlign = "center";
    //       context.textBaseline = "top";
    //       context.fillStyle = "#000";
    //       let height01 = 0;
    //       // context.fillText(this.qrcodeText, 500, 550);
    //       for (let a = 0; a < chr.length; a++) {
    //         if (context.measureText(temp).width < 250) {
    //           console.log("00000");
    //           height01 =
    //             context.measureText(temp).fontBoundingBoxAscent +
    //             context.measureText(temp).fontBoundingBoxDescent;
    //         } else {
    //           console.log(context.measureText(temp));
    //           height01 =
    //             context.measureText(temp).fontBoundingBoxAscent +
    //             context.measureText(temp).fontBoundingBoxDescent;
    //           row.push(temp);
    //           temp = "";
    //         }
    //         temp += chr[a];
    //       }
    //       row.push(temp);
    //       for (let b = 0; b < row.length; b++) {
    //         let y = 0;
    //         // y = (300 - row.length * 35) / 2 + 350 + b * 35;
    //         y = (1000 - row.length * height01) / 2 + b * height01;
    //         console.log(y);
    //         console.log(row.length); //300 + (b + 1) * 35
    //         context.fillText(row[b], 500, y, 250);
    //       }
    //     }
    //     let imgData = canvasData[0].toDataURL("image/png"); // 获得图片base64
    //     if (window.navigator.msSaveOrOpenBlob) {
    //       //IE浏览器：创建blob对象
    //       console.log(imgData);
    //       let bstr = atob(imgData.split(",")[1]);
    //       let n = bstr.length;
    //       let u8arr = new Uint8Array(n);
    //       while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //       }
    //       let blob = new Blob([u8arr]);
    //       window.navigator.msSaveOrOpenBlob(
    //         blob,
    //         this.qrcodeText + "." + "png"
    //       );
    //     } else {
    //       // 非ie浏览器
    //       let a = document.createElement("a");
    //       a.href = imgData;
    //       a.download = this.qrcodeText;
    //       a.click();
    //     }
    //     // });
    //   }
    // },

    // 删除文档
    deteleWord(row) {
      this.deleteWordDetails = row;
      this.dialogDeleteWordVisible = true;
    },
    // 确定
    deteleWordSure() {
      this.$axios
        .post(this.$store.state.baseUrl + "/ruleDelete", {
          id: this.deleteWordDetails.id,
        })
        .then((res) => {
          console.log("删除文档");
          console.log(res);
          this.$message.success({
            message: "删除成功",
            showClose: true,
            duration: 2000,
          });
          this.dialogDeleteWordVisible = false;
          this.wordCheck();
        })
        .catch((err) => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
          this.dialogDeleteWordVisible = false;
        });
    },
    // 修改文档
    updateWord(row) {
      console.log(row);
      this.updateWordDetails = row;
      this.wordForm.name = "";
      this.imgurls = [];
      if (
        this.updateWordDetails.wid == "" ||
        this.updateWordDetails.wid == null
      ) {
        this.wordForm.wid = "";
      } else {
        this.wordForm.wid = this.updateWordDetails.wid;
      }

      this.wordForm.name = this.updateWordDetails.name;
      this.wordForm.jobNumber = this.updateWordDetails.jobNumber;
      this.dialogUpdateWordVisible = true;
      if (
        this.updateWordDetails.url !== null &&
        this.updateWordDetails.url !== ""
      ) {
        if (this.updateWordDetails.url.indexOf("|") !== -1) {
          this.imgurls = this.updateWordDetails.url.split("|");
        } else {
          this.imgurls.push(this.updateWordDetails.url);
        }
      } else {
        this.imgurls = [];
      }
      console.log(this.imgurls);
    },
    // 确定
    updateWordSure() {
      this.$axios
        .post(this.$store.state.baseUrl + "/ruleSave", {
          id: this.updateWordDetails.id,
          wid: this.wordForm.wid,
          name: this.wordForm.name,
          url: this.imgurls.join("|"),
          jobNumber: this.wordForm.jobNumber,
        })
        .then((res) => {
          console.log("修改文档");
          console.log(res);
          this.$message.success({
            message: "修改成功",
            showClose: true,
            duration: 2000,
          });
          this.dialogUpdateWordVisible = false;
          this.wordCheck();
        })
        .catch((err) => {
          console.log(err);
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
          this.dialogUpdateWordVisible = false;
        });
    },
    // 修改时文档直接下载
    downWord(imgurl) {
      console.log(imgurl);
      let eurl = this.$store.state.baseUrl + "/file/" + imgurl;
      console.log(eurl);
      if (this.imgType1.indexOf(imgurl.split(".")[1]) == -1) {
        window.location.href = eurl;
      } else {
        window.open(eurl);
      }
    },
    // 文件预览
    imgFilter(url) {
      if (this.imgType1.indexOf(url.split(".")[1]) !== -1) {
        return this.img + "/file/" + url;
      } else if (url.split(".")[1].indexOf("pptx") !== -1) {
        return this.imgTypeImg1;
      } else if (this.imgType2.indexOf(url.split(".")[1]) !== -1) {
        return this.imgTypeImg2;
      } else if (url.split(".")[1].indexOf("pdf") !== -1) {
        return this.imgTypeImg3;
      } else if (this.imgType3.indexOf(url.split(".")[1]) !== -1) {
        return this.imgTypeImg4;
      }
    },
    // 二维码预览
    qrcodeLook(row) {
      console.log(row);
      this.qrcodeText = "";
      // this.urlValue = "http://192.168.0.120:8082/#/img/" + row.id + "/0011";
      // this.urlValue = "http://train.wistechx.cn/1?" + row.id;
      this.urlValue = "https://wistechx.cn/1?A" + row.id;

      this.dialogQrcodeLookVisible = true;

      this.$nextTick(() => {
        document.getElementById("qrcode").innerHTML = "";
        this.createQr();
      });
    },
    // 生成二维码
    createQr() {
      //生成前先清空二维码
      console.log(document.getElementById("qrcode"));

      // console.log(this.$refs.qrcode);
      this.$refs.qrcode.innerHTML = "";
      this.qrcode = new QRCode(this.$refs.qrcode, {
        width: 200, // 宽
        height: 200, //高
        text: this.urlValue, //生成二维码的内容
        render: "canvas", //设置渲染方式（canvas,table 默认canvas）
        correctLevel:
          this.qrcodeText !== ""
            ? QRCode.CorrectLevel.Q
            : QRCode.CorrectLevel.L, //二维码纠错级别（L,M,Q,H）
      });
      console.log(document.getElementById("qrcode"));

      let canvasData = this.$refs.qrcode.getElementsByTagName("canvas");
      console.log(canvasData);

      if (this.qrcodeText !== "") {
        let chr = this.qrcodeText.split("");
        let temp = "";
        let row = [];
        let context = canvasData[0].getContext("2d");
        context.scale(0.2, 0.2);

        // context.fillStyle = "rgb(0,177,253)";
        context.fillStyle = "#fff";
        // context.fillRect(350, 350, 300, 300);
        CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
          if (w < 2 * r) r = w / 2;
          if (h < 2 * r) r = h / 2;
          this.beginPath();
          this.moveTo(x + r, y);
          this.arcTo(x + w, y, x + w, y + h, r);
          this.arcTo(x + w, y + h, x, y + h, r);
          this.arcTo(x, y + h, x, y, r);
          this.arcTo(x, y, x + w, y, r);
          this.closePath();
          return this;
        };
        // context.fillRect(350, 350, 300, 300);
        context.lineWidth = 10;
        // context.strokeStyle = "rgb(0,177,253)";
        context.strokeStyle = "#fff";
        context.roundRect(350, 350, 300, 300, 20).stroke();
        context.fill();

        let len = this.qrcodeText.replace(/[^\xoo-\xff]/g, "01").length;
        console.log(len);
        if (len == 2 || len == 4) {
          context.font = "bold 14rem '楷体'";
        } else if (len == 6 || len == 10 || len == 12) {
          context.font = "bold 7rem '楷体'";
        } else if (len == 8) {
          context.font = "bold 8rem '楷体'";
        } else if (len == 14 || len == 16 || len == 18) {
          context.font = "bold 6rem '楷体'";
        } else {
          context.font = "bold 5rem '楷体'";
        }
        context.textAlign = "center";
        context.textBaseline = "top";

        context.fillStyle = "#000";
        let height01 = 0;
        // context.fillText(this.qrcodeText, 500, 550);

        const userAgent = navigator.userAgent.toLocaleLowerCase();
        console.log("浏览器");
        console.log(userAgent);

        for (let a = 0; a < chr.length; a++) {
          if (context.measureText(temp).width < 250) {
            console.log("00000");
            console.log(context.measureText(temp));

            if (userAgent.match(/chrome/) != null) {
              if (userAgent.match(/wow64/) != null) {
                console.log("360");
                height01 =
                  context.measureText(temp).actualBoundingBoxAscent +
                  context.measureText(temp).actualBoundingBoxDescent;
              } else {
                console.log("谷歌");
                height01 =
                  context.measureText(temp).fontBoundingBoxAscent +
                  context.measureText(temp).fontBoundingBoxDescent;
              }
            } else {
              this.$message.error({
                message:
                  "当前浏览器不支持，请使用最新版的谷歌浏览器或360浏览器极速模式",
                showClose: true,
                duration: 3000,
              });
              return;
            }
          } else {
            console.log(context.measureText(temp));
            if (userAgent.match(/chrome/) != null) {
              if (userAgent.match(/wow64/) != null) {
                console.log("360");
                height01 =
                  context.measureText(temp).actualBoundingBoxAscent +
                  context.measureText(temp).actualBoundingBoxDescent;
              } else {
                console.log("谷歌");
                height01 =
                  context.measureText(temp).fontBoundingBoxAscent +
                  context.measureText(temp).fontBoundingBoxDescent;
              }
            } else {
              this.$message.error({
                message:
                  "当前浏览器不支持，请使用最新版的谷歌浏览器或360浏览器极速模式",
                showClose: true,
                duration: 3000,
              });
              return;
            }
            row.push(temp);
            temp = "";
          }
          temp += chr[a];
        }

        row.push(temp);

        for (let b = 0; b < row.length; b++) {
          let y = 0;
          // y = (300 - row.length * 35) / 2 + 350 + b * 35;
          y = (985 - row.length * height01) / 2 + b * height01;
          console.log(y);
          console.log(row.length); //300 + (b + 1) * 35
          context.fillText(row[b], 495, y, 250);
        }
      }
    },
    // 生成图片并下载
    createPicture() {
      //生成前先清空二维码
      this.$nextTick(() => {
        document.getElementById("qrcode2").innerHTML = "";
        console.log(document.getElementById("qrcode2"));
        console.log(this.$refs.qrcode2);
        // this.$refs.qrcode2.innerHTML = "";
        this.qrcode = new QRCode(document.getElementById("qrcode2"), {
          width: 1000, // 宽
          height: 1000, //高
          text: this.urlValue, //生成二维码的内容
          render: "canvas", //设置渲染方式（canvas,table 默认canvas）
          correctLevel:
            this.qrcodeText !== ""
              ? QRCode.CorrectLevel.Q
              : QRCode.CorrectLevel.L, //二维码纠错级别（L,M,Q,H）
        });

        let canvasData = document
          .getElementById("qrcode2")
          .getElementsByTagName("canvas");
        console.log(canvasData);

        if (this.qrcodeText !== "") {
          let chr = this.qrcodeText.split("");
          let temp = "";
          let row = [];
          let context = canvasData[0].getContext("2d");

          // context.fillStyle = "rgb(0,177,253)";
          context.fillStyle = "#fff";
          // context.fillRect(350, 350, 300, 300);
          CanvasRenderingContext2D.prototype.roundRect = function(
            x,
            y,
            w,
            h,
            r
          ) {
            if (w < 2 * r) r = w / 2;
            if (h < 2 * r) r = h / 2;
            this.beginPath();
            this.moveTo(x + r, y);
            this.arcTo(x + w, y, x + w, y + h, r);
            this.arcTo(x + w, y + h, x, y + h, r);
            this.arcTo(x, y + h, x, y, r);
            this.arcTo(x, y, x + w, y, r);
            this.closePath();
            return this;
          };
          // context.fillRect(350, 350, 300, 300);
          context.lineWidth = 10;
          // context.strokeStyle = "rgb(0,177,253)";
          context.strokeStyle = "#fff";
          context.roundRect(350, 350, 300, 300, 20).stroke();
          context.fill();

          let len = this.qrcodeText.replace(/[^\xoo-\xff]/g, "01").length;
          console.log(len);
          if (len == 2 || len == 4) {
            context.font = "bold 14rem '楷体'";
          } else if (len == 6 || len == 10 || len == 12) {
            context.font = "bold 7rem '楷体'";
          } else if (len == 8) {
            context.font = "bold 8rem '楷体'";
          } else if (len == 14 || len == 16 || len == 18) {
            context.font = "bold 6rem '楷体'";
          } else {
            context.font = "bold 5rem '楷体'";
          }
          context.textAlign = "center";
          context.textBaseline = "top";

          context.fillStyle = "#000";

          const userAgent = navigator.userAgent.toLocaleLowerCase();

          let height01 = 0;
          // context.fillText(this.qrcodeText, 500, 550);
          for (let a = 0; a < chr.length; a++) {
            if (context.measureText(temp).width < 250) {
              console.log("00000");
              if (userAgent.match(/chrome/) != null) {
                if (userAgent.match(/wow64/) != null) {
                  console.log("360");
                  height01 =
                    context.measureText(temp).actualBoundingBoxAscent +
                    context.measureText(temp).actualBoundingBoxDescent;
                } else {
                  console.log("谷歌");
                  height01 =
                    context.measureText(temp).fontBoundingBoxAscent +
                    context.measureText(temp).fontBoundingBoxDescent;
                }
              } else {
                this.$message.error({
                  message:
                    "当前浏览器不支持，请使用最新版的谷歌浏览器或360浏览器极速模式",
                  showClose: true,
                  duration: 3000,
                });
                return;
              }
            } else {
              console.log(context.measureText(temp));
              if (userAgent.match(/chrome/) != null) {
                if (userAgent.match(/wow64/) != null) {
                  console.log("360");
                  height01 =
                    context.measureText(temp).actualBoundingBoxAscent +
                    context.measureText(temp).actualBoundingBoxDescent;
                } else {
                  console.log("谷歌");
                  height01 =
                    context.measureText(temp).fontBoundingBoxAscent +
                    context.measureText(temp).fontBoundingBoxDescent;
                }
              } else {
                this.$message.error({
                  message:
                    "当前浏览器不支持，请使用最新版的谷歌浏览器或360浏览器极速模式",
                  showClose: true,
                  duration: 3000,
                });
                return;
              }
              row.push(temp);
              temp = "";
            }
            temp += chr[a];
          }

          row.push(temp);

          for (let b = 0; b < row.length; b++) {
            let y = 0;

            // y = (1000 - row.length * height01) / 2 + b * height01;
            // context.fillText(row[b], 500, y, 250);

            y = (985 - row.length * height01) / 2 + b * height01;
            context.fillText(row[b], 495, y, 250);
          }
        }

        let imgData = canvasData[0].toDataURL("image/png"); // 获得图片base64

        if (window.navigator.msSaveOrOpenBlob) {
          //IE浏览器：创建blob对象
          console.log(imgData);
          let bstr = atob(imgData.split(",")[1]);
          let n = bstr.length;
          let u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          let blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(blob, "二维码" + "." + "png");

          this.dialogQrcodeLookVisible = false;
        } else {
          // 非ie浏览器
          let a = document.createElement("a");
          a.href = imgData;
          a.download = "二维码";
          a.click();

          this.dialogQrcodeLookVisible = false;
        }
      });
    },
    // 新建文档
    addWord() {
      console.log(sessionStorage.getItem("widValue"));
      if (
        sessionStorage.getItem("widValue") == "" ||
        sessionStorage.getItem("widValue") == null
      ) {
        this.wordForm.wid = "";
      } else {
        this.wordForm.wid = Number(sessionStorage.getItem("widValue"));
      }

      this.wordForm.name = "";
      this.imgurls = [];
      this.dialogAddWordVisible = true;
    },
    // 确定
    addWordSure() {
      console.log(this.wordForm.name);
      if (this.wordForm.name !== "" && this.imgurls.length !== 0) {
        this.$axios
          .post(this.$store.state.baseUrl + "/ruleSave", {
            wid: this.wordForm.wid,
            name: this.wordForm.name,
            url: this.imgurls.join("|"),
            jobNumber: this.wordForm.jobNumber,
          })
          .then((res) => {
            console.log("上传文档");
            console.log(res);
            this.$message.success({
              message: "文档上传成功",
              showClose: true,
              duration: 2000,
            });
            this.dialogAddWordVisible = false;
            this.time = "";
            this.keyword = "";
            this.handleCurrentChange(1);
          })
          .catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000,
            });
            this.dialogAddWordVisible = false;
          });
      } else {
        this.$message.error({
          message: "数据不能为空",
          showClose: true,
          duration: 2000,
        });
      }
    },
    // 上传文件
    inputChange(e) {
      console.log(this.imgurls);
      let file = e.target.files[0];
      console.log(file);
      if (file !== undefined) {
        if (this.wordTypeList.indexOf(file.type) == -1) {
          this.$message.error({
            message:
              "文件类型错误，仅可上传图片、word、Excel、PPT、PDF等格式文件",
            showClose: true,
            duration: 2000,
          });
          return;
        }
        // 已上传的文件是图片，并且新上传的不是图片
        if (
          this.imgurls.length !== 0 &&
          this.imgType1.indexOf(this.imgurls[0].split(".")[1]) !== -1 &&
          file.type.indexOf("image") == -1
        ) {
          this.$message.warning({
            message: "文件类型唯一，不可混合上传",
            showClose: true,
            duration: 2000,
          });
          return;
        } else if (
          this.imgurls.length !== 0 &&
          this.imgType2.indexOf(this.imgurls[0].split(".")[1]) !== -1 &&
          file.type.indexOf(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) == -1
        ) {
          this.$message.warning({
            message: "文件类型唯一，不可混合上传",
            showClose: true,
            duration: 2000,
          });
          return;
        } else if (
          this.imgurls.length !== 0 &&
          this.imgType3.indexOf(this.imgurls[0].split(".")[1]) !== -1 &&
          file.type.indexOf(
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) == -1
        ) {
          this.$message.warning({
            message: "文件类型唯一，不可混合上传",
            showClose: true,
            duration: 2000,
          });
          return;
        }
        if (this.imgurls.length !== 0 && file.name.split(".")[1] == "pdf") {
          if (
            this.imgurls.length !== 0 &&
            file.name.split(".")[1] !== this.imgurls[0].split(".")[1]
          ) {
            this.$message.warning({
              message: "文件类型唯一，不可混合上传",
              showClose: true,
              duration: 2000,
            });
            return;
          }
        } else if (
          this.imgurls.length !== 0 &&
          file.name.split(".")[1] == "pptx"
        ) {
          if (
            this.imgurls.length !== 0 &&
            file.name.split(".")[1] !== this.imgurls[0].split(".")[1]
          ) {
            this.$message.warning({
              message: "文件类型唯一，不可混合上传",
              showClose: true,
              duration: 2000,
            });
            return;
          }
        }
        if (
          this.imgurls.length !== 0 &&
          this.imgType1.indexOf(this.imgurls[0].split(".")[1]) == -1
        ) {
          this.$message.warning({
            message: "非图片文件只可上传一个",
            showClose: true,
            duration: 2000,
          });
        } else {
          this.uploadLice(file);
        }
      }
    },
    //  返回file文件，调用接口执行上传
    uploadLice(file) {
      console.log(file);
      let formdata = new FormData(); //创建form对象
      formdata.append("file", file); //通过append向form对象添加数据
      this.uploadImg(formdata);
    },
    uploadImg(formdata) {
      this.$axios
        .post(this.$store.state.baseUrl + "/upload", formdata)
        .then((res) => {
          if (res.status == 200) {
            this.$message.success({
              message: "文件上传成功",
              showClose: true,
              duration: 2000,
            });
          }
          console.log(res);
          let imgurl = res.data.fileName;
          if (this.imgurls.indexOf(imgurl) == -1) {
            this.imgurls.push(imgurl);
          }
          console.log(this.imgurls);
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
        });
    },
    // 删除图片
    delImage(index) {
      this.imgurls.splice(index, 1);
      this.$refs.uploadImgRef.value = "";
    },
    // 获取站列表
    getStationList() {
      this.$axios
        .post(this.$store.state.baseUrl + "/stationList")
        .then((res) => {
          console.log("站列表");
          console.log(res);
          this.stationList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 模糊搜索文档
    wordCheck() {
      console.log(this.time);
      this.$axios
        .post(this.$store.state.baseUrl + "/ruleList", {
          wid: this.station,
          startTime: this.time == null ? "" : this.time[0],
          endTime: this.time == null ? "" : this.time[1],
          keyword: this.keyword,
          page: this.page,
          pageNum: this.pageNum,
        })
        .then((res) => {
          console.log("文档列表");
          console.log(res);
          this.wordList = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      (function smoothscroll() {
        let currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
      this.wordCheck();
    },
  },
};
</script>

<style lang="scss" scoped>
.word-admin-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;

  .upload-imgs {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    display: flex;

    .imgCheck {
      width: 100px;
      height: 100px;
      margin-left: 10px;
      position: relative;
      cursor: pointer;

      img {
        width: 100%;
      }
    }

    .add {
      width: 100px;
      height: 100px;
      position: relative;
      border: 1px solid #ddd;
      border-radius: 5px;
      display: flex;

      .addIcon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 45%;
        left: 45%;
        z-index: 1;
      }

      .inputUpload {
        position: absolute;
        display: block;
        width: 100px;
        height: 100px;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
    }

    .spanStyle {
      width: 15px;
      height: 15px;
      position: absolute;
      top: 1px;
      right: 1px;
      text-align: center;
      line-height: 1;
      background-color: rgb(221, 221, 221);
      color: rgb(255, 255, 255);
      border: 1px solid rgb(221, 221, 221);
      border-radius: 50%;
      z-index: 999;
      cursor: pointer;
    }

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  .qr_img {
    //图片有白边填充css
    display: inline-block;
    width: 200px;
    height: 200px;

    img {
      width: 200px;
      height: 200px;
      background-color: #fff; //设置白色背景色
      padding: 6px; // 利用padding的特性，挤出白边
    }
  }
}
</style>
