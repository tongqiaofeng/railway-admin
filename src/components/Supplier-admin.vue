<template>
  <div class="supplier-admin-page-container" id="supplier-admin-page">
    <!-- <p>供应商管理</p> -->
    <div class="manufacturers-select">
      <p class="top-font">厂家列表</p>
      <div>
        <el-form :model="ruleForm" :rules="rules" ref="supplierForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="名称：" prop="name">
            <el-input v-model="ruleForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="addr">
            <div style="display: flex;">
              <el-input v-model="ruleForm.addr" clearable></el-input>
              <el-button style="width: 110px;margin-left: 10px;" type="primary" size="medium"
                @click="supplierAdd('supplierForm')" v-preventClick>+ 新 建
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="supplierList" style="width: 100%" border row-key="id" highlight-current-row
          @current-change="supplierChange" ref="supplierTable">
          <el-table-column prop="name" label="厂家名称" width="width">
          </el-table-column>
          <el-table-column prop="address" label="联系地址" width="width">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <div class="cell-work">
                <el-button type="text" @click="supplierUpdate(scope.row)">
                  修改
                </el-button>
                <el-dialog title="修改厂家信息" :visible.sync="dialogSupplierUpdateVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <el-form label-width="55px">
                    <el-form-item label="名称：">
                      <el-input v-model="supplierUpdateDetails.name" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="地址：">
                      <el-input v-model="supplierUpdateDetails.address" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogSupplierUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="supplierUpdateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" style="color: red;" @click="supplierDelete(scope.row)">删除
                </el-button>
                <el-dialog title="删除厂家" :visible.sync="dialogSupplierDeleteVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该厂家？删除后不可修改</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogSupplierDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="supplierDeleteSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="system-select">
      <p class="top-font">系统列表</p>
      <div>
        <el-form :model="systemForm" :rules="systemRules" ref="systemForm" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="系统名称：" prop="name" label-width="95px">
                <el-input v-model="systemForm.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人：" prop="contactName" label-width="80px">
                <el-input v-model="systemForm.contactName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="联系电话：" prop="phoneNumber" label-width="95px">
            <div style="display: flex;">
              <el-input v-model="systemForm.phoneNumber" clearable></el-input>
              <el-button type="primary" style="width: 110px;margin-left: 10px;" size="medium"
                @click="systemAdd('systemForm')" v-preventClick>+ 新 建
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="systemSelectList" style="width: 100%" border highlight-current-row row-key="id"
          @current-change="systemChange" ref="systemTable">
          <el-table-column prop="name" label="系统名称" width="width">
          </el-table-column>
          <el-table-column prop="contactName" label="联系人" width="width">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="联系电话" width="width">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <div class="cell-work">
                <el-button type="text" @click="systemUpdate(scope.row)">
                  修改
                </el-button>
                <el-dialog title="修改系统信息" :visible.sync="dialogSystemUpdateVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <el-form label-width="82px">
                    <el-form-item label="系统名称：">
                      <el-input v-model="systemUpdateDetail.name" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                      <el-input v-model="systemUpdateDetail.contactName" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                      <el-input v-model="systemUpdateDetail.phoneNumber" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogSystemUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="systemUpdateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" style="color: red;" @click="systemDelete(scope.row)">删除
                </el-button>
                <el-dialog title="删除系统" :visible.sync="dialogSystemDeleteVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该系统？删除后不可修改</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogSystemDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="systemDeleteSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="equipment-select">
      <p class="top-font">设备列表</p>
      <div>
        <el-form :model="deviceForm" :rules="deviceRules" ref="deviceForm" class="demo-ruleForm">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="设备名称：" prop="name" label-width="95px">
                <el-input v-model="deviceForm.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="型号：" prop="model" label-width="65px">
                <el-input v-model="deviceForm.model" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="报警数量：" label-width="95px">
            <div style="display: flex;">
              <el-input v-model="deviceForm.warnNumber" clearable></el-input>
              <el-button style="width: 110px;margin-left: 10px;" type="primary" size="medium"
                @click="deviceAdd('deviceForm')" v-preventClick>+ 新 建
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="deviceSelectList" style="width: 100%" border highlight-current-row row-key="id"
          @current-change="deviceChange" ref="deviceTable">
          <el-table-column prop="name" label="设备名称" width="width">
          </el-table-column>
          <el-table-column prop="model" label="型号" width="width">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <div class="cell-work">
                <el-button type="text" @click="deviceUpdate(scope.row)">
                  修改
                </el-button>
                <el-dialog title="修改设备信息" :visible.sync="dialogDeviceUpdateVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <el-form label-width="82px">
                    <el-form-item label="设备名称：">
                      <el-input v-model="deviceUpdateDetail.name" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="型号：">
                      <el-input v-model="deviceUpdateDetail.model" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="报警数量：">
                      <el-input v-model="deviceUpdateDetail.warnNumber" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogDeviceUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deviceUpdateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" style="color: red;" @click="deviceDelete(scope.row)">删除
                </el-button>
                <el-dialog title="删除系统" :visible.sync="dialogDeviceDeleteVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该设备？删除后不可修改</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogDeviceDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deviceDeleteSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        supplierList: [],
        supplierDetail: {},
        systemList: [],
        deviceList: [],
        systemSelectList: [],
        deviceSelectList: [],
        ruleForm: {
          name: '',
          addr: '',
        },
        rules: {
          name: [{
            required: true,
            message: '请输入厂家名称',
            trigger: 'blur'
          }],
          addr: [{
            required: true,
            message: '请输入厂家地址',
            trigger: 'blur'
          }],
        },
        systemForm: {
          name: '',
          contactName: '',
          phoneNumber: ''
        },
        systemRules: {
          name: [{
            required: true,
            message: '请输入系统名称',
            trigger: 'blur'
          }],
          contactName: [{
            required: true,
            message: '请输入联系人',
            trigger: 'blur'
          }],
          phoneNumber: [{
            message: '请输入联系电话',
            trigger: 'blur'
          }]
        },
        systemDetail: {},
        deviceDetail: {},
        deviceForm: {
          name: '',
          model: '',
          warnNumber: ''
        },
        deviceRules: {
          name: [{
            required: true,
            message: '请输入设备名称',
            trigger: 'blur'
          }],
          model: [{
            required: true,
            message: '请输入型号',
            trigger: 'blur'
          }]
        },
        dialogSupplierUpdateVisible: false,
        supplierUpdateDetails: {},
        dialogSupplierDeleteVisible: false,
        dialogSystemUpdateVisible: false,
        systemUpdateDetail: {},
        dialogSystemDeleteVisible: false,
        dialogDeviceUpdateVisible: false,
        deviceUpdateDetail: {},
        dialogDeviceDeleteVisible: false,

      }
    },
    created() {
      this.getSupplierList();
    },
    methods: {
      // 设备选择
      deviceChange(val) {
        console.log(val);
        if (val !== null) {
          this.deviceDetail = val;
        }
      },
      // 设备增加
      deviceAdd(formName) {
        console.log(formName);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
              type: 2,
              device: {
                parentId: this.systemDetail.id,
                name: this.deviceForm.name,
                model: this.deviceForm.model,
                warnNumber: this.deviceForm.warnNumber
              }
            }).then((res) => {
              console.log('新增设备');
              console.log(res);
              this.$message.success({
                message: '新建成功',
                showClose: true,
                duration: 2000
              });
              this.deviceForm.name = '';
              this.deviceForm.model = '';
              this.deviceForm.warnNumber = '';
              this.getSupplierList();
            }).catch((err) => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 修改
      deviceUpdate(value) {
        this.deviceUpdateDetail = value;
        this.dialogDeviceUpdateVisible = true;
      },
      // 确定修改
      deviceUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
          type: 2,
          device: {
            id: this.deviceUpdateDetail.id,
            parentId: this.systemDetail.id,
            name: this.deviceUpdateDetail.name,
            model: this.deviceUpdateDetail.model,
            warnNumber: this.deviceUpdateDetail.warnNumber
          }
        }).then((res) => {
          console.log('修改设备');
          console.log(res);
          this.$message.success({
            message: '修改成功',
            showClose: true,
            duration: 2000
          });
          this.getSupplierList();
          this.dialogDeviceUpdateVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogDeviceUpdateVisible = false;
        });
      },
      // 删除
      deviceDelete() {
        this.dialogDeviceDeleteVisible = true;
      },
      // 确定删除
      deviceDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierDelete', {
          id: this.deviceDetail.id,
        }).then((res) => {
          console.log('删除设备');
          console.log(res);
          this.$message.success({
            message: '删除成功',
            showClose: true,
            duration: 2000
          });
          this.deviceDetail = {};
          this.getSupplierList();
          this.dialogDeviceDeleteVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogDeviceDeleteVisible = false;
        });
      },
      // 系统选择
      systemChange(val) {
        console.log(val);
        if (val !== null) {
          this.systemDetail = val;

          this.deviceSelectList = [];
          for (const sys of this.deviceList) {
            if (sys.parentId == this.systemDetail.id) {
              this.deviceSelectList.push(sys);
            }
          };
          console.log(this.deviceSelectList);
          this.deviceForm.name = '';
          this.deviceForm.model = '';
        }
      },
      // 系统增加
      systemAdd(formName) {
        console.log(formName);
        console.log(this.$refs.supplierTable);
        console.log(this.supplierDetail);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
              type: 1,
              system: {
                parentId: this.supplierDetail.id,
                name: this.systemForm.name,
                contactName: this.systemForm.contactName,
                phoneNumber: this.systemForm.phoneNumber
              }
            }).then((res) => {
              console.log('新增系统');
              console.log(res);
              this.$message.success({
                message: '新建成功',
                showClose: true,
                duration: 2000
              });
              this.systemForm.name = '';
              this.systemForm.contactName = '';
              this.systemForm.phoneNumber = '';
              this.getSupplierList();
            }).catch((err) => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 修改
      systemUpdate(value) {
        this.systemUpdateDetail = value;
        this.dialogSystemUpdateVisible = true;
      },
      // 确定修改
      systemUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
          type: 1,
          system: {
            id: this.systemUpdateDetail.id,
            parentId: this.supplierDetail.id,
            name: this.systemUpdateDetail.name,
            contactName: this.systemUpdateDetail.contactName,
            phoneNumber: this.systemUpdateDetail.phoneNumber
          }
        }).then((res) => {
          console.log('修改系统');
          console.log(res);
          this.$message.success({
            message: '修改成功',
            showClose: true,
            duration: 2000
          });
          this.getSupplierList();
          this.dialogSystemUpdateVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogSystemUpdateVisible = false;
        });
      },
      // 删除
      systemDelete() {
        this.dialogSystemDeleteVisible = true;
      },
      // 确定删除
      systemDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierDelete', {
          id: this.systemDetail.id,
        }).then((res) => {
          console.log('删除系统');
          console.log(res);
          this.$message.success({
            message: '删除成功',
            showClose: true,
            duration: 2000
          });
          this.systemDetail = {};
          this.deviceSelectList = [];
          this.getSupplierList();
          this.dialogSystemDeleteVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogSystemDeleteVisible = false;
        });
      },
      // 厂家选择
      supplierChange(val) {
        console.log(val);
        if (val !== null) {
          this.supplierDetail = val;
          this.systemSelectList = [];
          for (const sys of this.systemList) {
            if (sys.parentId == this.supplierDetail.id) {
              this.systemSelectList.push(sys);
            }
          };
          console.log(this.systemSelectList);
          this.systemForm.name = '';
          this.systemForm.contactName = '';
          this.systemForm.phoneNumber = '';
          this.deviceForm.name = '';
          this.deviceForm.model = '';
          this.deviceSelectList = [];
        }
      },
      // 删除厂家
      supplierDelete() {
        this.dialogSupplierDeleteVisible = true;
      },
      // 确定删除
      supplierDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierDelete', {
          id: this.supplierDetail.id,
        }).then((res) => {
          console.log('删除供应商');
          console.log(res);
          this.$message.success({
            message: '删除成功',
            showClose: true,
            duration: 2000
          });
          this.supplierDetail = {};
          this.systemSelectList = [];
          this.deviceSelectList = [];
          this.getSupplierList();
          this.dialogSupplierDeleteVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogSupplierDeleteVisible = false;
        });
      },
      // 修改厂家
      supplierUpdate(value) {
        console.log(value);
        this.supplierUpdateDetails = value;
        this.dialogSupplierUpdateVisible = true;
      },
      // 确定修改
      supplierUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
          type: 0,
          supplier: {
            id: this.supplierUpdateDetails.id,
            name: this.supplierUpdateDetails.name,
            address: this.supplierUpdateDetails.address
          }
        }).then((res) => {
          console.log('修改供应商');
          console.log(res);
          this.$message.success({
            message: '修改成功',
            showClose: true,
            duration: 2000
          });
          this.getSupplierList();
          this.dialogSupplierUpdateVisible = false;
        }).catch((err) => {
          console.log(err);
          this.dialogSupplierUpdateVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 新增厂家
      supplierAdd(formName) {
        console.log(formName);
        console.log(this.$refs[formName]);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$axios.post(this.$store.state.baseUrl + '/supplierSave', {
              type: 0,
              supplier: {
                name: this.ruleForm.name,
                address: this.ruleForm.addr
              }
            }).then((res) => {
              console.log('新增供应商');
              console.log(res);
              this.$message.success({
                message: '新建成功',
                showClose: true,
                duration: 2000
              });
              this.ruleForm.name = '';
              this.ruleForm.addr = '';
              this.getSupplierList();
            }).catch((err) => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取供应商信息
      getSupplierList() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierList').then((res) => {
          console.log('供应商列表');
          console.log(res);
          this.supplierList = res.data.supplierList;
          this.systemList = res.data.systemList;
          this.deviceList = res.data.deviceList;
          if (this.supplierDetail !== null && JSON.stringify(this.supplierDetail) !== "{}") {
            console.log(this.supplierDetail);
            for (const supp of this.supplierList) {
              if (supp.id == this.supplierDetail.id) {
                this.supplierDetail = supp;
              }
            };
            this.$nextTick(() => {
              this.supplierChange(this.supplierDetail);
              console.log(this.$refs.supplierTable);
              console.log(this.supplierDetail);
              this.$refs.supplierTable.setCurrentRow(this.supplierDetail);
            })
          };
          if (this.systemDetail !== null && JSON.stringify(this.systemDetail) !== "{}") {
            console.log(this.systemDetail);
            for (const supp of this.systemList) {
              if (supp.id == this.systemDetail.id) {
                this.systemDetail = supp;
              }
            };
            this.$nextTick(() => {
              this.systemChange(this.systemDetail);
              console.log(this.$refs.systemTable);
              console.log(this.systemDetail);
              this.$refs.systemTable.setCurrentRow(this.systemDetail);
            })
          };
          if (this.deviceDetail !== null && JSON.stringify(this.deviceDetail) !== "{}") {
            console.log(this.deviceDetail);
            for (const supp of this.deviceList) {
              if (supp.id == this.deviceDetail.id) {
                this.deviceDetail = supp;
              }
            };
            this.$nextTick(() => {
              this.deviceChange(this.deviceDetail);
              console.log(this.$refs.deviceTable);
              console.log(this.deviceDetail);
              this.$refs.deviceTable.setCurrentRow(this.deviceDetail);
            })
          };
        }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .supplier-admin-page-container {
    display: flex;
    justify-content: space-between;

    .top-font {
      margin-top: 0;
      color: #6a6a6a;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }

    .manufacturers-select,
    .system-select,
    .equipment-select {
      width: 31.5%;
      padding: 20px 10px 20px;
      background-color: #fff;
      border-radius: 5px;
    }

    .cell-work {
      width: 100%;
      display: flex;
      justify-content: space-around !important;
    }
  }
</style>
<style lang="scss">
  #supplier-admin-page {
    .el-table .cell {
      display: flex;
    }
  }

  #addButton {
    .el-button--medium {
      height: 40px;
      padding: 10px 0;
    }
  }
</style>