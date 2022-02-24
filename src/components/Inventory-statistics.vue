<template>
  <div class="inventory-statistics-container" id="inventory-statistics">
    <!-- <h1>库存管理</h1> -->
    <div style="text-align: left;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="部门：">
          <el-cascader class="input-style" ref="menuCascaderFilter" v-model="wid" :options="menuList" :props="propsMenu"
            :show-all-levels="false" clearable @change="menuChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="仓库：">
          <el-select v-model="warehouseIdList" multiple placeholder="可多选" @change="wareCheck">
            <el-option v-for="ware in warehouseSelList" :key="ware.id" :label="ware.name" :value="ware.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="flag" placeholder="请选择" clearable>
            <el-option v-for="ware in flagList" :key="ware.id" :label="ware.name" :value="ware.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;">
            <el-input style="width: 430px;" v-model="inventoryKeyword" placeholder="可输入部门、厂家、系统、设备名称，设备型号，生产批次进行搜索">
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="inventoryCheck">查 询</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出excel表格
            <!-- <a :href="eurl" class="urlimg"></a> -->
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="stockStatisticsList" tooltip-effect="dark" border @row-click="inventoryLook">
        <el-table-column prop="deviceName" label="设备名称">
        </el-table-column>
        <el-table-column prop="warehouseName" label="仓库">
        </el-table-column>
        <el-table-column prop="supplierName" label="厂家">
        </el-table-column>
        <el-table-column prop="systemName" label="系统">
        </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号">
        </el-table-column>
        <el-table-column prop="benchmark" label="生产批次">
        </el-table-column>
        <el-table-column prop="productTime" label="生产日期">
        </el-table-column>
        <el-table-column prop="validTime" label="到期日期">
        </el-table-column>
        <el-table-column prop="stockInTime" label="入库日期">
        </el-table-column>
        <el-table-column prop="stockInDays" label="库存时长（天）">
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template>
            <el-button type="text" style="color: red;">
              删除
            </el-button>
          </template>
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
            设备状态：{{inventoryCheckDetail.flag == 0 ? '库存中' : (inventoryCheckDetail.flag == 1 ? '维修中' : (inventoryCheckDetail.flag == 2 ? '检修中' : '使用中'))}}
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
      <el-dialog title="删除设备" :visible.sync="dialogInventoryDeleteVisible" :close-on-press-escape="false"
        :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
        <div style="text-align: center;">
          <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该设备？删除后不可修改</p>
        </div>
        <div slot="footer">
          <el-button @click="dialogInventoryDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="inventoryDeleteSure" v-preventClick>确 定</el-button>
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
        stockStatisticsList: [],
        wid: '',
        warehouseIdList: [],
        flag: 0,
        propsMenu: {
          checkStrictly: true,
          emitPath: false,
          value: 'id',
          label: 'label'
        },
        menuList: [],
        warehouseSelList: [{
          id: 0,
          name: '全部'
        }],
        flagList: [{
          id: 0,
          name: '库存中'
        }, {
          id: 1,
          name: '维修中'
        }, {
          id: 2,
          name: '检修中'
        }, ],
        eurl: '',
        total: 0,
        page: 1,
        pageNum: 10,

        inventoryKeyword: '',

        dialogInventoryCheckVisible: false,
        inventoryCheckDetail: {},
        dialogInventoryDeleteVisible: false,
        inventoryDeleteDetail: {},

        isUpdate: 0,

      }
    },
    created() {
      this.getWarehouseList();
      this.inventoryCheck();
    },
    methods: {
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
      // 查看修改设备详情
      inventoryLook(row, column, e) {
        console.log(row);
        console.log(column);
        console.log(e);
        this.inventoryCheckDetail = {};
        this.inventoryCheckDetail = row;
        if (column.label == '操作') {
          this.inventoryDelete(row);
        } else {
          this.isUpdate = 0;
          this.dialogInventoryCheckVisible = true;
        }
      },
      updateDevice() {
        this.isUpdate = 1;
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
              this.inventoryCheck();
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
      // 删除设备
      inventoryDelete(val) {
        console.log(val);
        this.inventoryDeleteDetail = val;
        this.dialogInventoryDeleteVisible = true;
      },
      // 确定
      inventoryDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/stockDelete', {
            id: this.inventoryDeleteDetail.id
          }).then(res => {
            console.log('删除设备信息');
            console.log(res);
            this.$message.success({
              message: "删除成功",
              showClose: true,
              duration: 2000
            });
            this.dialogInventoryDeleteVisible = false;
            this.inventoryCheck();
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
      // 导出Excel表格
      exportExcel() {
        this.$axios.post(this.$store.state.baseUrl + '/stockExportData', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          flag: this.flag
        }).then((res) => {
          console.log(res);
          this.eurl = this.$store.state.baseUrl + res.data.excelUrl;
          console.log(this.eurl);
          window.location.href = this.eurl;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 库存统计
      inventoryCheck() {
        this.$axios.post(this.$store.state.baseUrl + '/stockStatistics', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          flag: this.flag,
          page: this.page,
          pageNum: this.pageNum,
          keyword: this.inventoryKeyword
        }).then(res => {
          console.log('库存统计');
          console.log(res);
          this.stockStatisticsList = res.data.list;
          this.total = res.data.total;
        }).catch(err => {
          console.log(err);
        })
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
        this.inventoryCheck();
      },
      // 仓库选择
      wareCheck() {
        console.log(this.warehouseIdList);
        // if (this.warehouseIdList.indexOf(0) !== -1) {
        //   for (const ite of this.warehouseSelList) {
        //     if (ite.id !== 0) {
        //       this.warehouseIdList.push(ite.id);
        //     }
        //   }
        // }
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
      // 获取部门、仓库列表
      getWarehouseList() {
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
    }
  }
</script>

<style lang="scss" scoped>
  .inventory-statistics-container {
    // width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 6px;

    .urlimg {
      text-decoration: none;
      color: #fff;
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
  #inventory-statistics {
    .el-textarea__inner {
      height: 34px;
      display: block;
      resize: vertical;
      padding: 5px 15px;
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

    .el-dialog__body {
      padding: 0 20px;
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