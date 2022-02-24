<template>
  <div class="user-admin-container" id="user-admin">
    <!-- <h1>用户管理</h1> -->
    <div class="user-edit">
      <el-form label-position="right" :model="userFormData" :rules="userRules" ref="userForm" label-width="130px"
        class="demo-ruleForm">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="userFormData.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名：" prop="user">
          <el-input v-model="userFormData.user" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="psw">
          <el-input v-model="userFormData.psw" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属部门：" prop="wid">
          <el-cascader style="width: 100%;" ref="menuCascader" v-model="userFormData.wid" :options="menuList"
            :props="propsMenu" :show-all-levels="false" clearable @change="menuChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="申请权限：">
          <el-switch v-model="userFormData.isApply" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="审批权限：">
          <el-switch v-model="userFormData.isCheck" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="系统管理员权限：">
          <el-switch v-model="userFormData.isAdmin" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item>
          <div style="margin-right: 30px;text-align: right;">
            <el-button type="primary" @click="userAdd('userForm')" v-preventClick>+ 新 建</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-table">
      <!-- @current-change="userChange" -->
      <el-table :data="staffList" style="width: 100%" border row-key="id" highlight-current-row>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="user" label="用户名">
        </el-table-column>
        <el-table-column prop="deptName" label="所属部门">
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <div class="cell-work">
              <el-button type="text" @click="userUpdate(scope.row)">
                修改
              </el-button>
              <el-dialog title="修改员工信息" :visible.sync="dialogUserUpdateVisible" :close-on-press-escape="false"
                :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                <el-form label-width="125px" label-position="left">
                  <el-form-item label="姓名：" prop="name">
                    <el-input v-model="updateDetail.name" clearable class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名：" prop="user">
                    <el-input v-model="updateDetail.user" clearable class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="密码：" prop="psw">
                    <el-input v-model="updateDetail.psw" clearable class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="所属部门：" prop="wid">
                    <el-cascader ref="menuCascader" v-model="updateDetail.wid" :options="menuList" :props="propsMenu"
                      :show-all-levels="false" clearable @change="menuChange" class="input-style">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="申请权限：">
                    <el-switch v-model="updateDetail.isApply" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="审批权限：">
                    <el-switch v-model="updateDetail.isCheck" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                  <el-form-item label="系统管理员权限：">
                    <el-switch v-model="updateDetail.isAdmin" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogUserUpdateVisible = false">取 消</el-button>
                  <el-button type="primary" @click="userUpdateSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
              <el-button type="text" style="margin-left: 15px;color: red;" @click="userDelete(scope.row)">删除
              </el-button>
              <el-dialog title="删除员工" :visible.sync="dialogUserDeleteVisible" :close-on-press-escape="false"
                :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                <div style="text-align: center;">
                  <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该员工？删除后不可修改</p>
                </div>
                <div slot="footer">
                  <el-button @click="dialogUserDeleteVisible = false">取 消</el-button>
                  <el-button type="primary" @click="userDeleteSure" v-preventClick>确 定</el-button>
                </div>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userFormData: {
          name: '',
          user: '',
          psw: '',
          wid: '',
          deptName: '',
          isApply: false,
          isCheck: false,
          isAdmin: false,
        },
        propsMenu: {
          checkStrictly: true,
          emitPath: false,
          value: 'id',
          label: 'label'
        },
        userRules: {
          name: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          user: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          wid: [{
            required: true,
            message: '请选择所属部门',
            trigger: ['change']
          }]
        },
        menuList: [],
        staffList: [],
        userDetails: {},
        updateDetail: {},
        dialogUserUpdateVisible: false,
        deleteDetail: {},
        dialogUserDeleteVisible: false,

      }
    },
    created() {
      this.getWarehouseList();
      this.getStaffList();
    },
    methods: {
      // 新增用户
      userAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$store.state.baseUrl + '/staffSave', {
              name: this.userFormData.name,
              user: this.userFormData.user,
              psw: this.userFormData.psw,
              wid: this.userFormData.wid,
              deptName: this.userFormData.deptName,
              isApply: this.userFormData.isApply == false ? 0 : 1,
              isCheck: this.userFormData.isCheck == false ? 0 : 1,
              isAdmin: this.userFormData.isAdmin == false ? 0 : 1,
            }).then((res) => {
              console.log('新增员工');
              console.log(res);
              this.$message.success({
                message: '添加成功',
                showClose: true,
                duration: 2000
              });
              this.userFormData.name = '';
              this.userFormData.user = '';
              this.userFormData.psw = '';
              this.userFormData.wid = '';
              this.userFormData.deptName = '';
              this.userFormData.isApply = false;
              this.userFormData.isCheck = false;
              this.userFormData.isAdmin = false;
              this.getStaffList();
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
      userUpdate(val) {
        this.updateDetail = val;
        this.updateDetail.isApply = this.updateDetail.isApply == 0 ? false : true;
        this.updateDetail.isCheck = this.updateDetail.isCheck == 0 ? false : true;
        this.updateDetail.isAdmin = this.updateDetail.isAdmin == 0 ? false : true;
        this.dialogUserUpdateVisible = true;
      },
      // 确定修改
      userUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/staffSave', {
          id: this.updateDetail.id,
          name: this.updateDetail.name,
          user: this.updateDetail.user,
          psw: this.updateDetail.psw,
          wid: this.updateDetail.wid,
          deptName: this.updateDetail.deptName,
          isApply: this.updateDetail.isApply == false ? 0 : 1,
          isCheck: this.updateDetail.isCheck == false ? 0 : 1,
          isAdmin: this.updateDetail.isAdmin == false ? 0 : 1,
        }).then((res) => {
          console.log('修改员工');
          console.log(res);
          this.$message.success({
            message: '修改成功',
            showClose: true,
            duration: 2000
          });
          this.getStaffList();
          this.dialogUserUpdateVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogUserUpdateVisible = false;
        });
      },
      // 删除
      userDelete(val) {
        this.deleteDetail = val;
        this.dialogUserDeleteVisible = true;
      },
      // 确定删除
      userDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/staffDelete', {
          id: this.deleteDetail.id
        }).then((res) => {
          console.log('删除员工');
          console.log(res);
          this.$message.success({
            message: '删除成功',
            showClose: true,
            duration: 2000
          });
          this.getStaffList();
          this.dialogUserDeleteVisible = false;
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogUserDeleteVisible = false;
        });
      },
      // 选择用户
      userChange(value) {
        console.log(value);
        // this.userDetails = value;
        // this.userFormData.name = this.userDetails.name;
        // this.userFormData.user = this.userDetails.user;
        // this.userFormData.psw = this.userDetails.psw;
        // this.userFormData.wid = this.userDetails.wid;
        // this.userFormData.deptName = this.userDetails.deptName;
        // this.userFormData.isApply = this.userDetails.isApply == 0 ? false : true;
        // this.userFormData.isCheck = this.userDetails.isCheck == 0 ? false : true;
        // this.userFormData.isAdmin = this.userDetails.isAdmin == 0 ? false : true;
      },
      // 部门选择
      menuChange() {
        this.$refs.menuCascader.dropDownVisible = false;
        console.log(this.userFormData.wid);
        this.userFormData.deptName = this.$refs['menuCascader'].getCheckedNodes()[0].data;
        console.log(this.userFormData.deptName);
      },
      // 获取员工列表
      getStaffList() {
        this.$axios.post(this.$store.state.baseUrl + '/staffList').then((res) => {
          console.log('员工列表');
          console.log(res);
          this.staffList = res.data;
        }).catch((err) => {
          console.log(err);
        });
      },
      // 获取部门列表
      getWarehouseList() {
        this.$axios.post(this.$store.state.baseUrl + '/menuWarehouseList').then((res) => {
          console.log('部门列表');
          console.log(res);
          this.menuList = res.data.menuList;
        }).catch((err) => {
          console.log(err);
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .user-admin-container {
    display: flex;

    .user-edit {
      width: 510px;
      padding: 10px;
      background-color: #fff;
      border-radius: 6px;
    }


    .user-table {
      width: 610px;
      margin-left: 15px;
      padding: 10px;
      background-color: #fff;
      border-radius: 6px;
    }
  }

  .input-style {
    width: 100%;
  }
</style>
<style lang="scss">
  #user-admin {
    .el-form-item__content {
      text-align: left;
    }
  }
</style>