<template>
  <div class="materials-examination-container" id="materials-examination">
    <!-- 材料申请 -->
    <div class="examination-top">
      <el-form inline label-position="left">
        <el-form-item label="申请人：" label-width="70px">
          <el-select v-model="userId" clearable>
            <el-option v-for="user in peopleList" :key="user.id" :label="user.applyName" :value="user.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" label-width="85px">
          <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" label-width="85px">
          <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <div style="display: flex;">
            <el-input style="width: 400px;" v-model="keyword" placeholder="可输入申请备注、设备名称、拒绝原因进行搜索" clearable>
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="examKeywordCheck">查 询
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-tabs type="border-card" v-model="activeBonusName" @tab-click="handleBonusTabsClick">
        <el-tab-pane label="未审批" name="notCheck">
          <div v-if="applyExamList.length == 0" style="text-align: center;">
            <p>{{applyExamMsg}}</p>
          </div>
          <div v-else>
            <div v-for="history in applyExamList" :key="history.id">
              <div style="display: flex;justify-content: space-between;">
                <div style="display: flex;">
                  <p><span style="font-size: 18px;font-weight: bold;">申请人：</span>{{history.applyName}}
                  </p>
                  <p style="margin-left: 20px;"><span
                      style="font-size: 18px;font-weight: bold;">申请时间：</span>{{history.subTime}}
                  </p>
                </div>
                <div style="line-height: 56px;">
                  <el-button type="text" @click="detailsApply(history)">详情</el-button>
                  <el-dialog title="申请单详情" :visible.sync="dialogDetailsApplyVisible" :close-on-press-escape="false"
                    :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true" width="750px">
                    <div>
                      <p>申请人：{{applyDetailsOne.applyName}}</p>
                      <p>申请时间：{{applyDetailsOne.subTime}}</p>
                      <p>备注：{{applyDetailsOne.applyNote}}</p>
                      <p>设备列表：</p>
                      <el-table :data="applyDetailsOne.deviceList" style="width: 100%" border>
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
                  <el-button style="margin-left: 30px;" type="text" @click="examApply(history)">审批</el-button>
                  <el-dialog title="申请单审批" :visible.sync="dialogExamApplyVisible" :close-on-press-escape="false"
                    :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                    <div>
                      <div>
                        <el-radio v-model="state" label="1">通过</el-radio>
                        <el-radio v-model="state" label="-1">拒绝</el-radio>
                      </div>
                      <div v-if="state == -1" style="display: flex;margin-top: 20px;">
                        <span>拒绝理由：</span>
                        <el-input style="width: 400px;" type="textarea" v-model="refuseNote"></el-input>
                      </div>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogExamApplyVisible = false">取 消</el-button>
                      <el-button type="primary" @click="examApplySure" v-preventClick>确 定</el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已审批" name="checked">
          <div v-if="applyExamList.length == 0" style="text-align: center;">
            <p>{{applyExamMsg}}</p>
          </div>
          <div v-else>
            <div v-for="history in applyExamList" :key="history.id">
              <div style="display: flex;justify-content: space-between;">
                <div style="display: flex;">
                  <p><span style="font-size: 18px;font-weight: bold;">申请人：</span>{{history.applyName}}
                  </p>
                  <p style="margin-left: 20px;"><span
                      style="font-size: 18px;font-weight: bold;">申请时间：</span>{{history.subTime}}
                  </p>
                  <p style="margin-left: 20px;"><span
                      style="font-size: 18px;font-weight: bold;">审批时间：</span>{{history.checkTime}}
                  </p>
                </div>
                <el-button type="text" @click="detailsApplyTwo(history)">详情</el-button>
                <el-dialog title="申请单详情" :visible.sync="dialogDetailsApplyTwoVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true" width="750px">
                  <div>
                    <p>申请人：{{applyDetailsTwo.applyName}}</p>
                    <p>申请时间：{{applyDetailsTwo.subTime}}</p>
                    <p>备注：{{applyDetailsTwo.applyNote}}</p>
                    <p>审批人：{{applyDetailsTwo.checkName}}</p>
                    <p>审批时间：{{applyDetailsTwo.checkTime}}</p>
                    <p>设备列表：</p>
                    <el-table :data="applyDetailsTwo.deviceList" style="width: 100%" border>
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
                    <el-button @click="dialogDetailsApplyTwoVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogDetailsApplyTwoVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
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
        </el-tab-pane>
        <el-tab-pane label="已拒绝" name="refuse">
          <div v-if="applyExamList.length == 0" style="text-align: center;">
            <p>{{applyExamMsg}}</p>
          </div>
          <div v-else>
            <div v-for="history in applyExamList" :key="history.id">
              <div style="display: flex;justify-content: space-between;">
                <div style="display: flex;">
                  <p><span style="font-size: 18px;font-weight: bold;">申请人：</span>{{history.applyName}}
                  </p>
                  <p style="margin-left: 20px;"><span
                      style="font-size: 18px;font-weight: bold;">申请时间：</span>{{history.subTime}}
                  </p>
                  <p style="margin-left: 20px;"><span
                      style="font-size: 18px;font-weight: bold;">审批时间：</span>{{history.checkTime}}
                  </p>
                </div>
                <el-button type="text" @click="detailsApplyThree(history)">详情</el-button>
                <el-dialog title="申请单详情" :visible.sync="dialogDetailsApplyThreeVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true" width="750px">
                  <div>
                    <p>申请人：{{applyDetailsThree.applyName}}</p>
                    <p>申请时间：{{applyDetailsThree.subTime}}</p>
                    <p>备注：{{applyDetailsThree.applyNote}}</p>
                    <p>审批人：{{applyDetailsThree.checkName}}</p>
                    <p>审批时间：{{applyDetailsThree.checkTime}}</p>
                    <p>拒绝原因：{{applyDetailsThree.refuseNote}}</p>
                    <p>设备列表：</p>
                    <el-table :data="applyDetailsThree.deviceList" style="width: 100%" border>
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
                    <el-button @click="dialogDetailsApplyThreeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogDetailsApplyThreeVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeBonusName: 'notCheck',
        keyword: '',
        userId: '',
        peopleList: [],
        startTime: '',
        endTime: '',
        page: 1,
        pageNum: 10,
        total: 0,
        applyExamList: [],
        applyExamMsg: '数据加载中',
        dialogDetailsApplyVisible: false,
        applyDetailsOne: {},

        applyDeltail: {},
        dialogExamApplyVisible: false,
        state: '1',
        refuseNote: '',

        applyDetailsTwo: {},
        dialogDetailsApplyTwoVisible: false,

        applyDetailsThree: {},
        dialogDetailsApplyThreeVisible: false,

      }
    },
    created() {
      this.getApplicantList();
      this.examKeywordCheck();
    },
    methods: {
      // 审批
      examApply(details) {
        this.applyDeltail = details;
        this.dialogExamApplyVisible = true;
        this.state = '1';
        this.refuseNote = '';
      },
      // 确定
      examApplySure() {
        let params;
        if (this.state == 1) {
          params = {
            id: this.applyDeltail.id,
            state: this.state
          };
        } else {
          params = {
            id: this.applyDeltail.id,
            state: this.state,
            refuseNote: this.refuseNote
          };
        }
        this.$axios.post(this.$store.state.baseUrl + '/checkApply', params).then(res => {
          console.log('审批申请');
          console.log(res);
          this.$message.success({
            message: '审批成功',
            showClose: true,
            duration: 2000
          });
          this.dialogExamApplyVisible = false;
          this.examKeywordCheck();
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogExamApplyVisible = false;
        })
      },
      // 查看详情
      detailsApply(details) {
        console.log(details);
        this.applyDetailsOne = details;
        this.dialogDetailsApplyVisible = true;
      },
      detailsApplyTwo(details) {
        console.log(details);
        this.applyDetailsTwo = details;
        this.dialogDetailsApplyTwoVisible = true;
      },
      detailsApplyThree(details) {
        console.log(details);
        this.applyDetailsThree = details;
        this.dialogDetailsApplyThreeVisible = true;
      },
      // 获取申请列表
      examKeywordCheck() {
        this.applyExamList = [];
        this.applyExamMsg = '数据加载中';
        this.$axios.post(this.$store.state.baseUrl + '/applyList', {
          flag: 1,
          state: this.activeBonusName == 'notCheck' ? 0 : (this.activeBonusName == 'checked' ? 1 : -1),
          userId: this.userId,
          startTime: this.startTime,
          endTime: this.endTime,
          keyword: this.keyword,
          page: this.page,
          pageNum: this.pageNum
        }).then(res => {
          console.log('申请列表');
          console.log(res);
          this.applyExamList = res.data.list;
          this.total = res.data.total;
          if (this.applyExamList.length == 0) {
            this.applyExamMsg = '暂无数据';
          };
          if (this.activeBonusName == 'notCheck') {
            if (this.applyExamList.length !== 0) {
              this.$emit('notCheck', 0);
            } else {
              this.$emit('notCheck', 1);
            }
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
        this.examKeywordCheck();
      },
      // 获取申请人列表
      getApplicantList() {
        this.$axios.post(this.$store.state.baseUrl + '/applicantList').then(res => {
          console.log('申请人');
          console.log(res);
          this.peopleList = res.data;
        })
      },

      handleBonusTabsClick() {
        this.page = 1;
        this.examKeywordCheck();
      },

    }
  }
</script>
<style lang="scss" scoped>
  .materials-examination-container {
    .examination-top {
      margin-bottom: 20px;
      padding: 23px 10px;
      padding-bottom: 0;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: #aaa;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
  }
</style>