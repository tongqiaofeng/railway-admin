<template>
  <div class="inventory-statistics-container">
    <!-- <h1>用量统计</h1> -->
    <div style="text-align: left;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="部门：">
          <el-cascader class="input-style" ref="cascaderHandle" v-model="wid" :options="menuList" :props="propsMenu"
            :show-all-levels="false" clearable @change="menuChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="仓库：">
          <el-select v-model="warehouseIdList" multiple placeholder="可多选" @change="wareCheck">
            <el-option v-for="ware in warehouseSelList" :key="ware.id" :label="ware.name" :value="ware.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份：">
          <el-date-picker v-model="year" type="year" format="yyyy" value-format="yyyy">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="月份：">
          <el-select v-model="month" placeholder="请选择" clearable>
            <el-option v-for="item in monthList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="inventoryCheck">查 询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出excel表格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="usageStatisticsList" tooltip-effect="dark" border>
        <el-table-column prop="deviceName" label="设备名称">
        </el-table-column>
        <el-table-column prop="supplierName" label="厂家">
        </el-table-column>
        <el-table-column prop="systemName" label="系统">
        </el-table-column>
        <el-table-column prop="deviceModel" label="设备型号">
        </el-table-column>
        <el-table-column prop="allNum" label="总数">
        </el-table-column>
        <el-table-column prop="usedNum" label="使用数量">
        </el-table-column>
        <el-table-column prop="scrappedNum" label="报废数量">
        </el-table-column>
      </el-table>
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
        usageStatisticsList: [],
        wid: '',
        warehouseIdList: [],
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
        year: '',
        month: '',
        monthList: [{
          value: 1,
          label: '1月',
        }, {
          value: 2,
          label: '2月',
        }, {
          value: 3,
          label: '3月',
        }, {
          value: 4,
          label: '4月',
        }, {
          value: 5,
          label: '5月',
        }, {
          value: 6,
          label: '6月',
        }, {
          value: 7,
          label: '7月',
        }, {
          value: 8,
          label: '8月',
        }, {
          value: 9,
          label: '9月',
        }, {
          value: 10,
          label: '10月',
        }, {
          value: 11,
          label: '11月',
        }, {
          value: 12,
          label: '12月',
        }, ],

        eurl: '',
        total: 0,
        page: 1,
        pageNum: 10,

      }
    },
    created() {
      this.getWarehouseList();
      this.inventoryCheck();
    },
    methods: {
      // 导出Excel表格
      exportExcel() {
        this.$axios.post(this.$store.state.baseUrl + '/usageStatExportData', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          year: this.year,
          month: this.month
        }).then((res) => {
          console.log(res);
          this.eurl = this.$store.state.baseUrl + res.data.excelUrl;
          console.log(this.eurl);
          window.location.href = this.eurl;
        }).catch((err) => {
          console.log(err);
        })
      },
      // 用量统计
      inventoryCheck() {
        this.$axios.post(this.$store.state.baseUrl + '/usageStat', {
          wid: this.wid,
          warehouseIdList: this.warehouseIdList.indexOf(0) !== -1 ? [] : this.warehouseIdList,
          year: this.year,
          month: this.month,
          page: this.page,
          pageNum: this.pageNum
        }).then(res => {
          console.log('用量统计');
          console.log(res);
          this.total = res.data.total;
          this.usageStatisticsList = res.data.list;
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
      },
      // 部门下的仓库
      menuChange(value) {
        console.log(value);
        this.$refs.cascaderHandle.dropDownVisible = false;
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
  }
</style>