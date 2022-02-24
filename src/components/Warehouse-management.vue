<template>
  <div class="warehouse-management-container">
    <!-- <h1>出库管理</h1> -->
    <div style="display: flex;justify-content: space-between;" id="warehouseCheck">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="部门：">
          <el-cascader class="input-style" ref="menuCascaderFilter" v-model="wid" :options="menuList" :props="propsMenu"
            :show-all-levels="false" clearable @change="menuChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="仓库：">
          <el-select v-model="warehouseIdList" multiple placeholder="可多选">
            <el-option v-for="ware in warehouseSelList" :key="ware.id" :label="ware.name" :value="ware.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;">
            <el-input style="width: 400px;" v-model="warehouseKeyword" @change="keywordChange"
              placeholder="可输入厂家、系统、设备名称，设备型号，生产批次进行搜索" clearable>
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="warehouseCheck">查 询</el-button>
            <el-button type="primary" @click="filterList">设备筛选</el-button>
            <el-dialog title="筛选设备" :visible.sync="dialogDeviceCheckVisible" :close-on-press-escape="false"
              :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
              <el-form>
                <el-form-item label="所属厂家：">
                  <el-select v-model="supplierId" class="input-style" @change="supplierChange" clearable>
                    <el-option v-for="suppler in supplierList" :key="suppler.id" :label="suppler.name"
                      :value="suppler.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属系统：">
                  <el-select v-model="systemId" class="input-style" clearable>
                    <el-option v-for="system in systemSelList" :key="system.id" :label="system.name" :value="system.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生产批次：">
                  <el-input v-model="benchmark" class="input-style" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备名称：">
                  <el-input v-model="deviceName" class="input-style" clearable></el-input>
                </el-form-item>
                <el-form-item label="设备型号：">
                  <el-input v-model="deviceModel" class="input-style" clearable></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer">
                <el-button @click="dialogDeviceCheckVisible = false">取 消</el-button>
                <el-button type="primary" @click="filterListSure" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-form-item>
      </el-form>

      <el-button type="info" @click="delivery">出 库</el-button>
      <el-dialog title="设备出库" :visible.sync="dialogDeliveryVisible" :close-on-press-escape="false"
        :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
        <el-form :model="deliveryData" :rules="deliveryRules" ref="deliveryForm" label-width="92px">
          <el-form-item label="出库类型：" prop="type">
            <el-select v-model="deliveryData.type" class="input-style">
              <el-option v-for="item in deliveryType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出库时间：" prop="stockOutTime">
            <el-date-picker class="input-style" v-model="deliveryData.stockOutTime" type="date" placeholder="请选择">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="领货人：" prop="receiver">
            <el-input class="input-style" v-model="deliveryData.receiver"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="note">
            <el-input class="input-style" v-model="deliveryData.note"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogDeliveryVisible = false">取 消</el-button>
          <el-button type="primary" @click="deliverySure('deliveryForm')" v-preventClick>确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="margin-top: 20px;">
      <el-table ref="multipleTable" :data="deviceAllList" :row-key="getRowKeys" tooltip-effect="dark" border
        @selection-change="handleSelectionChange" @row-click="warehouseManaLook">
        <el-table-column type="selection" :reserve-selection="true" width="55" align="center">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称">
        </el-table-column>
        <el-table-column prop="supplierName" label="所属厂家">
        </el-table-column>
        <el-table-column prop="systemName" label="所属系统">
        </el-table-column>
        <el-table-column prop="warehouseName" label="所属仓库">
        </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号">
        </el-table-column>
        <el-table-column prop="benchmark" label="生产批次" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="deviceNumber" label="设备编号">
        </el-table-column>
      </el-table>
      <el-dialog title="设备信息" :visible.sync="dialogInventoryCheckVisible" :close-on-press-escape="false"
        :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
        <div id="invenSome">
          <div style="display: flex;justify-content: space-between;">
            <p class="font-title-style">库存信息</p>
            <div style="padding-top: 24px;">
              <img style="cursor: pointer;" title="修改设备信息" src="../assets/imgs/home/update.png" @click="updateDevice" />
            </div>
          </div>
          <div class="font-div">
            <div class="div-one">
              <div class="one-left">
                仓库名称
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.warehouseName}}
              </div>
            </div>
            <div class="div-one">
              <div class="one-left">
                设备名称
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.deviceName}}
              </div>
            </div>
            <div class="div-one">
              <div class="one-left">
                设备编号
              </div>
              <div style="width: 382px;display: flex;justify-content: space-between;">
                <div class="one-right">
                  {{inventoryCheckDetail.deviceNumber}}
                </div>
                <div class="qrcodeClick" @click="getQrcodeInven" v-preventClick>打印二维码</div>
              </div>
            </div>
            <div class="div-one">
              <div class="one-left"
                :style="{color: isUpdate == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdate == 0 ? 'normal' : 'bold'}">
                货架号
              </div>
              <div class="one-right">
                <el-input :readonly="isUpdate == 0 ? true : false" v-model="inventoryCheckDetail.shelfNumber" clearable>
                </el-input>
              </div>
            </div>
            <div class="div-one">
              <div class="one-left">
                在库时长
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.stockInDays + ' 天'}}
              </div>
            </div>
          </div>
          <p class="font-title-style">设备信息</p>
          <div class="font-div">
            <div class="div-one">
              <div class="one-left">
                厂家名称
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.supplierName}}
              </div>
            </div>
            <div class="div-one">
              <div class="one-left">
                系统名称
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.systemName}}
              </div>
            </div>
            <div class="div-one">
              <div class="one-left">
                设备型号
              </div>
              <div class="one-right">
                {{inventoryCheckDetail.deviceModel}}
              </div>
            </div>
            <div class="div-one">
              <div class="one-left"
                :style="{color: isUpdate == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdate == 0 ? 'normal' : 'bold'}">
                生产日期
              </div>
              <div class="one-right">
                <el-date-picker :readonly="isUpdate == 0 ? true : false" v-model="inventoryCheckDetail.productTime"
                  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable></el-date-picker>
              </div>
            </div>
            <div class="div-one">
              <div class="one-left"
                :style="{color: isUpdate == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdate == 0 ? 'normal' : 'bold'}">
                有效日期
              </div>
              <div class="one-right">
                <el-date-picker :readonly="isUpdate == 0 ? true : false" v-model="inventoryCheckDetail.validTime"
                  type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable></el-date-picker>
              </div>
            </div>
            <div class="div-one">
              <div class="one-left"
                :style="{color: isUpdate == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdate == 0 ? 'normal' : 'bold'}">
                生产批次
              </div>
              <div class="one-right">
                <el-input :readonly="isUpdate == 0 ? true : false" v-model="inventoryCheckDetail.benchmark" clearable>
                </el-input>
              </div>
            </div>
          </div>
          <p class="font-title-style">备注信息</p>
          <div class="font-div">
            <div class="div-one-note" id="one-note">
              <div class="one-left"
                :style="{color: isUpdate == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdate == 0 ? 'normal' : 'bold'}">
                备注
              </div>
              <div class="one-right">
                <el-input type="textarea" v-model="inventoryCheckDetail.note" :readonly="isUpdate == 0 ? true : false">
                </el-input>
              </div>
            </div>
          </div>
          <p class="font-title-style">
            设备状态：{{inventoryCheckDetail.flag == 0 ? '库存中' : (inventoryCheckDetail.flag == 1 ? '维修中' :  (inventoryCheckDetail.flag == 2 ? '检修中' : '使用中'))}}
          </p>
          <el-timeline>
            <el-timeline-item color="#3d82fe" size="large"
              v-for="(activity, index) in inventoryCheckDetail.stockInOutList" :key="index">
              {{activity.time}}
              <span
                style="display: inline-block;margin-left: 10px;">{{activity.type == 0 ? (activity.flag == 1 ? '新购入库' : (activity.flag == 2 ? '归还入库' : (activity.flag == 3 ? '维修入库' : '检修入库'))) : (activity.flag == 1 ? '使用出库' : (activity.flag == 2 ? '维修出库' : '检修出库'))}}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div slot="footer">
          <el-button @click="dialogInventoryCheckVisible = false">取 消</el-button>
          <el-button type="primary" @click="inventoryLookSure" v-preventClick>确 定</el-button>
        </div>
      </el-dialog>
      <div style="width: 100%;height: 50px;">
        <div style="margin:15px 0;position:absolute;right:6%;">
          <el-pagination @current-change="handleCurrentChange" :current-page="page"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogDeviceCheckVisible: false,
        warehouseIdList: [],
        supplierId: '',
        systemId: '',
        benchmark: '',
        deviceName: '',
        deviceModel: '',
        supplierList: [],
        systemList: [],
        systemSelList: [],
        multipleSelection: [],
        deviceAllList: [],
        dialogDeliveryVisible: false,
        deliveryType: [{
          id: 1,
          name: '使用出库'
        }, {
          id: 2,
          name: '维修出库'
        }, {
          id: 3,
          name: '检修出库'
        }, {
          id: 4,
          name: '报废出库'
        }, ],
        deliveryData: {
          type: 1,
          stockOutTime: '',
          receiver: '',
          note: '',
          stockInIdList: []

        },
        deliveryRules: {
          type: [{
            required: true,
            message: '请选择出库类型',
            trigger: 'change'
          }],
          stockOutTime: [{
            required: true,
            message: '请选择出库时间',
            trigger: 'blur'
          }],
          receiver: [{
            required: true,
            message: '请输入领货人',
            trigger: 'blur'
          }],
        },
        warehouseKeyword: '',
        page: 1,
        pageNum: 10,
        total: 0,

        wid: '',
        menuList: [],
        propsMenu: {
          checkStrictly: true,
          emitPath: false,
          value: 'id',
          label: 'label'
        },
        warehouseSelList: [],

        dialogInventoryCheckVisible: false,
        inventoryCheckDetail: {},

        isUpdate: 0,

      }
    },
    created() {
      this.filterListSure();
      this.getMenuList();
      this.getSupplierAllList();
    },
    methods: {
      // 修改查看设备
      warehouseManaLook(row) {
        console.log(row);
        this.inventoryCheckDetail = {};
        this.inventoryCheckDetail = row;

        this.isUpdate = 0;
        this.dialogInventoryCheckVisible = true;
      },
      updateDevice() {
        this.isUpdate = 1;
      },
      // 打印二维码
      getQrcodeInven() {
        let param = "\"CMD\":\"2\",\"CMDDATA\":\"TEXT 30,30,\"TSS24.BF2\",0,1,1," + "\"仓库：" + this.inventoryCheckDetail
          .warehouseName + "\"" +
          "`TEXT 30,68,\"TSS24.BF2\",0,1,1,\"厂家：" + this.inventoryCheckDetail.supplierName + "\"" +
          "`TEXT 30,106,\"TSS24.BF2\",0,1,1,\"设备名称：" + this.inventoryCheckDetail.deviceName + "\"" +
          "`TEXT 30,144,\"TSS24.BF2\",0,1,1,\"设备型号：" + this.inventoryCheckDetail.deviceModel + "\"" +
          "`TEXT 30,182,\"TSS24.BF2\",0,1,1,\"入库时间：" + this.shellDateTwo(this.inventoryCheckDetail.stockInTime) + "\"" +
          "`TEXT 30,220,\"TSS24.BF2\",0,1,1,\"到期时间：" + this.shellDateTwo(this.inventoryCheckDetail.validTime) + "\"" +
          "`TEXT 30,258,\"TSS24.BF2\",0,1,1,\"编号：" + this.inventoryCheckDetail.deviceNumber + "\"" +
          "`QRCODE 340,174,L,5,A,0," + "\"" +
          this.inventoryCheckDetail.deviceNumber + "\"" + "\"CMDEND";
        this.$axios
          .post("http://127.0.0.1:8079",
            param
          )
          .then(res => {
            console.log(res);
            this.$message.success({
              message: "条码打印成功",
              showClose: true,
              duration: 2000
            });
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 确定
      inventoryLookSure() {
        if (this.isUpdate == 0) {
          this.dialogInventoryCheckVisible = false;
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/stockMsgUpdate', {
              id: this.inventoryCheckDetail.id,
              productTime: this.inventoryCheckDetail.productTime,
              validTime: this.inventoryCheckDetail.validTime,
              benchmark: this.inventoryCheckDetail.benchmark,
              shelfNumber: this.inventoryCheckDetail.shelfNumber,
              note: this.inventoryCheckDetail.note
            }).then(res => {
              console.log('修改设备信息');
              console.log(res);
              this.$message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000
              });
              this.dialogInventoryCheckVisible = false;
              this.warehouseCheck();
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
            });
        }
      },
      getRowKeys(row) {
        return row.id
      },
      // 选择出库设备
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },
      // 出库
      delivery() {
        this.deliveryData.stockInIdList = [];
        this.deliveryData.type = 1;
        this.deliveryData.stockOutTime = '';
        this.deliveryData.receiver = '';
        this.deliveryData.note = '';
        if (this.multipleSelection.length == 0) {
          this.$message.error({
            message: '请选择出库设备',
            showClose: true,
            duration: 1000
          })
        } else {
          for (const device of this.multipleSelection) {
            this.deliveryData.stockInIdList.push(device.id);
          };
          console.log(this.deliveryData.stockInIdList);
          this.dialogDeliveryVisible = true;
        };
      },
      // 确定出库
      deliverySure(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$store.state.baseUrl + '/stockOutDo', {
              type: this.deliveryData.type,
              stockOutTime: this.shellDate(this.deliveryData.stockOutTime),
              note: this.deliveryData.note,
              receiver: this.deliveryData.receiver,
              stockInIdList: this.deliveryData.stockInIdList
            }).then(res => {
              console.log('设备出库');
              console.log(res);
              this.$message.success({
                message: '出库成功',
                showClose: true,
                duration: 2000
              });
              this.dialogDeliveryVisible = false;
              this.deliveryData.stockInIdList = [];
              this.multipleSelection.length = 0;
              this.$refs.multipleTable.clearSelection();
              console.log(this.multipleSelection);
              console.log(this.deliveryData.stockInIdList);
              this.filterListSure();
            }).catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
              this.dialogDeliveryVisible = false;
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 筛选设备
      filterList() {
        this.dialogDeviceCheckVisible = true;
        // this.supplierId = '';
        // this.systemId = '';
        // this.benchmark = '';
        // this.deviceName = '';
        // this.deviceModel = '';
        // this.page = 1;
      },
      // 厂家选择
      supplierChange() {
        this.systemSelList = [];
        for (const item of this.systemList) {
          if (item.parentId == this.supplierId) {
            this.systemSelList.push(item);
          }
        }
      },
      // 确定筛选
      filterListSure() {
        this.deviceAllList = [];
        this.$axios.post(this.$store.state.baseUrl + '/stockOutInList', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          keyword: this.warehouseKeyword,
          supplierId: this.supplierId,
          systemId: this.systemId,
          benchmark: this.benchmark,
          deviceName: this.deviceName,
          deviceModel: this.deviceModel,
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('条件查找库存列表');
          console.log(res);
          this.total = res.data.total;
          this.deviceAllList = res.data.list;
          console.log(this.deviceAllList);
          this.dialogDeviceCheckVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
          this.dialogDeviceCheckVisible = false;
        });
      },
      // 模糊搜索
      keywordChange() {
        this.supplierId = '';
        this.systemId = '';
        this.benchmark = '';
        this.deviceName = '';
        this.deviceModel = '';
        this.page = 1;
      },
      warehouseCheck() {
        this.deviceAllList = [];
        this.$axios.post(this.$store.state.baseUrl + '/stockOutInList', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          keyword: this.warehouseKeyword,
          page: this.page,
          pageNum: this.pageNum
        }).then((res) => {
          console.log('条件查找库存列表');
          console.log(res);
          this.total = res.data.total;
          this.deviceAllList = res.data.list;
          console.log(this.deviceAllList);
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
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
        if (this.warehouseKeyword == '') {
          this.filterListSure();
        } else {
          this.warehouseCheck();
        }
      },
      // 部门下的仓库
      menuChange(value) {
        console.log(value);
        this.$refs.menuCascaderFilter.dropDownVisible = false;
        this.warehouseSelList = [{
          id: 0,
          name: '全部'
        }];

        this.$axios.post(this.$store.state.baseUrl + '/deptWarehouseList', {
          wid: value
        }).then(res => {
          console.log('部门下所有仓库');
          console.log(res);
          this.warehouseSelList = this.warehouseSelList.concat(res.data);
          console.log(this.warehouseSelList);
        }).catch(err => {
          console.log(err);
        })
      },
      // 获取部门列表
      getMenuList() {
        this.$axios.post(this.$store.state.baseUrl + '/userDeptList').then((res) => {
          console.log('部门列表');
          console.log(res);
          this.menuList = res.data;
          this.wid = this.menuList[0].id;
          this.menuChange(this.menuList[0].id);
        }).catch((err) => {
          console.log(err);
        });
      },
      // 获取所有厂家列表
      getSupplierAllList() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierList').then((res) => {
          console.log('厂家列表');
          console.log(res);
          this.supplierList = res.data.supplierList;
          this.systemList = res.data.systemList;
        }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .warehouse-management-container {
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;
    text-align: left;

    .input-style {
      width: 385px;
      margin-bottom: 20px;
    }

    .font-title-style {
      margin-top: 20px;
      margin-bottom: 10px;
      color: #6a6a6a;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }

    .font-div {
      border: 1px solid #ccc;
      border-bottom: none;

      .div-one {
        height: 34px;
        display: flex;
        line-height: 34px;
        border-bottom: 1px solid #ccc;

        .one-left {
          width: 94px;
          border-right: 1px solid #ccc;
          text-align: center;
          background-color: #f2f2f2;
        }

        .one-right {
          width: 373px;
          padding-left: 10px;
        }

        .qrcodeClick {
          width: 100px;
          height: 34px;
          float: right;
          line-height: 34px;
          background-color: #3d82fe;
          color: #fff;
          font-size: 13px;
          text-align: center;
          cursor: pointer;
        }
      }

      .div-one-note {
        height: 100px;
        display: flex;
        line-height: 100px;
        border-bottom: 1px solid #ccc;

        .one-left {
          width: 94px;
          border-right: 1px solid #ccc;
          text-align: center;
          background-color: #f2f2f2;
        }

        .one-right {
          width: 373px;
          padding-left: 10px;
        }
      }
    }
  }
</style>
<style lang="scss">
  #warehouseCheck {
    .el-button--info {
      height: 40px;
      color: #000;
      background-color: #d1d8de;
      border-color: #d1d8de;
    }
  }

  #invenSome {
    .el-input__inner {
      width: 100%;
      height: 34px !important;
      padding-left: 0;
      line-height: 34px !important;
      border: none;
      border-radius: 0;
    }

    .el-input__icon {
      height: 100%;
      width: 25px;
      text-align: center;
      transition: all .3s;
      line-height: 34px;
    }

    .el-input--prefix .el-input__inner {
      padding-left: 30px;
    }

    .el-input__prefix {
      left: 0;
      transition: all .3s;
    }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }

  #one-note {
    .el-input__inner {
      width: 100%;
      height: 100px !important;
      // padding-left: 0;
      line-height: 100px !important;
      border: none;
      border-radius: 0;
    }

    .el-textarea__inner {
      height: 100px;
      display: block;
      resize: vertical;
      padding: 5px 15px;
      padding-left: 0;
      line-height: 1.5;
      box-sizing: border-box;
      width: 100%;
      font-size: inherit;
      color: #606266;
      background-color: #FFF;
      background-image: none;
      border: none;
      border-radius: 0;
      transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    }
  }
</style>