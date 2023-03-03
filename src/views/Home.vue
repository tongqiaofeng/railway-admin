<template>
  <div class="home-container" id="home-container" @click="otherClick">
    <el-container ref="homePage">
      <el-header height="78px">
        <div class="main-top-right">
          <div class="left-con">
            <p class="left-font-one">玉磨铁路</p>
            <p class="left-font-line"></p>
            <p class="left-font-two">备件智能管理系统</p>
          </div>
          <div style="display: flex;">
            <div class="right-div" @click="updateUserClick">
              <span class="span1">{{ userNick }}</span>
              <div class="span-img">
                <img
                  src="../assets/imgs/home/down.png"
                  style="width: 15px;margin-left: 10px;"
                  class="span-img"
                />
              </div>
            </div>
            <div @click="warehouseWarn" class="loginoutDiv">
              <img
                class="loginout"
                title="实时报警"
                src="../assets/imgs/home/warn.png"
              />
              <div class="warnNum">
                <span>{{ total > 99 ? "99+" : total }}</span>
              </div>
            </div>
            <el-drawer
              title="实时报警"
              :visible.sync="drawer"
              direction="rtl"
              size="860px"
            >
              <el-table :data="warnListPage" style="width: 100%">
                <el-table-column label="报警仓库">
                  <template slot-scope="scope">
                    <div>
                      <p
                        :style="{
                          color: scope.row.flag == 0 ? 'red' : '#3d81fd',
                          margin: 0,
                        }"
                      >
                        {{ scope.row.warehouseName }}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="报警内容" width="300px">
                  <template slot-scope="scope">
                    <div>
                      <p
                        :style="{
                          color: scope.row.flag == 0 ? 'red' : '#3d81fd',
                          margin: 0,
                        }"
                      >
                        {{ scope.row.note }}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="报警时间" width="160px">
                  <template slot-scope="scope">
                    <div>
                      <p
                        :style="{
                          color: scope.row.flag == 0 ? 'red' : '#3d81fd',
                          margin: 0,
                        }"
                      >
                        {{ scope.row.time }}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作人">
                  <template slot-scope="scope">
                    <div>
                      <span
                        :style="{
                          color: scope.row.flag == 0 ? 'red' : '#3d81fd',
                        }"
                        >{{
                          scope.row.name == "" ? "暂未处理" : scope.row.name
                        }}</span
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <div>
                      <span
                        :style="{
                          color: scope.row.flag == 0 ? 'red' : '#3d81fd',
                        }"
                        >{{
                          scope.row.flag == 0
                            ? "报警"
                            : scope.row.flag == 1
                            ? "处理中"
                            : "处理完成"
                        }}</span
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        v-if="scope.row.flag == 0"
                        type="text"
                        @click="warnDispose(scope.row)"
                        style="color: red;"
                        >确认</el-button
                      >
                      <el-dialog
                        title="处理报警"
                        :visible.sync="dialogWarnVisible"
                        :close-on-press-escape="false"
                        :close-on-click-modal="false"
                        :append-to-body="true"
                      >
                        <div style="text-align: center;">
                          <p style="font-size: 16px;">确定处理该报警？</p>
                        </div>
                        <div slot="footer">
                          <el-button @click="dialogWarnVisible = false"
                            >取 消</el-button
                          >
                          <el-button
                            type="primary"
                            @click="warnDisposeSure"
                            v-preventClick
                            >确 定</el-button
                          >
                        </div>
                      </el-dialog>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div style="width: 100%;height: 50px;">
                <div style="margin:15px 0;position:absolute;right:6%;">
                  <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    layout="total, prev, pager, next, jumper"
                    :total="total"
                  >
                  </el-pagination>
                </div>
              </div>
            </el-drawer>
          </div>
          <div class="downbtn" v-if="updateUser == 1">
            <ul class="updateUl">
              <li class="updateLi1">
                <div class="updateP" @click="pswUpdate">
                  <div class="nick-img">
                    <div class="update-nick-img" style="display: flex;">
                      <div style="margin-top: 3px;">
                        <img
                          src="../assets/imgs/update-psw.png"
                          style="width: 17px;height: 20px;"
                        />
                      </div>
                      <span class="span-psw">修改密码</span>
                    </div>
                  </div>
                </div>
                <el-dialog
                  class="uuupdate"
                  title="修改密码"
                  :visible.sync="pswDialogVisible"
                  :append-to-body="true"
                  :close-on-press-escape="false"
                  :close-on-click-modal="false"
                >
                  <div style="width:100%;display:flex;">
                    <p class="font">旧密码：</p>
                    <input
                      class="update-nick"
                      type="text"
                      v-model="oldPsw"
                      placeholder="请输入旧密码"
                    />
                  </div>
                  <div style="width:100%;margin-top:15px;display:flex;">
                    <p class="font">新密码：</p>
                    <input
                      class="update-nick"
                      type="text"
                      v-model="newPsw"
                      placeholder="请输入新密码"
                    />
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button
                      @click="pswDialogVisible = false"
                      style="margin-left: 35%;"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="updatePsw" v-preventClick
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </li>
              <li class="updateLi1">
                <div class="updateP" @click="logOut">
                  <div class="psw-img">
                    <div class="update-nick-img" style="display: flex;">
                      <div style="margin-top: 3px;">
                        <img
                          src="../assets/imgs/logOut.png"
                          style="width: 17px;height: 18px;"
                        />
                      </div>
                      <span>退出登录</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="218px">
          <ul class="aside-ul-dad">
            <li class="dad-li">
              <div style="width: 100%;">
                <p class="dad-li-font">查询统计</p>
              </div>
              <ul class="aside-ul-son">
                <li
                  class="son-li"
                  @click="checkedPage01"
                  :style="{
                    backgroundColor:
                      pageSelect == 1 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 1"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 1 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/01.png"
                      />
                    </div>
                    <p class="center-font">库存查询</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li
              style="width: 100%;height: 1px;margin-top: 20px;background-color: #262e3d;"
            ></li>
            <li class="dad-li" style="margin-top: 20px;">
              <div style="width: 100%;">
                <p class="dad-li-font">我的库存</p>
              </div>
              <ul class="aside-ul-son">
                <li
                  class="son-li"
                  @click="checkedPage02"
                  :style="{
                    backgroundColor:
                      pageSelect == 2 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 2"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 2 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/02.png"
                      />
                    </div>
                    <p class="center-font">库存管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  @click="checkedPage03"
                  :style="{
                    backgroundColor:
                      pageSelect == 3 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 3"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 3 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/03.png"
                      />
                    </div>
                    <p class="center-font">用量统计</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  @click="checkedPage04"
                  :style="{
                    backgroundColor:
                      pageSelect == 4 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 4"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 4 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/04.png"
                      />
                    </div>
                    <p class="center-font">入库管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  @click="checkedPage05"
                  :style="{
                    backgroundColor:
                      pageSelect == 5 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 5"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 5 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/05.png"
                      />
                    </div>
                    <p class="center-font">出库管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li
              v-if="apply == 1 || approve == 1"
              style="width: 100%;height: 1px;margin-top: 20px;background-color: #262e3d;"
            ></li>
            <li
              v-if="apply == 1 || approve == 1"
              class="dad-li"
              style="margin-top: 20px;"
            >
              <div style="width: 100%;">
                <p class="dad-li-font">备件采购</p>
              </div>
              <ul class="aside-ul-son">
                <li
                  v-if="apply == 1"
                  class="son-li"
                  @click="checkedPage09"
                  :style="{
                    backgroundColor:
                      pageSelect == 9 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 9"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 9 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/09.png"
                      />
                    </div>
                    <p class="center-font">采购申请</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  v-if="approve == 1"
                  class="son-li"
                  @click="checkedPage10"
                  :style="{
                    backgroundColor:
                      pageSelect == 10 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 10"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 10 ? '-28px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/10.png"
                      />
                    </div>
                    <p class="center-font">采购审批</p>
                    <p
                      class="circle"
                      style="margin-top: 10px;margin-left: 2px;"
                      v-if="circleHidden == 0"
                    ></p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
              </ul>
            </li>
            <li
              style="width: 100%;height: 1px;margin-top: 20px;background-color: #262e3d;"
            ></li>
            <li class="dad-li" style="margin-top: 20px;">
              <div style="width: 100%;">
                <p class="dad-li-font">系统设置</p>
              </div>
              <ul class="aside-ul-son">
                <li
                  class="son-li"
                  @click="checkedPage06"
                  :style="{
                    backgroundColor:
                      pageSelect == 6 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 6"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 6 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/06.png"
                      />
                    </div>
                    <p class="center-font">仓库管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  @click="checkedPage07"
                  :style="{
                    backgroundColor:
                      pageSelect == 7 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 7"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 7 ? '-24px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/07.png"
                      />
                    </div>
                    <p class="center-font">供应商管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  v-if="systemAdmin == 1"
                  @click="checkedPage08"
                  :style="{
                    backgroundColor:
                      pageSelect == 8 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 8"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 8 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/08.png"
                      />
                    </div>
                    <p class="center-font">用户管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
                <li
                  class="son-li"
                  v-if="wordAdmin == 1"
                  @click="checkedPage11"
                  :style="{
                    backgroundColor:
                      pageSelect == 11 ? '#303e53' : 'transparent',
                  }"
                >
                  <p class="son-li-line" v-if="pageSelect == 11"></p>
                  <div
                    class="son-li-center"
                    :style="{ marginLeft: pageSelect == 11 ? '-38px' : '32px' }"
                  >
                    <div class="center-img-div">
                      <img
                        class="center-img"
                        src="../assets/imgs/home/11.png"
                      />
                    </div>
                    <p class="center-font">文档管理</p>
                  </div>
                  <div class="son-li-right">
                    <img
                      class="right-img"
                      src="../assets/imgs/home/right.png"
                    />
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </el-aside>
        <el-main class="home-container-main">
          <el-backtop :bottom="100">
            <img src="../assets/imgs/top.png" class="radius" />
          </el-backtop>
          <!-- 库存查询 -->
          <StockInquiry
            v-if="pageSelect == 1"
            :stockInquiryParam="stockInquiryParam"
            :warnList="warnList"
          >
          </StockInquiry>
          <!-- 库存管理 -->
          <InventoryStatistics v-if="pageSelect == 2"></InventoryStatistics>
          <!-- 用量统计 -->
          <UsageStatistics v-if="pageSelect == 3"></UsageStatistics>
          <!-- 入库管理 -->
          <StockManagement v-if="pageSelect == 4"></StockManagement>
          <!-- 出库管理 -->
          <WarehouseManagement v-if="pageSelect == 5"></WarehouseManagement>
          <!-- 仓库管理 -->
          <WarehouseAdmin v-if="pageSelect == 6"></WarehouseAdmin>
          <!-- 供应商管理 -->
          <SupplierAdmin v-if="pageSelect == 7"></SupplierAdmin>
          <!-- 用户管理 -->
          <UserAdmin v-if="pageSelect == 8"></UserAdmin>
          <!-- 采购申请 -->
          <MaterialsApply
            ref="materialsApply"
            v-if="pageSelect == 9"
          ></MaterialsApply>
          <!-- 采购审批 -->
          <MaterialsExamination
            v-if="pageSelect == 10"
            @notCheck="notCheck"
          ></MaterialsExamination>
          <!-- 文档管理 -->
          <WordAdmin v-if="pageSelect == 11"></WordAdmin>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StockInquiry from "@/components/Stock-inquiry.vue";
import InventoryStatistics from "@/components/Inventory-statistics.vue";
import UsageStatistics from "@/components/Usage-statistics.vue";
import StockManagement from "@/components/Stock-management.vue";
import WarehouseManagement from "@/components/Warehouse-management.vue";
import WarehouseAdmin from "@/components/Warehouse-admin.vue";
import SupplierAdmin from "@/components/Supplier-admin.vue";
import UserAdmin from "@/components/User-admin.vue";
import MaterialsApply from "@/components/Materials-apply.vue";
import MaterialsExamination from "@/components/Materials-examination.vue";
import WordAdmin from "@/components/Word-admin.vue";

export default {
  name: "Home",
  components: {
    StockInquiry,
    InventoryStatistics,
    UsageStatistics,
    StockManagement,
    WarehouseManagement,
    WarehouseAdmin,
    SupplierAdmin,
    UserAdmin,
    MaterialsApply,
    MaterialsExamination,
    WordAdmin,
  },
  data() {
    return {
      userNick: "",
      pageSelect: 1,
      updateUser: 0,
      pswDialogVisible: false,
      oldPsw: "",
      newPsw: "",
      systemAdmin: "",
      apply: "",
      approve: "",
      wordAdmin: 1,
      stockInquiryParam: {
        sel: 0,
      },
      clientHeight: "",
      drawer: false,
      warnList: [],
      warnListPage: [],
      page: 1,
      pageNum: 10,
      total: 0,
      dialogWarnVisible: false,
      warnDetails: {},
      circleHidden: 1,
    };
  },
  created() {
    this.userNick = sessionStorage.getItem("nick");
    this.apply = sessionStorage.getItem("isApply");
    this.approve = sessionStorage.getItem("isCheck");
    this.systemAdmin = sessionStorage.getItem("isAdmin");
    console.log(this.systemAdmin);
    this.checkedPage01();
    // this.checkedPage11();
    this.connectWebSocket();
    this.$axios
      .post(this.$store.state.baseUrl + "/applyList", {
        flag: 1,
        state: 0,
      })
      .then((res) => {
        console.log("申请列表");
        console.log(res);
        if (res.data.list.length == 0) {
          this.circleHidden = 1;
        } else {
          this.circleHidden = 0;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    this.clientHeight = document.documentElement.clientHeight;
    // console.log(this.$refs.homePage);
    this.$refs.homePage.$el.style.height = this.clientHeight + "px";
    window.onresize = () => {
      this.clientHeight = document.documentElement.clientHeight;
      // console.log(this.$refs.homePage);
      this.$refs.homePage.$el.style.height = this.clientHeight + "px";
    };
  },
  methods: {
    // 查询统计 库存查询
    checkedPage01() {
      this.pageSelect = 1;
      this.stockInquiryParam.sel = 0;

      this.backTop();
    },
    // 库存管理
    checkedPage02() {
      this.pageSelect = 2;

      this.backTop();
    },
    // 用量统计
    checkedPage03() {
      this.pageSelect = 3;

      this.backTop();
    },
    // 系统入库  入库管理
    checkedPage04() {
      this.pageSelect = 4;

      this.backTop();
    },
    // 系统出库  出库管理
    checkedPage05() {
      this.pageSelect = 5;

      this.backTop();
    },
    // 系统设置  仓库管理
    checkedPage06() {
      this.pageSelect = 6;

      this.backTop();
    },
    // 供应商管理
    checkedPage07() {
      this.pageSelect = 7;

      this.backTop();
    },
    // 用户管理
    checkedPage08() {
      this.pageSelect = 8;

      this.backTop();
    },
    // 采购申请
    checkedPage09() {
      this.pageSelect = 9;
      this.$nextTick(() => {
        this.$refs.materialsApply.activeName = "apply";
        this.$refs.materialsApply.handleMaterialClick();
      });

      this.backTop();
    },

    // 采购审批
    checkedPage10() {
      this.pageSelect = 10;

      this.backTop();
    },
    // 文档管理
    checkedPage11() {
      this.pageSelect = 11;

      this.backTop();
    },
    notCheck(val) {
      this.circleHidden = val;
    },
    // 连接websocket
    connectWebSocket() {
      this.reConnectWebSocket();
    },
    reConnectWebSocket() {
      let token = sessionStorage.getItem("token");
      // 建立到服务端websocket连接
      // http协议使用ws,https使用wss
      // var ws = new WebSocket("ws://" + this.$store.state.socketUrl, [token]);
      var ws = new WebSocket(this.$store.state.socketUrl, [token]);
      // 断开连接重连
      ws.onclose = () => {
        setTimeout(() => {
          this.reConnectWebSocket();
        }, 5000);
      };
      // 出错重连
      ws.onerror = () => {
        setTimeout(() => {
          this.reConnectWebSocket();
        }, 5000);
      };
      // 当连接被打开时，注册接收消息的处理函数
      ws.onopen = (e) => {
        console.log(e);
        // 当有消息发过来时，就将消息放到显示元素上
        ws.onmessage = (res) => {
          console.log("websocket获取到的数据");
          console.log(res);
          console.log(JSON.parse(res.data));
          this.warnList = [];
          this.warnList = JSON.parse(res.data);
          console.log(this.warnList);
          this.total = this.warnList.length;
          this.handleCurrentChange(1);
        };
      };
    },
    // 仓库报警
    warehouseWarn() {
      this.drawer = true;
      console.log("数据77777777777");
      console.log(this.warnList);
      this.page = 1;
      this.getList();
    },
    // 处理该报警
    warnDispose(row) {
      console.log(row);
      this.warnDetails = row;
      this.dialogWarnVisible = true;
    },
    // 确定处理
    warnDisposeSure() {
      this.$axios
        .post(this.$store.state.baseUrl + "/warnCheck", {
          id: this.warnDetails.id,
        })
        .then((res) => {
          console.log("处理报警设备");
          console.log(res);
          this.$message.success({
            message: "处理成功",
            showClose: true,
            duration: 2000,
          });
          this.dialogWarnVisible = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000,
          });
          this.dialogWarnVisible = false;
        });
    },
    // 分页处理数据
    getList() {
      console.log("分页数据");
      this.warnListPage = [];
      console.log(this.warnList);
      // es6过滤得到满足搜索条件的展示数据list
      this.warnListPage = this.warnList.filter(
        (item, index) =>
          index < this.page * this.pageNum &&
          index >= this.pageNum * (this.page - 1)
      );
      console.log(this.warnListPage);
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
      (function smoothscroll() {
        let currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        console.log(document.documentElement.scrollTop);
        console.log(document.body.scrollTop);
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
          console.log("0000000000000");
        }
      })();
    },
    // 修改密码、退出登录
    updateUserClick() {
      if (this.updateUser == 1) {
        this.updateUser = 0;
      } else if (this.updateUser == 0) {
        this.updateUser = 1;
      }
    },
    otherClick() {
      let e = e || window.event;
      // console.log(e);
      let className = e.target.className;
      // console.log(className);
      if (
        className !== "downbtn" &&
        className !== "right-div" &&
        className !== "span1" &&
        className !== "span-img" &&
        className !== "span-psw" &&
        className !== "updateP" &&
        className !== "updateUl"
      ) {
        if (this.updateUser == 1) {
          this.updateUser = 0;
        }
      }
    },
    // 修改密码
    pswUpdate() {
      this.oldPsw = "";
      this.newPsw = "";
      this.pswDialogVisible = true;
    },
    // 确定修改
    updatePsw() {
      console.log(sessionStorage.getItem("token"));
      console.log(this.oldPsw, this.newPsw);
      this.$axios
        .post(this.$store.state.baseUrl + "/userModify", {
          oldPsw: this.oldPsw,
          psw: this.newPsw,
        })
        .then((res) => {
          console.log(res);
          if (res.data.token !== "") {
            this.$message.success({
              message: "密码修改成功",
              showClose: true,
              duration: 2000,
            });
            sessionStorage.setItem("token", res.data.token);
            this.pswDialogVisible = false;
            this.updateUser = 1;
          }
          console.log(sessionStorage.getItem("token"));
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
    // 退出登录
    logOut() {
      this.$router.push("/");
      this.$store.dispatch("setToken", null);
    },
    // 页面回到顶部
    backTop() {
      let timer = null;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          document.body.scrollTop = document.documentElement.scrollTop =
            oTop - 100;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.font {
  width: 57px;
  margin: 0;
  margin-right: 10px;
  font-size: 14px;
  line-height: 40px;
}

.update-nick {
  width: 390px;
  height: 38px;
  line-height: 38px;
  padding: 0;
  padding-left: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
}

.home-container {
  height: 100%;
  position: relative;

  .main-top-right {
    width: 100%;
    height: 78px;
    position: relative;

    .left-con {
      position: absolute;
      left: 40px;
      display: flex;

      .left-font-one {
        margin: 0;
        line-height: 78px;
        font-size: 25px;
        font-weight: 600;
        color: #fff;
      }

      .left-font-line {
        width: 2px;
        height: 35px;
        margin: 0;
        position: absolute;
        top: 23px;
        left: 125px;
        background-color: #fff;
      }

      .left-font-two {
        margin: 0;
        margin-left: 53px;
        line-height: 78px;
        font-size: 25px;
        font-weight: 600;
        color: #fff;
      }
    }

    .right-div {
      // width: 150px;
      position: absolute;
      top: 0;
      right: 175px;
      height: 60px;
      line-height: 78px;
      padding: 0;
      display: flex;
      cursor: pointer;

      .span1 {
        display: inline-block;
        font-size: 18px;
        color: #fff;
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .loginoutDiv {
      display: flex;
      line-height: 78px;
      position: absolute;
      top: 26px;
      right: 50px;
      cursor: pointer;

      .loginout {
        width: 24px;
        height: 26px;
        margin-left: 5px;
        color: #fff;
      }

      .warnNum {
        width: 38px;
        height: 21px;
        margin-left: 5px;
        margin-top: 3px;
        line-height: 21px;
        border-radius: 11px;
        text-align: center;
        background-color: #ff3401;
        color: #fff;
        font-size: 14px;
      }
    }

    .downbtn {
      width: 120px;
      height: 100px;
      padding: 0;
      position: absolute;
      top: 78px;
      right: 155px;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 999;

      .updateUl,
      .updateLi1 {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .updateLi1 {
        .updateP {
          text-align: center;
          color: #000;

          .update-nick-img {
            // width: 50px;
            height: 40px;
            margin: 0 auto;
            line-height: 40px;
            border-radius: 15px;
            display: flex;
            justify-content: space-around;

            span {
              font-size: 15px;
            }
          }

          .nick-img {
            width: 75%;
            margin: 10px auto;
            border-bottom: 1px solid #c8c8c8;
          }

          .psw-img {
            width: 75%;
            margin: -7px auto;
          }
        }

        .updateP:hover {
          cursor: pointer;
        }
      }

      li {
        line-height: 30px;
        text-align: left;
        padding-left: 5px;
      }

      a:hover {
        text-decoration: underline;
        color: #f00;
      }

      a {
        display: block;
        color: black;
        width: 100%;
      }
    }
  }

  .aside-ul-dad {
    padding: 30px 0 30px 10px;
    // padding-top: 0;
    margin: 0;
    color: #fff;

    p {
      margin: 0;
    }

    .dad-li {
      margin-top: 30px;

      .dad-li-font {
        font-size: 12px;
        color: #6f84a8;
      }

      .aside-ul-son {
        padding: 20px 0 0 0;

        .son-li {
          height: 46px;
          line-height: 46px;
          padding-right: 20px;
          display: flex;
          justify-content: space-between;

          .son-li-line {
            width: 4px;
            height: 46px;
            background-color: #3d81fd;
          }

          .son-li-center {
            display: flex;

            .center-img-div {
              padding-top: 3px;
              margin-right: 10px;

              .center-img {
                width: 18px;
                height: 18px;
              }
            }

            .center-font {
              font-size: 14px;
              color: #b7bdc6;
            }
          }
        }
      }
    }
  }

  .home-container-main {
    .radius {
      width: 50px;
      height: 50px;
    }
  }

  .circle {
    width: 8px;
    height: 7px;
    background-color: red;
    border-radius: 50%;
  }
}
</style>
<style lang="scss">
#home-container {
  .el-header {
    position: relative;
    width: 100%;
    height: 78px;
    padding: 0;
    background-color: #26303c;
  }

  .el-aside {
    position: absolute;
    left: 0;
    top: 78px;
    bottom: 0;
    // min-height: 859px;
    background-color: #202732;
  }

  .el-aside::-webkit-scrollbar {
    width: 0;
  }

  .el-main {
    position: absolute;
    left: 218px;
    right: 0;
    top: 78px;
    bottom: 0;
    overflow-y: scroll;

    padding: 20px;
    background-color: #ececec;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 28px;
  }

  .el-input__inner {
    height: 40px;
  }
}

.el-dialog {
  width: 520px;
  border-radius: 10px !important;
}

.el-dialog__header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #3d82fe;
}

.el-dialog__title {
  color: #fff;
  font-weight: bold;
}

.el-dialog__headerbtn {
  font-size: 18px;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

.el-dialog__headerbtn .el-dialog__close:hover {
  color: #000;
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  font-weight: bolder;
}

.el-dialog__body {
  text-align: left;
}

.el-dialog__footer {
  padding: 10px 20px 30px 0;
  text-align: right;
}

.el-button + .el-button {
  margin-left: 30px;
}

.el-scrollbar__wrap {
  overflow: auto;
  height: 100%;
  margin-bottom: 0 !important;
}

.el-cascader-node__postfix {
  position: absolute;
  right: 22px !important;
}

.el-table--border:after,
.el-table--group:after,
.el-table:before {
  background-color: #ccc;
}

.el-table--border,
.el-table--group {
  border-color: #ccc;
}

.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ccc;
}

.el-table--border th,
.el-table--border th.gutter:last-of-type {
  border-bottom: 1px solid #ccc;
}

.el-table--border td,
.el-table--border th {
  border-right: 1px solid #ccc;
}

.el-table th {
  background-color: #f2f2f2;
}

.el-table {
  color: #666;
}

.el-table thead {
  color: #666;
}

.el-button--primary {
  color: #fff;
  background-color: #3d81fd;
  border-color: #3d81fd;
}

.el-drawer__header {
  text-align: left;
}

.el-drawer__header > :first-child {
  flex: 1;
  outline: 0;
}

.el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}

.el-table--border::after,
.el-table--group::after {
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
}

.el-drawer {
  overflow: scroll;
}
</style>
