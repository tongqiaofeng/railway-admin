<template>
  <div class="user-admin-container" id="user-admin">
    <!-- <h1>入库管理</h1> -->
    <div class="user-edit">
      <el-form :model="stockInFormData" :rules="stockInRules" ref="stockInForm" label-width="95px"
        class="demo-ruleForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="入库类型：" prop="type">
              <el-select v-model="stockInFormData.type" placeholder="请选择" class="input-style" @change="typeChange">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属仓库：" prop="warehouseId">
              <el-select v-model="stockInFormData.warehouseId" placeholder="请选择" @change="warehouseChange"
                class="input-style">
                <el-option v-for="item in warehouseList" :key="item.id" :label="item.name" :value="item.id"
                  @click.native="warehouseClick(item)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="typeChangeNum == 0" style="margin-top: 40px;">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="生产厂家：" prop="menu">
                <el-autocomplete class="inline-input input-style" v-model="stockInFormData.menu"
                  :fetch-suggestions="queryMenuSearch" placeholder="请输入内容" @select="handleMenu" clearable>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属系统：" prop="system">
                <el-autocomplete class="inline-input input-style" v-model="stockInFormData.system"
                  :fetch-suggestions="querySystemSearch" placeholder="请输入内容" @select="handleSystem" clearable>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="设备名称：" prop="device">
                <el-autocomplete class="inline-input input-style" v-model="stockInFormData.device"
                  :fetch-suggestions="queryDeviceSearch" placeholder="请输入内容" @select="handleDevice" clearable>
                </el-autocomplete>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备型号：" prop="model">
                <el-input v-model="stockInFormData.model" readonly class="input-style"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="生产日期：" prop="productTime">
                <el-date-picker v-model="stockInFormData.productTime" type="date" placeholder="请选择" class="input-style">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="有效日期：" prop="validTime">
                <el-date-picker v-model="stockInFormData.validTime" type="date" placeholder="请选择" class="input-style">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="生产批次：" prop="benchmark">
                <el-input v-model="stockInFormData.benchmark" class="input-style"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="货架号：" prop="shelfNumber">
                <el-input v-model="stockInFormData.shelfNumber" class="input-style"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="设备编号：" prop="deviceNumber">
            <div style="display: flex;">
              <el-input v-model="stockInFormData.deviceNumber" readonly class="input-style" @focus="getDeviceNumber">
              </el-input>
              <el-button style="margin-left: 10px;" type="primary" @click="stockGetQrcode" v-preventClick>打印二维码
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注：" prop="note">
            <el-input style="height: 100px;" type="textarea" v-model="stockInFormData.note" class="input-style">
            </el-input>
          </el-form-item>
        </div>
        <div v-else>
          <div style="margin-top: 40px;display: flex;justify-content: flex-end;">
            <div id="stock">
              <el-input v-model="manageKeyword" placeholder="可输入部门、厂家、系统、设备名称，设备型号，生产批次进行搜索" clearable
                class="stockInput"></el-input>
            </div>
            <el-button style="margin-left: 10px;" type="primary" @click="checkDevice" class="stockButton">查 询
            </el-button>
          </div>
          <div style="margin-top: 20px;">
            <el-table :data="manageList" tooltip-effect="dark" style="width: 800px" border
              @selection-change="handleStockSelectionChange" @row-click="warehouseManaLookTwo">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column label="所属厂家">
                <template slot-scope="scope">{{ scope.row.supplierName }}</template>
              </el-table-column>
              <el-table-column label="所属系统">
                <template slot-scope="scope">{{ scope.row.systemName }}</template>
              </el-table-column>
              <el-table-column label="设备名称">
                <template slot-scope="scope">{{ scope.row.deviceName }}</template>
              </el-table-column>
              <el-table-column prop="deviceModel" label="设备型号">
              </el-table-column>
              <el-table-column prop="deviceNumber" label="设备编号" show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-dialog title="设备信息" :visible.sync="dialogInventoryCheckTwoVisible" :close-on-press-escape="false"
              :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
              <div id="invenSome">
                <div style="display: flex;justify-content: space-between;">
                  <p class="font-title-style">库存信息</p>
                  <div style="padding-top: 24px;">
                    <img style="cursor: pointer;" title="修改设备信息" src="../assets/imgs/home/update.png"
                      @click="updateDeviceTwo" />
                  </div>
                </div>
                <div class="font-div">
                  <div class="div-one">
                    <div class="one-left">
                      仓库名称
                    </div>
                    <div class="one-right">
                      {{inventoryCheckDetailTwo.warehouseName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备名称
                    </div>
                    <div class="one-right">
                      {{inventoryCheckDetailTwo.deviceName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备编号
                    </div>
                    <div style="width: 382px;display: flex;justify-content: space-between;">
                      <div class="one-right">
                        {{inventoryCheckDetailTwo.deviceNumber}}
                      </div>
                      <div class="qrcodeClick" @click="getQrcodeInvenTwo" v-preventClick>打印二维码</div>
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left"
                      :style="{color: isUpdateTwo == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdateTwo == 0 ? 'normal' : 'bold'}">
                      货架号
                    </div>
                    <div class="one-right">
                      <el-input :readonly="isUpdateTwo == 0 ? true : false"
                        v-model="inventoryCheckDetailTwo.shelfNumber" clearable>
                      </el-input>
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      在库时长
                    </div>
                    <div class="one-right">
                      {{inventoryCheckDetailTwo.stockInDays + ' 天'}}
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
                      {{inventoryCheckDetailTwo.supplierName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      系统名称
                    </div>
                    <div class="one-right">
                      {{inventoryCheckDetailTwo.systemName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备型号
                    </div>
                    <div class="one-right">
                      {{inventoryCheckDetailTwo.deviceModel}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left"
                      :style="{color: isUpdateTwo == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdateTwo == 0 ? 'normal' : 'bold'}">
                      生产日期
                    </div>
                    <div class="one-right">
                      <el-date-picker :readonly="isUpdateTwo == 0 ? true : false"
                        v-model="inventoryCheckDetailTwo.productTime" type="date" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" clearable></el-date-picker>
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left"
                      :style="{color: isUpdateTwo == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdateTwo == 0 ? 'normal' : 'bold'}">
                      有效日期
                    </div>
                    <div class="one-right">
                      <el-date-picker :readonly="isUpdateTwo == 0 ? true : false"
                        v-model="inventoryCheckDetailTwo.validTime" type="date" format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd" clearable></el-date-picker>
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left"
                      :style="{color: isUpdateTwo == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdateTwo == 0 ? 'normal' : 'bold'}">
                      生产批次
                    </div>
                    <div class="one-right">
                      <el-input :readonly="isUpdateTwo == 0 ? true : false" v-model="inventoryCheckDetailTwo.benchmark"
                        clearable>
                      </el-input>
                    </div>
                  </div>
                </div>
                <p class="font-title-style">备注信息</p>
                <div class="font-div">
                  <div class="div-one-note" id="one-note">
                    <div class="one-left"
                      :style="{color: isUpdateTwo == 0 ? '#606266' : '#3d82fe',fontWeight: isUpdateTwo == 0 ? 'normal' : 'bold'}">
                      备注
                    </div>
                    <div class="one-right">
                      <el-input type="textarea" v-model="inventoryCheckDetailTwo.note"
                        :readonly="isUpdateTwo == 0 ? true : false">
                      </el-input>
                    </div>
                  </div>
                </div>
                <p class="font-title-style">
                  设备状态：{{inventoryCheckDetailTwo.flag == 0 ? '库存中' : (inventoryCheckDetailTwo.flag == 1 ? '维修中' : (inventoryCheckDetailTwo.flag == 2 ? '检修中' : '使用中'))}}
                </p>
                <el-timeline>
                  <el-timeline-item color="#3d82fe" size="large"
                    v-for="(activity, index) in inventoryCheckDetailTwo.stockInOutList" :key="index">
                    {{activity.time}}
                    <span
                      style="display: inline-block;margin-left: 10px;">{{activity.type == 0 ? (activity.flag == 1 ? '新购入库' : (activity.flag == 2 ? '归还入库' : (activity.flag == 3 ? '维修入库' : '检修入库'))) : (activity.flag == 1 ? '使用出库' : (activity.flag == 2 ? '维修出库' : '检修出库'))}}</span>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div slot="footer">
                <el-button @click="dialogInventoryCheckTwoVisible = false">取 消</el-button>
                <el-button type="primary" @click="inventoryLookSureTwo" v-preventClick>确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </el-form>
      <div style="margin-top: 30px;text-align: right;">
        <el-button style="width: 120px;" type="primary" @click="stockInAdd('stockInForm')" v-preventClick>提 交
        </el-button>
      </div>
    </div>
    <div class="user-table" style="display: flex;">
      <el-table :data="productList" tooltip-effect="dark" border @row-click="inventoryLook">
        <el-table-column prop="supplierName" label="生产厂家">
        </el-table-column>
        <el-table-column prop="systemName" label="所属系统">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称">
        </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号">
        </el-table-column>
        <el-table-column prop="deviceNumber" label="设备编号">
        </el-table-column>
        <el-table-column label="操作" width="90px">
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
      <el-dialog title="删除设备" :visible.sync="dialogInventoryDeleteVisible" :close-on-press-escape="false"
        :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
        <div style="text-align: center;">
          <p style="margin: 30px;font-size: 16px;color: #4e4e4e;">确定删除该设备？删除后不可修改</p>
        </div>
        <div slot="footer">
          <el-button @click="dialogInventoryDeleteVisible = false">取 消</el-button>
          <el-button type="primary" @click="inventoryDeleteSure" v-preventClick>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeChangeNum: 0,
        stockInFormData: {
          warehouseId: '',
          type: 1,
          menu: '',
          system: '',
          device: '',
          model: '',
          productTime: '',
          validTime: '',
          benchmark: '',
          deviceNumber: '',
          shelfNumber: '',
          note: '',
        },
        stockInRules: {
          warehouseId: [{
            required: true,
            message: '请选择所属仓库',
            // trigger: 'blur'
            trigger: ['change']
          }],
          menu: [{
            required: true,
            message: '请选择生产厂家',
            trigger: ['change']
          }],
          system: [{
            required: true,
            message: '请选择所属系统',
            trigger: ['change']
          }],
          device: [{
            required: true,
            message: '请选择设备名称',
            trigger: ['change']
          }],
          model: [{
            required: true,
            message: '请选择设备名称',
            trigger: ['change']
          }],
          deviceNumber: [{
            required: true,
            message: '请输入设备编号',
            trigger: 'blur'
          }],
        },
        typeList: [{
          id: 1,
          name: '新购入库'
        }, {
          id: 2,
          name: '归还入库'
        }, {
          id: 3,
          name: '维修后入库'
        }, {
          id: 4,
          name: '检修后入库'
        }, ],
        warehouseList: [],
        supplierList: [],
        systemList: [],
        systemSelectList: [],
        deviceList: [],
        deviceSelectList: [],
        deviceDetail: {},

        stockInList: [],
        productList: [],
        manageKeyword: '',
        manageList: [],
        stockSelection: [],
        warehouseSel: {},

        dialogInventoryCheckVisible: false,
        inventoryCheckDetail: {},
        dialogInventoryDeleteVisible: false,
        inventoryDeleteDetail: {},

        isUpdate: 0,

        dialogInventoryCheckTwoVisible: false,
        inventoryCheckDetailTwo: {},
        isUpdateTwo: 0,


      }
    },
    created() {
      this.getWarehouseList();
      this.getSupplierList();
      this.getProductList();
    },
    methods: {
      // 修改查看设备
      warehouseManaLookTwo(row) {
        console.log(row);
        this.inventoryCheckDetailTwo = {};
        this.inventoryCheckDetailTwo = row;
        console.log(this.inventoryCheckDetailTwo);

        this.isUpdateTwo = 0;
        this.dialogInventoryCheckTwoVisible = true;
      },
      updateDeviceTwo() {
        this.isUpdateTwo = 1;
      },
      // 打印二维码
      getQrcodeInvenTwo() {
        let param = "\"CMD\":\"2\",\"CMDDATA\":\"TEXT 30,30,\"TSS24.BF2\",0,1,1," + "\"仓库：" + this
          .inventoryCheckDetailTwo
          .warehouseName + "\"" +
          "`TEXT 30,68,\"TSS24.BF2\",0,1,1,\"厂家：" + this.inventoryCheckDetailTwo.supplierName + "\"" +
          "`TEXT 30,106,\"TSS24.BF2\",0,1,1,\"设备名称：" + this.inventoryCheckDetailTwo.deviceName + "\"" +
          "`TEXT 30,144,\"TSS24.BF2\",0,1,1,\"设备型号：" + this.inventoryCheckDetailTwo.deviceModel + "\"" +
          "`TEXT 30,182,\"TSS24.BF2\",0,1,1,\"入库时间：" + this.shellDateTwo(this.inventoryCheckDetailTwo.stockInTime) +
          "\"" +
          "`TEXT 30,220,\"TSS24.BF2\",0,1,1,\"到期时间：" + this.shellDateTwo(this.inventoryCheckDetailTwo.validTime) +
          "\"" +
          "`TEXT 30,258,\"TSS24.BF2\",0,1,1,\"编号：" + this.inventoryCheckDetailTwo.deviceNumber + "\"" +
          "`QRCODE 340,174,L,5,A,0," + "\"" +
          this.inventoryCheckDetailTwo.deviceNumber + "\"" + "\"CMDEND";
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
      inventoryLookSureTwo() {
        if (this.isUpdateTwo == 0) {
          this.dialogInventoryCheckTwoVisible = false;
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/stockMsgUpdate', {
              id: this.inventoryCheckDetailTwo.stockInId,
              productTime: this.inventoryCheckDetailTwo.productTime,
              validTime: this.inventoryCheckDetailTwo.validTime,
              benchmark: this.inventoryCheckDetailTwo.benchmark,
              shelfNumber: this.inventoryCheckDetailTwo.shelfNumber,
              note: this.inventoryCheckDetailTwo.note
            }).then(res => {
              console.log('修改设备信息');
              console.log(res);
              this.$message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000
              });
              this.dialogInventoryCheckTwoVisible = false;
              if (this.manageKeyword == '') {
                this.getManageList();
              } else {
                this.checkDevice();
              };
              this.getProductList();
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
              this.getProductList();
              if (this.manageKeyword == '') {
                this.getManageList();
              } else {
                this.checkDevice();
              }
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
            this.getProductList();
            if (this.manageKeyword == '') {
              this.getManageList();
            } else {
              this.checkDevice();
            }
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
      warehouseClick(val) {
        console.log(val);
        this.warehouseSel = val;
      },
      // 打印二维码
      stockGetQrcode() {
        this.$refs['stockInForm'].validate((valid) => {
          if (valid) {
            let param = "\"CMD\":\"2\",\"CMDDATA\":\"TEXT 30,30,\"TSS24.BF2\",0,1,1," + "\"仓库：" + this.warehouseSel
              .name + "\"" +
              "`TEXT 30,68,\"TSS24.BF2\",0,1,1,\"厂家：" + this.stockInFormData.menu + "\"" +
              "`TEXT 30,106,\"TSS24.BF2\",0,1,1,\"设备名称：" + this.stockInFormData.device + "\"" +
              "`TEXT 30,144,\"TSS24.BF2\",0,1,1,\"设备型号：" + this.stockInFormData.model + "\"" +
              "`TEXT 30,182,\"TSS24.BF2\",0,1,1,\"入库时间：" + this.shellDateTwo(new Date()) + "\"" +
              "`TEXT 30,220,\"TSS24.BF2\",0,1,1,\"到期时间：" + this.shellDateTwo(this.stockInFormData.validTime) +
              "\"" +
              "`TEXT 30,258,\"TSS24.BF2\",0,1,1,\"编号：" + this.stockInFormData.deviceNumber + "\"" +
              "`QRCODE 340,174,L,5,A,0," + "\"" +
              this.stockInFormData.deviceNumber + "\"" + "\"CMDEND";
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
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 设备入库
      stockInAdd(formName) {
        console.log(this.stockInFormData.type);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.stockInFormData.type == 1) {
              this.$axios.post(this.$store.state.baseUrl + '/stockInDo', {
                type: this.stockInFormData.type,
                stockInId: '',
                deviceId: this.deviceDetail.id,
                productTime: this.shellDate(this.stockInFormData.productTime),
                validTime: this.shellDate(this.stockInFormData.validTime),
                benchmark: this.stockInFormData.benchmark,
                deviceNumber: this.stockInFormData.deviceNumber,
                warehouseId: this.stockInFormData.warehouseId,
                shelfNumber: this.stockInFormData.shelfNumber,
                note: this.stockInFormData.note
              }).then((res) => {
                console.log('设备入库');
                console.log(res);
                this.$message.success({
                  message: '入库成功',
                  showClose: true,
                  duration: 2000
                });
                this.stockInList = [];
                this.getProductList();
                // this.stockInFormData.type = 1;
                // this.stockInFormData.menu = '';
                // this.stockInFormData.system = '';
                // this.stockInFormData.device = '';
                // this.stockInFormData.model = '';
                this.stockInFormData.productTime = '';
                this.stockInFormData.validTime = '';
                this.stockInFormData.benchmark = '';
                this.stockInFormData.deviceNumber = '';
                this.stockInFormData.shelfNumber = '';
                this.stockInFormData.note = '';
                this.backTop();
              }).catch((err) => {
                console.log(err);
                this.$message.error({
                  message: err.data.message,
                  showClose: true,
                  duration: 2000
                });
              });
            } else {
              this.$axios.post(this.$store.state.baseUrl + '/stockInDo', {
                warehouseId: this.stockInFormData.warehouseId,
                type: this.stockInFormData.type,
                stockInIdList: this.stockSelection
              }).then((res) => {
                console.log('设备入库');
                console.log(res);
                this.$message.success({
                  message: '入库成功',
                  showClose: true,
                  duration: 2000
                });
                this.stockInList = [];
                this.getProductList();
                this.backTop();
              }).catch((err) => {
                console.log(err);
                this.$message.error({
                  message: err.data.message,
                  showClose: true,
                  duration: 2000
                });
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 入库类型变化
      typeChange() {
        // console.log(this.stockInFormData.type);
        if (this.stockInFormData.type == 1) {
          this.typeChangeNum = 0;
        } else {
          this.typeChangeNum = 1;
          this.getManageList();
        }
      },
      getManageList() {
        this.manageList = [];
        this.$axios.post(this.$store.state.baseUrl + '/stockOutList', {
          id: this.stockInFormData.warehouseId,
          type: this.stockInFormData.type
        }).then(res => {
          console.log('入库类型对应出库设备列表');
          console.log(res);
          this.manageList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 模糊搜索设备列表
      checkDevice() {
        this.manageList = [];
        this.$axios.post(this.$store.state.baseUrl + '/stockOutList', {
          id: this.stockInFormData.warehouseId,
          type: this.stockInFormData.type,
          keyword: this.manageKeyword
        }).then(res => {
          console.log('入库类型对应出库设备列表');
          console.log(res);
          this.manageList = res.data;
        }).catch(err => {
          console.log(err);
        })
      },
      // 选择入库设备
      handleStockSelectionChange(val) {
        console.log(val);
        this.stockSelection = [];
        for (const item of val) {
          this.stockSelection.push(item.stockInId);
        };
        console.log(this.stockSelection);
      },
      // 厂家匹配
      queryMenuSearch(queryString, cb) {
        console.log(this.supplierList);
        let restaurants = this.supplierList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleMenu(item) {
        console.log(item);
        this.stockInFormData.menu = item.value;
        console.log(this.stockInFormData.menu);
        this.systemSelectList = [];
        this.stockInFormData.system = '';
        this.deviceSelectList = [];
        this.stockInFormData.device = '';
        this.stockInFormData.model = '';
        for (const sys of this.systemList) {
          if (sys.parentId == item.id) {
            this.systemSelectList.push(sys);
          }
        };
      },
      // 系统匹配
      querySystemSearch(queryString, cb) {
        console.log(this.systemSelectList);
        let restaurants = this.systemSelectList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createFilterSystem(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterSystem(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSystem(item) {
        console.log(item);
        this.stockInFormData.system = item.value;
        this.deviceSelectList = [];
        this.stockInFormData.device = '';
        this.stockInFormData.model = '';
        for (const sys of this.deviceList) {
          if (sys.parentId == item.id) {
            this.deviceSelectList.push(sys);
          }
        };
      },
      // 设备匹配
      queryDeviceSearch(queryString, cb) {
        console.log(this.deviceSelectList);
        let restaurants = this.deviceSelectList;
        for (let items of restaurants) {
          items.value = items.name;
        }
        let results = queryString ? restaurants.filter(this.createFilterDevice(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilterDevice(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleDevice(item) {
        console.log(item);
        this.stockInFormData.device = item.value;
        this.stockInFormData.model = item.model;
        this.deviceDetail = item;
      },
      // 获取设备编号
      getDeviceNumber() {
        if (this.stockInFormData.deviceNumber == '') {
          this.$axios.post(this.$store.state.baseUrl + '/deviceNumberGet').then(res => {
            console.log('获取设备编号');
            console.log(res);
            this.stockInFormData.deviceNumber = res.data.deviceNumber;
          }).catch(err => {
            console.log(err);
            this.stockInFormData.deviceNumber = '';
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 获取该仓库下所有的产品
      warehouseChange() {
        console.log(this.stockInFormData.warehouseId);
        this.productList = [];
        this.typeChange();
        for (const product of this.stockInList) {
          if (this.stockInFormData.warehouseId == product.warehouseId) {
            this.productList = product.deviceList;
          }
        };
      },
      // 所有产品列表
      getProductList() {
        this.$axios.post(this.$store.state.baseUrl + '/stockInList', {
          flag: 0
        }).then((res) => {
          console.log('产品列表');
          console.log(res);
          this.stockInList = res.data.list;
          if (this.stockInFormData.warehouseId !== '') {
            this.warehouseChange();
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      // 获取供应商列表
      getSupplierList() {
        this.$axios.post(this.$store.state.baseUrl + '/supplierList').then((res) => {
          console.log('供应商列表');
          console.log(res);
          this.supplierList = res.data.supplierList;
          this.systemList = res.data.systemList;
          this.deviceList = res.data.deviceList;
        }).catch((err) => {
          console.log(err);
        });
      },
      // 获取仓库列表
      getWarehouseList() {
        this.$axios.post(this.$store.state.baseUrl + '/userWarehouseList ').then((res) => {
          console.log('仓库列表');
          console.log(res);
          this.warehouseList = res.data;
        }).catch((err) => {
          console.log(err);
        });
      },
      // 页面回到顶部
      backTop() {
        let timer = null;
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
          var oTop = document.body.scrollTop || document.documentElement.scrollTop;
          if (oTop > 0) {
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 100;
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer);
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .user-admin-container {
    display: flex;
    justify-content: space-between;

    .user-edit {
      width: 50%;
      padding: 10px;
      margin-right: 15px;
      background-color: #fff;
      border-radius: 6px;
    }

    .user-table {
      width: 50%;
      padding: 10px;
      background-color: #fff;
      border-radius: 6px;
    }

    .input-style {
      width: 100%;
    }

    .stockButton {
      height: 34px !important;
      line-height: 9px;
      font-size: 12px;
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
  #user-admin {
    .el-form-item__content {
      text-align: left;
    }

    #stock {
      width: 100%;

      .stockInput {
        width: 431px;
        float: right;

        .el-input__inner {
          height: 34px;
          line-height: 9px;
          font-size: 12px;
        }

        .el-input__suffix {
          padding-top: -10px;
        }
      }
    }

    .el-textarea__inner {
      height: 100%;
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