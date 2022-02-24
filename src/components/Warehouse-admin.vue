<template>
  <div class="warehouse-admin-page-container" id="warehouse-admin-page">
    <!-- <p>仓库管理</p> -->
    <div class="department-select">
      <div class="department-top" style="line-height: 48px;">部门选择</div>
      <!-- default-expand-all -->
      <el-table :data="departmentData" style="width: 100%;" :row-key="getRowKeys" :expand-row-keys="expands" border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" highlight-current-row
        @current-change="handleCurrentChange" ref="departmentTable" @expand-change="rowClick">
        <el-table-column prop="label" label="部门名称" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 5px">{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="label" label="绑定仓库数量" width="105px" align="center">
          <template slot-scope="scope">
            <div style="width: 120px;text-align: center;">{{scope.row.warehouseTotal}}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="binding-warehouse-select">
      <div class="department-top" style="display: flex;justify-content: space-between;">
        <p style="width: 72px;margin: 0;line-height: 48px;">绑定仓库</p>
        <div style="display: flex;justify-content: flex-end;">
          <el-input style="width: 170px;" v-model="warehouseName" placeholder="请输入仓库名称" clearable></el-input>
          <el-select style="width: 120px;margin-left: 10px;" v-model="type" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" style="width: 80px;height: 40px;margin-left: 10px;"
            @click="bindingWarehouseAdd">+ 添加
          </el-button>
        </div>
      </div>
      <div class="binding-warehouse-every">
        <el-table :data="bindingWarehouseList" style="width: 100%" border>
          <el-table-column prop="name" label="仓库名称">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="仓库类型">
            <template slot-scope="scope">
              <div>{{scope.row.type == 1 ? '料库' : (scope.row.type == 2 ? '机械室' : (scope.row.type == 3 ? '应急' : ''))}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <div class="cell-work">
                <el-button type="text" @click="bindingRemove(scope.row)">解绑</el-button>
                <el-dialog title="解绑仓库" :visible.sync="dialogBindingRemoveVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定解除该仓库的绑定？</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogBindingRemoveVisible = false">取 消</el-button>
                    <el-button type="primary" @click="bindingRemoveSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" @click="bindingUpdate(scope.row)">
                  编辑
                </el-button>
                <el-dialog title="修改仓库信息" :visible.sync="dialogBindingUpdateVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <el-form label-width="82px">
                    <el-form-item label="仓库名称：">
                      <el-input v-model="bindingUpdateWarehouse.name" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库类型：">
                      <el-select style="width: 100%;" v-model="bindingUpdateWarehouse.type" placeholder="请选择">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogBindingUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="bindingUpdateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" style="color: red;" @click="bindingDelete(scope.row)">删除
                </el-button>
                <el-dialog title="删除仓库" :visible.sync="dialogBindingDeleteVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该仓库？删除后不可修改</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogBindingDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="bindingDeleteSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="unbinding-warehouse-select">
      <div class="department-top" style="display: flex;justify-content: space-between;">
        <p style="margin: 0;line-height: 48px;">未绑定仓库</p>
        <div style="display: flex;justify-content: flex-end;">
          <el-input style="width: 170px;" v-model="unWarehouseName" placeholder="请输入仓库名称" clearable></el-input>
          <el-select style="width: 120px;margin-left: 10px;" v-model="unWarehouseType" placeholder="请选择">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="small" style="width: 80px;height: 40px;margin-left: 10px;"
            @click="unBindingWarehouseAdd">+ 添加
          </el-button>
        </div>
      </div>
      <div class="binding-warehouse-every">
        <el-table :data="unBindingWarehouseList" style="width: 100%" border>
          <el-table-column prop="name" label="仓库名称">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="仓库类型">
            <template slot-scope="scope">
              <div>{{scope.row.type == 1 ? '料库' : (scope.row.type == 2 ? '机械室' : (scope.row.type == 3 ? '应急' : ''))}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <div class="cell-work">
                <el-button type="text" @click="unBindingRemove(scope.row)">绑定</el-button>
                <el-dialog title="绑定仓库" :visible.sync="dialogUnBindingRemoveVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定绑定该仓库？</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogUnBindingRemoveVisible = false">取 消</el-button>
                    <el-button type="primary" @click="unBindingRemoveSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" @click="unBindingUpdate(scope.row)">
                  编辑
                </el-button>
                <el-dialog title="修改仓库信息" :visible.sync="dialogUnBindingUpdateVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <el-form label-width="82px">
                    <el-form-item label="仓库名称：">
                      <el-input v-model="unBindingUpdateWarehouse.name" style="width: 100%;"></el-input>
                    </el-form-item>
                    <el-form-item label="仓库类型：">
                      <el-select style="width: 100%;" v-model="unBindingUpdateWarehouse.type" placeholder="请选择">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogUnBindingUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="unBindingUpdateSure" v-preventClick>确 定</el-button>
                  </div>
                </el-dialog>
                <el-button type="text" style="color: red;" @click="unBindingDelete(scope.row)">
                  删除
                </el-button>
                <el-dialog title="删除仓库" :visible.sync="dialogUnBindingDeleteVisible" :close-on-press-escape="false"
                  :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                  <div style="text-align: center;">
                    <p style="margin-top: 10px;margin-bottom: 0;font-size: 16px;color: #4e4e4e;">确定删除该仓库？删除后不可修改</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogUnBindingDeleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="unBindingDeleteSure" v-preventClick>确 定</el-button>
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
        departmentData: [],
        warehouseList: [],
        departmentSelected: {},
        binding: true,
        warehouseName: '',
        bindingWarehouseList: [],
        unBindingWarehouseList: [],
        unWarehouseName: '',
        dialogBindingRemoveVisible: false,
        bindingRemoveWarehouse: {},
        dialogBindingUpdateVisible: false,
        bindingUpdateWarehouse: {},
        dialogBindingDeleteVisible: false,
        bindingDeleteWarehouse: {},
        dialogUnBindingRemoveVisible: false,
        unBindingRemoveWarehouse: {},
        dialogUnBindingUpdateVisible: false,
        unBindingUpdateWarehouse: {},
        dialogUnBindingDeleteVisible: false,
        unBindingDeleteWarehouse: {},

        expands: [],
        getRowKeys(row) {
          // console.log(row);
          return row.id;
        },

        type: '',
        unWarehouseType: '',
        typeList: [{
          id: 1,
          name: '料库'
        }, {
          id: 2,
          name: '机械室'
        }, {
          id: 3,
          name: '应急'
        }, ],
      }
    },
    created() {
      this.$axios.post(this.$store.state.baseUrl + '/menuWarehouseList').then((res) => {
        console.log('仓库列表');
        console.log(res);
        this.warehouseList = res.data.warehouseList;
        this.$axios.post(this.$store.state.baseUrl + '/userDeptList').then((res) => {
          console.log('用户部门列表');
          console.log(res);
          this.departmentData = res.data;
          this.handleCurrentChange(this.departmentData[0]);
          this.$nextTick(() => {
            console.log(this.$refs.departmentTable);
            this.$refs.departmentTable.setCurrentRow(this.departmentData[0]);
            // this.expands = [];
            // console.log('0000000003333333=========');
            // console.log(this.departmentData[0].children[0].id);
            // this.expands.push(this.departmentData[0].children[0].id);
            // console.log(this.expands);
            // this.expands = ['9'];
          })
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    methods: {
      // 未绑定仓库新增
      unBindingWarehouseAdd() {
        if (this.unWarehouseName == '' || this.unWarehouseType == '') {
          this.$message.warning({
            message: '数据不能为空',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
            name: this.unWarehouseName,
            type: this.unWarehouseType
          }).then((res) => {
            console.log('新增未绑定仓库成功');
            console.log(res);
            this.$message.success({
              message: '未绑定仓库新增成功',
              showClose: true,
              duration: 2000
            });
            this.unWarehouseName = '';
            this.unWarehouseType = '';
            this.getMenuWarehouseList();
          }).catch((err) => {
            console.log('新增未绑定仓库失败');
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
        }
      },
      // 绑定仓库
      unBindingRemove(val) {
        this.unBindingRemoveWarehouse = val;
        this.dialogUnBindingRemoveVisible = true;
        console.log(val);
        console.log(this.departmentSelected);
      },
      // 确定绑定
      unBindingRemoveSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
          id: this.unBindingRemoveWarehouse.id,
          wid: this.departmentSelected.id
        }).then((res) => {
          console.log('绑定仓库');
          console.log(res);
          this.$message.success({
            message: '绑定成功',
            showClose: true,
            duration: 2000
          });
          this.dialogUnBindingRemoveVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogUnBindingRemoveVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 未绑定仓库修改
      unBindingUpdate(val) {
        this.unBindingUpdateWarehouse = val;
        console.log(val);
        this.dialogUnBindingUpdateVisible = true;
      },
      // 确定修改
      unBindingUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
          id: this.unBindingUpdateWarehouse.id,
          name: this.unBindingUpdateWarehouse.name,
          type: this.unBindingUpdateWarehouse.type
        }).then((res) => {
          console.log('修改仓库');
          console.log(res);
          this.$message.success({
            message: '仓库信息修改成功',
            showClose: true,
            duration: 2000
          });
          this.dialogUnBindingUpdateVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogUnBindingUpdateVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 未绑定仓库删除
      unBindingDelete(val) {
        console.log(val);
        this.unBindingDeleteWarehouse = val;
        this.dialogUnBindingDeleteVisible = true;
      },
      // 确定删除
      unBindingDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseDelete', {
          id: this.unBindingDeleteWarehouse.id
        }).then((res) => {
          console.log('删除仓库');
          console.log(res);
          this.$message.success({
            message: '仓库删除成功',
            showClose: true,
            duration: 2000
          });
          this.dialogUnBindingDeleteVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogUnBindingDeleteVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 绑定仓库新增
      bindingWarehouseAdd() {
        if (this.warehouseName == '' || this.type == '') {
          this.$message.warning({
            message: '数据不能为空',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
            wid: this.departmentSelected.id,
            name: this.warehouseName,
            type: this.type
          }).then((res) => {
            console.log('新增绑定仓库成功');
            console.log(res);
            this.$message.success({
              message: '绑定仓库新增成功',
              showClose: true,
              duration: 2000
            });
            this.warehouseName = '';
            this.type = '';
            this.getMenuWarehouseList();
          }).catch((err) => {
            console.log('新增绑定仓库失败');
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
        }
      },
      // 绑定仓库解绑
      bindingRemove(val) {
        this.bindingRemoveWarehouse = val;
        this.dialogBindingRemoveVisible = true;
        console.log(val);
      },
      // 确定解绑
      bindingRemoveSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
          id: this.bindingRemoveWarehouse.id
        }).then((res) => {
          console.log('解绑仓库');
          console.log(res);
          this.$message.success({
            message: '解除绑定成功',
            showClose: true,
            duration: 2000
          });
          this.dialogBindingRemoveVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogBindingRemoveVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 绑定仓库修改
      bindingUpdate(val) {
        this.bindingUpdateWarehouse = val;
        console.log(val);
        this.dialogBindingUpdateVisible = true;
      },
      // 确定修改
      bindingUpdateSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseSave', {
          id: this.bindingUpdateWarehouse.id,
          name: this.bindingUpdateWarehouse.name,
          wid: this.bindingUpdateWarehouse.wid,
          type: this.bindingUpdateWarehouse.type
        }).then((res) => {
          console.log('修改仓库');
          console.log(res);
          this.$message.success({
            message: '仓库信息修改成功',
            showClose: true,
            duration: 2000
          });
          this.dialogBindingUpdateVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogBindingUpdateVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 绑定仓库删除
      bindingDelete(val) {
        console.log(val);
        this.bindingDeleteWarehouse = val;
        this.dialogBindingDeleteVisible = true;
      },
      // 确定删除
      bindingDeleteSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warehouseDelete', {
          id: this.bindingDeleteWarehouse.id
        }).then((res) => {
          console.log('删除仓库');
          console.log(res);
          this.$message.success({
            message: '仓库删除成功',
            showClose: true,
            duration: 2000
          });
          this.dialogBindingDeleteVisible = false;
          this.getMenuWarehouseList();
        }).catch((err) => {
          console.log(err);
          this.dialogBindingDeleteVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        });
      },
      // 选中行 部门选择
      handleCurrentChange(val) {
        console.log('部门选择');
        this.warehouseName = '';
        this.departmentSelected = val;
        console.log(this.departmentSelected);

        this.warehouseCheck();
      },
      rowClick(row) {
        // this.expands = [];
        // ['1','2','4']
        console.log(this.expands.indexOf(row.id));
        if (this.expands.indexOf(row.id.toString()) == -1) {
          this.expands.push(row.id.toString());
        } else {
          for (const i in this.expands) {
            if (this.expands[i] == row.id) {
              this.expands.splice(i, 1);
            }
          }
        }
        console.log(this.expands);
      },
      // 获取部门列表
      getMenuWarehouseList() {
        this.departmentData = [];
        this.warehouseList = [];
        this.$axios.post(this.$store.state.baseUrl + '/menuWarehouseList').then((res) => {
          console.log('仓库列表');
          console.log(res);
          this.warehouseList = res.data.warehouseList;

          this.$axios.post(this.$store.state.baseUrl + '/userDeptList').then((res) => {
            console.log('用户部门列表');
            console.log(res);
            this.departmentData = res.data;

            this.handleCurrentChange(this.departmentSelected);

            this.$nextTick(() => {
              console.log(this.$refs.departmentTable);
              console.log('---------');
              console.log(this.departmentData[0].children[0]);
              console.log(this.departmentSelected);
              console.log('---------=======');

              this.func(this.departmentData);

            })
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      func(list) {
        for (const item of list) {
          // console.log(item);
          if (item.id == this.departmentSelected.id) {
            this.$refs.departmentTable.setCurrentRow(item);
            // this.expands.push(item.id);
          } else {
            if (item.children.length !== 0) {
              this.func(item.children);
            }
          }
        }
      },
      // 绑定与未绑定仓库
      warehouseCheck() {
        console.log('绑定与未绑定');
        console.log(this.departmentSelected);
        this.bindingWarehouseList = [];
        this.unBindingWarehouseList = [];
        console.log(this.bindingWarehouseList);
        console.log(this.unBindingWarehouseList);
        console.log(this.warehouseList);
        for (let i = 0; i < this.warehouseList.length; i++) {
          if (this.warehouseList[i].wid == this.departmentSelected.id) {
            console.log(this.warehouseList[i].wid);
            this.bindingWarehouseList.push(this.warehouseList[i]);
          } else {
            if (this.warehouseList[i].wid == null || this.warehouseList[i].wid == 0) {
              this.unBindingWarehouseList.push(this.warehouseList[i]);
            }
          }
        };
        console.log(this.bindingWarehouseList);
        console.log(this.unBindingWarehouseList);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .warehouse-admin-page-container {
    padding: 20px 10px 20px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 6px;

    .department-select {
      width: 18%;
    }

    .binding-warehouse-select,
    .unbinding-warehouse-select {
      width: 40%;
    }

    .department-top {
      height: 48px;
      // line-height: 48px;
      text-align: left;
      color: #6a6a6a;
      font-size: 18px;
      font-weight: bold;
    }

    .binding-warehouse-select {
      .binding-warehouse-every {
        width: 100%;
      }
    }

    .cell-work {
      width: 100%;
      display: flex;
      justify-content: space-around !important;
    }
  }
</style>
<style lang="scss">
  #warehouse-admin-page {
    .el-table .cell {
      display: flex;
    }
  }
</style>