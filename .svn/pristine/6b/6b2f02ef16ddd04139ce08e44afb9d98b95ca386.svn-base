<template>
  <div class="materials-apply-container">
    <!-- <h1>采购申请</h1> -->
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleMaterialClick">
      <el-tab-pane name="apply" label="新增申请">
        <!-- 新增申请 -->
        <div class="materials-apply-add">
          <div class="add-left" id="left">
            <p class="title-font">申请设备</p>
            <el-table :data="applyDeviceList" style="width: 100%" border>
              <el-table-column prop="deviceName" label="设备名称">
              </el-table-column>
              <el-table-column prop="supplierName" label="所属厂家">
              </el-table-column>
              <el-table-column property="deviceModel" label="型号">
              </el-table-column>
              <el-table-column label="申请数量" width="150">
                <template slot-scope="scope">
                  <div class="num">
                    <span @click="addNum(scope.$index)">+</span>
                    <el-input v-model="scope.row.deviceNum"></el-input>
                    <span @click="minusNum(scope.$index)">-</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="移除设备" width="120">
                <template slot-scope="scope">
                  <div class="num">
                    <el-button type="text" style="color: red;" @click="delNum(scope.$index)">移除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-form label-width="60px" style="margin-top: 20px;">
              <el-form-item label="备注：">
                <el-input style="height: 100px;" type="textarea" v-model="applyNote"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: right;">
              <el-button type="primary" @click="apply">提 交</el-button>
            </div>
          </div>
          <div class="add-right">
            <div style="display: flex;justify-content: space-between;">
              <p class="title-font">所有设备</p>
              <div style="display: flex;">
                <el-input style="width: 300px;" v-model="deviceKey" placeholder="可输入设备名称、设备型号进行查找" clearable></el-input>
                <el-button type="primary" size="mini" style="height: 40px;margin-left: 10px;" @click="checkDevice">查 询
                </el-button>
              </div>
            </div>
            <el-table ref="singleTable" :data="checkList" highlight-current-row @row-click="handleDeviceListChange"
              style="width: 100%" border>
              <el-table-column property="name" label="设备名称">
              </el-table-column>
              <el-table-column prop="supplierName" label="所属厂家">
              </el-table-column>
              <el-table-column property="model" label="型号">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="history" label="历史申请">
        <!-- 历史申请 -->
        <div v-if="historySel == 0">
          <el-form inline label-width="85px" style="text-align: left;">
            <el-form-item label="审批状态：">
              <el-select v-model="state" placeholder="请选择" clearable>
                <el-option v-for="item in stateList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" clearable>
              <el-date-picker v-model="startTime" type="date" placeholder="选择日期" format="yyyy-MM-dd"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：" clearable>
              <el-date-picker v-model="endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input style="width: 350px;" v-model="keyword" placeholder="可输入设备名称、备注、拒绝原因进行查找"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getApplyHistoryList">查 询</el-button>
            </el-form-item>
          </el-form>
          <div>
            <div v-if="applyHistoryList.length == 0" style="text-align: center;">
              <p>{{applyHistoryMsg}}</p>
            </div>
            <div v-else>
              <div v-for="history in applyHistoryList" :key="history.id">
                <div style="display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <p><span style="font-size: 18px;font-weight: bold;">申请时间：</span>{{history.subTime}}
                    </p>
                    <p style="margin-left: 20px;"><span
                        style="font-size: 18px;font-weight: bold;">审批人：</span>{{history.checkName == '' ? '暂未审批' : history.checkName}}
                    </p>
                    <p style="margin-left: 20px;"><span
                        style="font-size: 18px;font-weight: bold;">审批时间：</span>{{history.checkTime == '' ? '暂未审批' : history.checkTime}}
                    </p>
                    <p style="margin-left: 20px;">
                      <span style="font-size: 18px;font-weight: bold;">审批状态：</span>
                      <span
                        :style="{color: history.state == 0 ? '#000' : (history.state == 1 ? 'green' : 'red')}">{{history.state == 0 ? '未审批' : (history.state == 1 ? '审批通过' : '已拒绝')}}</span>
                    </p>
                  </div>
                  <div style="line-height: 56px;">
                    <el-button type="text" @click="detailsApply(history)">详情</el-button>
                    <el-dialog title="申请单详情" :visible.sync="dialogDetailsApplyVisible" :close-on-press-escape="false"
                      :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true" width="750px">
                      <div>
                        <p>申请时间：{{applyDetails.subTime}}</p>
                        <p>备注：{{applyDetails.applyNote}}</p>
                        <p>审批人：{{applyDetails.state == 0 ? '未审批' : applyDetails.checkName}}</p>
                        <p>审批时间：{{applyDetails.state == 0 ? '未审批' : applyDetails.checkTime}}</p>
                        <p>审批状态：{{applyDetails.state == 0 ? '未审批' : (applyDetails.state == 1 ? '审批通过' : '拒绝')}}</p>
                        <p v-if="applyDetails.state == -1">拒绝理由：{{applyDetails.refuseNote}}</p>
                        <p>设备列表：</p>
                        <el-table :data="applyDetails.deviceList" style="width: 100%" border>
                          <el-table-column prop="deviceName" label="设备名称">
                          </el-table-column>
                          <el-table-column prop="deviceModel" label="设备型号">
                          </el-table-column>
                          <el-table-column prop="deviceNum" label="申请数量">
                          </el-table-column>
                          <el-table-column prop="supplierName" label="所属厂家">
                          </el-table-column>
                          <el-table-column prop="systemName" label="所属系统">
                          </el-table-column>
                        </el-table>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogDetailsApplyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogDetailsApplyVisible = false">确 定</el-button>
                      </div>
                    </el-dialog>
                    <el-button style="margin-left: 30px;" type="text" @click="updateApply(history)">修改</el-button>
                    <el-button type="text" style="color: red;" @click="deleteApply(history.id,history.state)">删除
                    </el-button>
                    <el-dialog title="删除申请" :visible.sync="dialogDelApplyVisible" :close-on-press-escape="false"
                      :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                      <div style="text-align: center;">
                        <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该申请？删除后不可恢复</p>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogDelApplyVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteApplySure" v-preventClick>确 定</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </div>
                <el-table :data="history.deviceList" style="width: 100%" border>
                  <el-table-column prop="deviceName" label="设备名称">
                  </el-table-column>
                  <el-table-column prop="deviceModel" label="设备型号">
                  </el-table-column>
                  <el-table-column prop="deviceNum" label="申请数量">
                  </el-table-column>
                  <el-table-column prop="supplierName" label="所属厂家">
                  </el-table-column>
                  <el-table-column prop="systemName" label="所属系统">
                  </el-table-column>
                </el-table>
              </div>
              <div style="width: 100%;height: 50px;">
                <div style="margin:15px 0;position:absolute;right:6%;">
                  <el-pagination @current-change="handleCurrentChange" :current-page="page"
                    layout="total, prev, pager, next, jumper" :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="width: 60px;margin-bottom: 20px;display: flex;justify-content:space-between;cursor: pointer;"
            @click="goback">
            <img src="../assets/imgs/home/goback.png" style="height: 21px;" />
            <p style="margin: 0;">返回</p>
          </div>
          <div class="materials-apply-add">
            <div class="add-left" id="left">
              <p class="title-font">申请设备</p>
              <el-table :data="applyDeviceList" style="width: 100%" border>
                <el-table-column prop="deviceName" label="设备名称">
                </el-table-column>
                <el-table-column prop="supplierName" label="所属厂家">
                </el-table-column>
                <el-table-column property="deviceModel" label="型号">
                </el-table-column>
                <el-table-column label="申请数量" width="150">
                  <template slot-scope="scope">
                    <div class="num">
                      <span @click="addNum(scope.$index)">+</span>
                      <el-input v-model="scope.row.deviceNum"></el-input>
                      <span @click="minusNum(scope.$index)">-</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="移除设备" width="120">
                  <template slot-scope="scope">
                    <div class="num">
                      <el-button type="text" style="color: red;" @click="delNum(scope.$index)">移除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <el-form label-width="60px" style="margin-top: 20px;">
                <el-form-item label="备注：">
                  <el-input style="height: 100px;" type="textarea" v-model="applyNote"></el-input>
                </el-form-item>
              </el-form>
              <div style="text-align: right;">
                <el-button type="primary" @click="applyUpdateSure">修 改</el-button>
              </div>
            </div>
            <div class="add-right">
              <div style="display: flex;justify-content: space-between;">
                <p class="title-font">所有设备</p>
                <div style="display: flex;">
                  <el-input style="width: 300px;" v-model="deviceKey" placeholder="可输入设备名称、设备型号进行查找" clearable>
                  </el-input>
                  <el-button type="primary" size="mini" style="height: 40px;margin-left: 10px;" @click="checkDevice">查 询
                  </el-button>
                </div>
              </div>
              <el-table ref="singleTable" :data="checkList" highlight-current-row @row-click="handleDeviceListChange"
                style="width: 100%" border>
                <el-table-column property="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="supplierName" label="所属厂家">
                </el-table-column>
                <el-table-column property="model" label="型号">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'apply',
        deviceList: [],
        applyNote: '',
        applyDeviceList: [],
        deviceKey: '',
        checkList: [],
        state: '',
        stateList: [{
          id: 0,
          name: '未审批'
        }, {
          id: 1,
          name: '审批通过'
        }, {
          id: -1,
          name: '被拒绝'
        }, ],
        startTime: '',
        endTime: '',
        keyword: '',
        page: 1,
        pageNum: 10,
        total: 0,
        applyHistoryList: [],
        applyHistoryMsg: '数据加载中',
        dialogDelApplyVisible: false,
        delId: '',
        historySel: 0,
        dialogDetailsApplyVisible: false,
        applyDetails: {},
        applyUpdate: [],

      }
    },
    created() {
      this.getDeviceList();
    },
    methods: {
      // 修改申请
      updateApply(details) {
        console.log(details);
        this.applyUpdate = details;
        this.applyDeviceList = [];
        this.applyNote = '';
        if (this.applyUpdate.state !== 0) {
          this.$message.warning({
            message: '该申请已审批，不可修改',
            showClose: true,
            duration: 2000
          })
        } else {
          console.log(this.applyUpdate);
          this.historySel = 1;
          this.applyDeviceList = this.applyUpdate.deviceList;
          this.applyNote = this.applyUpdate.applyNote;
        }
      },
      // 确定修改
      applyUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/apply', {
          id: this.applyUpdate.id,
          deviceList: this.applyDeviceList,
          applyNote: this.applyNote
        }).then(res => {
          console.log('设备申请修改');
          console.log(res);
          this.$message.success({
            message: '修改成功',
            showClose: true,
            duration: 2000
          });
          this.applyDeviceList = [];
          this.applyNote = '';
          this.getApplyHistoryList();
          this.historySel = 0;
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 返回
      goback() {
        this.historySel = 0;
        this.getApplyHistoryList();
      },
      // 查看详情
      detailsApply(details) {
        console.log(details);
        this.applyDetails = details;
        this.dialogDetailsApplyVisible = true;
      },
      // 删除申请
      deleteApply(id, state) {
        if (state !== 0) {
          this.$message.warning({
            message: '该申请已审批，不可删除',
            showClose: true,
            duration: 2000
          })
        } else {
          this.delId = id;
          this.dialogDelApplyVisible = true;
        }
      },
      // 确定
      deleteApplySure() {
        this.$axios.post(this.$store.state.baseUrl + '/applyRemove', {
          id: this.delId
        }).then(res => {
          console.log('删除申请');
          console.log(res);
          this.$message.success({
            message: '删除成功',
            showClose: true,
            duration: 2000
          });
          this.dialogDelApplyVisible = false;
          this.getApplyHistoryList();
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogDelApplyVisible = false;
        })
      },
      // 设备申请
      apply() {
        if (this.applyDeviceList.length == 0) {
          this.$message.error({
            message: '请选择申请设备',
            showClose: true,
            duration: 2000
          });
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/apply', {
            deviceList: this.applyDeviceList,
            applyNote: this.applyNote
          }).then(res => {
            console.log('设备申请');
            console.log(res);
            this.$message.success({
              message: '申请提交成功',
              showClose: true,
              duration: 2000
            });
            this.applyDeviceList = [];
            this.applyNote = '';
          }).catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          })
        }
      },
      // 加
      addNum(index) {
        this.applyDeviceList[index].deviceNum++;
      },
      // 减
      minusNum(index) {
        if (this.applyDeviceList[index].deviceNum == 1) {
          this.$message.error({
            message: '申请数量最少为1',
            showClose: true,
            duration: 1500
          })
        } else {
          this.applyDeviceList[index].deviceNum--;
        }
      },
      // 删
      delNum(index) {
        this.applyDeviceList.splice(index, 1);
      },
      // 选择申请设备
      handleDeviceListChange(val) {
        console.log(val);
        console.log(this.applyDeviceList);
        if (this.applyDeviceList.length == 0) {
          this.applyDeviceList.push({
            deviceId: val.id,
            deviceName: val.name,
            deviceModel: val.model,
            supplierName: val.supplierName,
            deviceNum: 1
          });
        } else {
          console.log('000000099999999--------');
          console.log(this.filterSel(val));
          if (this.filterSel(val)) {
            this.$message.error({
              message: '请勿重复添加',
              showClose: true,
              duration: 2000
            });
          } else {
            this.applyDeviceList.push({
              deviceId: val.id,
              deviceName: val.name,
              deviceModel: val.model,
              supplierName: val.supplierName,
              deviceNum: 1
            });
          }
        };
        console.log(this.applyDeviceList);
      },
      filterSel(val) {
        for (const item of this.applyDeviceList) {
          console.log(item);
          if (item.deviceId == val.id) {
            console.log('-------------');
            return true
          }
        }
      },
      // 获取历史申请列表
      getApplyHistoryList() {
        this.applyHistoryMsg = '数据加载中';
        this.applyHistoryList = [];
        this.$axios.post(this.$store.state.baseUrl + '/applyList', {
          flag: 0,
          state: this.state,
          startTime: this.startTime,
          endTime: this.endTime,
          keyword: this.keyword,
          page: this.page,
          pageNum: this.pageNum
        }).then(res => {
          console.log('历史列表');
          console.log(res);
          this.applyHistoryList = res.data.list;
          this.total = res.data.total;
          if (this.applyHistoryList.length == 0) {
            this.applyHistoryMsg = '暂无数据';
          }
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
        this.getApplyHistoryList();
      },
      // 模糊搜索设备
      checkDevice() {
        this.checkList = [];
        if (this.deviceKey == '') {
          this.checkList = this.deviceList;
        } else {
          for (const item of this.deviceList) {
            if (item.name.indexOf(this.deviceKey) !== -1 || item.model.indexOf(this.deviceKey) !== -1) {
              console.log(item.name.indexOf(this.deviceKey));
              this.checkList.push(item);
            }
          }
        }
      },
      // tab切换
      handleMaterialClick() {
        if (this.activeName == 'apply') {
          this.deviceKey = '';
          this.checkList = this.deviceList;
          this.applyDeviceList = [];
          this.applyNote = '';
        } else {
          this.historySel = 0;
          this.deviceKey = '';
          this.checkList = this.deviceList;
          this.applyDeviceList = [];
          this.applyNote = '';
          this.getApplyHistoryList();
        }
      },
      // 获取设备列表
      getDeviceList() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierList').then((res) => {
          console.log('设备列表');
          console.log(res);
          this.deviceList = res.data.deviceList;
          this.checkList = this.deviceList;
        }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .materials-apply-container {
    .materials-apply-add {
      display: flex;

      .add-left {
        width: 600px;
        text-align: left;

        .num {
          display: flex;

          span {
            cursor: pointer;
            font-size: 16px;
          }
        }
      }

      .add-right {
        width: 600px;
        margin-left: 15px;
        text-align: left;

      }
    }

    .title-font {
      height: 48px;
      margin: 0;
      text-align: left;
      color: #6a6a6a;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
<style lang="scss">
  #left {
    .el-input__inner {
      width: 95px;
      height: 25px !important;
      margin: 0 10px;
      line-height: 25px;
    }
  }

  .el-textarea__inner {
    height: 100%;
  }
</style>