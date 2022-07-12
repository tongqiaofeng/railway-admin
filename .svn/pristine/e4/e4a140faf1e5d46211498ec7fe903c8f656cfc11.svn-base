<template>
  <div class="stock-inquiry-container" id="stock-inquiry">
    <!-- 库存查询 -->
    <div v-if="siteSel == 0">
      <div class="stock-inquiry-top" id="stockWarehouseCheck">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="状态：">
            <el-select v-model="flag" placeholder="请选择">
              <el-option v-for="flag in flagList" :key="flag.id" :label="flag.name" :value="flag.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;">
              <el-input style="width: 400px;" v-model="keyword" placeholder="可输入部门、厂家、系统、设备名称，设备型号，生产批次进行搜索" clearable>
              </el-input>
              <el-button style="margin-left: 10px;" type="primary" @click="warehouseKeywordCheck">查 询</el-button>
              <el-button type="primary" @click="filterList">设备筛选</el-button>
              <el-dialog title="筛选设备" :visible.sync="dialogDeviceCheckVisible" :close-on-press-escape="false"
                :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                <el-form style="margin-top: 20px;">
                  <el-form-item label="所属部门：">
                    <el-cascader class="input-style" ref="menuCascaderFilter" v-model="deptId" :options="menuList"
                      :props="propsMenu" :show-all-levels="false" clearable @change="menuChange">
                    </el-cascader>
                  </el-form-item>
                  <el-form-item label="所属厂家：">
                    <el-select class="input-style" v-model="supplierId" @change="supplierChange" clearable>
                      <el-option v-for="suppler in supplierList" :key="suppler.id" :label="suppler.name"
                        :value="suppler.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属系统：">
                    <el-select class="input-style" v-model="systemId" clearable>
                      <el-option v-for="system in systemSelList" :key="system.id" :label="system.name"
                        :value="system.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="生产批次：">
                    <el-input class="input-style" v-model="benchmark" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="设备名称：">
                    <el-input class="input-style" v-model="deviceName" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="设备型号：">
                    <el-input class="input-style" v-model="deviceModel" clearable></el-input>
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
        <div class="top-right">
          <el-tooltip class="item" style="margin-left: 20px;height: 40px;" effect="dark" content="图表切换"
            placement="bottom-end">
            <img :src="stockInquiryParam.sel == 0 ? img1 : img2" @click="listOrChart" style="cursor:pointer;" />
          </el-tooltip>
        </div>
      </div>
      <div class="stock-inquiry-main">
        <div v-if="stockInquiryParam.sel == 0" class="svg-style">
          <SvgPanZoom style="width: 100%; height: 100%;" :zoomEnabled="true" :controlIconsEnabled="true" :fit="true"
            :center="true">
            <svg id="mobile-svg" width="100%" :height="cliHeight" style="overflow: inherit;"
              xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
              <g>
                <line id="svg_176" y2="461" x2="47.80005" y1="501" x1="27.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_177" y2="398" x2="80.80005" y1="442" x1="59.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_180" y2="282" x2="237.80005" y1="300" x1="191.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_181" y2="251" x2="283.80005" y1="268" x1="255.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_182" y2="226" x2="335.80005" y1="235" x1="302.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_183" y2="206" x2="379.80005" y1="220" x1="352.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_184" y2="184" x2="430.80005" y1="196" x1="404.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_186" y2="136" x2="530.80005" y1="146" x1="496.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_187" y2="112" x2="571.80005" y1="130" x1="552.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_189" y2="67" x2="680.80005" y1="82" x1="643.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_190" y2="45" x2="729.80005" y1="57" x1="692.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_191" y2="44" x2="790.80005" y1="40" x1="751.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_192" y2="58" x2="845.80005" y1="43" x1="808.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_193" y2="78" x2="902.80005" y1="66" x1="862.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_194" y2="106" x2="972.80005" y1="85" x1="920.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_195" y2="157" x2="944.80005" y1="117" x1="970.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_196" y2="152" x2="1012.80005" y1="116" x1="984.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_197" y2="200" x2="1050.80005" y1="166" x1="1022.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_198" y2="238" x2="1104.80005" y1="212" x1="1062.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_199" y2="286" x2="1147.80005" y1="252" x1="1118.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_200" y2="328" x2="1196.80005" y1="296" x1="1158.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_201" y2="374" x2="1244.80005" y1="339" x1="1206.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_202" y2="432" x2="1284.80005" y1="389" x1="1259.80005" stroke-width="3"
                  stroke="#005fbf" />
                <line id="svg_204" y2="102" x2="588.80005" y1="93" x1="623.80005" stroke-width="3" stroke="#005fbf" />
                <line id="svg_205" y2="156" x2="481.80005" y1="172" x1="449.80005" stroke-width="3" stroke="#005fbf" />
                <text id="svg_22" xml:space="preserve" text-anchor="middle" y="256.79999" x="359.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">墨江</text>
                <text id="svg_23" xml:space="preserve" text-anchor="middle" y="110.79999" x="471.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">过尧站</text>
                <text id="svg_24" xml:space="preserve" text-anchor="middle" y="512.79999" x="1252.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">磨憨</text>
                <text xml:space="preserve" text-anchor="middle" id="svg_2" y="519.60001" x="78.06666" stroke-width="0"
                  stroke="#3d81fd" fill="#000">研和</text>
                <text id="svg_9" xml:space="preserve" text-anchor="middle" y="482.2" x="100.39996" stroke-width="0"
                  stroke="#3d81fd" fill="#000">峨山站</text>
                <text id="svg_20" xml:space="preserve" text-anchor="middle" y="366.79999" x="58.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">罗里站</text>
                <text id="svg_21" xml:space="preserve" text-anchor="middle" y="275.79999" x="167.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">元江站</text>
                <text id="svg_36" xml:space="preserve" text-anchor="middle" y="374.80001" x="158.19998" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继1</text>
                <text id="svg_37" xml:space="preserve" text-anchor="middle" y="306.79999" x="263.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继2</text>
                <text id="svg_41" xml:space="preserve" text-anchor="middle" y="211.80001" x="267.19998" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继3</text>
                <text id="svg_45" xml:space="preserve" text-anchor="middle" y="160.80001" x="373.19999" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继4</text>
                <text id="svg_8" xml:space="preserve" text-anchor="middle" y="214.60001" x="458.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继5</text>
                <text id="svg_28" xml:space="preserve" text-anchor="middle" y="173.60001" x="556.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继6</text>
                <text id="svg_38" xml:space="preserve" text-anchor="middle" y="458.59999" x="1248.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">猛腊</text>
                <text id="svg_48" xml:space="preserve" text-anchor="middle" y="233.59998" x="1009.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">橄榄坝</text>
                <text id="svg_52" xml:space="preserve" text-anchor="middle" y="146.59999" x="1065.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">西双版纳</text>
                <text id="svg_56" xml:space="preserve" text-anchor="middle" y="78.60002" x="1005.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">野象谷客场</text>
                <text id="svg_60" xml:space="preserve" text-anchor="middle" y="196.6" x="924.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">野象谷货场</text>
                <text id="svg_64" xml:space="preserve" text-anchor="middle" y="122.6" x="897.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继10</text>
                <text id="svg_68" xml:space="preserve" text-anchor="middle" y="36.6" x="860.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">普文</text>
                <text id="svg_72" xml:space="preserve" text-anchor="middle" y="97.6" x="805.19998" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继9</text>
                <text id="svg_73" xml:space="preserve" text-anchor="middle" y="76.6" x="741.19998" stroke-width="0"
                  stroke="#3d81fd" fill="#000">普洱站</text>
                <text id="svg_77" xml:space="preserve" text-anchor="middle" y="38.6" x="662.2" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继8</text>
                <text id="svg_78" xml:space="preserve" text-anchor="middle" y="130.6" x="648.19998" stroke-width="0"
                  stroke="#3d81fd" fill="#000">宁洱站</text>
                <text id="svg_82" xml:space="preserve" text-anchor="middle" y="64.6" x="566.19999" stroke-width="0"
                  stroke="#3d81fd" fill="#000">中继7</text>
                <g id="svg_136">
                  <title>中继3</title>
                  <circle class="machine" id="circle_13" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="293.2"
                    cy="241.2" r="20" @click="everyList($event)" />
                  <text id="text_13" :fill="num13 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="246.59999" x="293.19998" stroke-width="0" stroke="#ffffff">{{num13}}</text>
                </g>
                <g id="svg_137">
                  <title>墨江</title>
                  <circle class="machine" id="circle_14" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="341.19999"
                    cy="221.19999" r="20" @click="everyList($event)" />
                  <text id="text_14" :fill="num14 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="227.59999" x="340.19998" stroke-width="0" stroke="#ffffff">{{num14}}</text>
                </g>
                <g id="svg_138">
                  <title>中继4</title>
                  <circle class="machine" id="circle_15" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="392.2"
                    cy="198.20003" r="20" @click="everyList($event)" />
                  <text id="text_15" :fill="num15 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="392.2" y="205.20003"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num15}}</text>
                </g>
                <g id="svg_141">
                  <title>中继6</title>
                  <circle class="machine" id="circle_18" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="540.19995"
                    cy="131.2" r="20" @click="everyList($event)" />
                  <text id="text_18" :fill="num18 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="540.19995" y="137.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num18}}</text>
                </g>
                <g id="svg_142">
                  <title>中继7</title>
                  <circle class="machine" id="circle_19" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="582.19999"
                    cy="105.2" r="20" @click="everyList($event)" />
                  <text id="text_19" :fill="num19 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="582.19999" y="112.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num19}}</text>
                </g>
                <g id="svg_143">
                  <title>宁洱</title>
                  <circle class="machine" id="circle_20" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="634.2"
                    cy="89.2" r="20" @click="everyList($event)" />
                  <text id="text_20" :fill="num20 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="634.2" y="95.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num20}}</text>
                </g>
                <g id="svg_144">
                  <title>中继8</title>
                  <circle class="machine" id="circle_21" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="684.19999"
                    cy="63.2" r="20" @click="everyList($event)" />
                  <text id="text_21" :fill="num21 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="685" y="69.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num21}}</text>
                </g>
                <g id="svg_145">
                  <title>普洱</title>
                  <circle class="machine" id="circle_22" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="739.2"
                    cy="41.2" r="20" @click="everyList($event)" />
                  <text id="text_22" :fill="num22 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="738.2" y="47.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num22}}</text>
                </g>
                <g id="svg_146">
                  <title>中继9</title>
                  <circle class="machine" id="circle_23" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="797.20002"
                    cy="45.2" r="20" @click="everyList($event)" />
                  <text id="text_23" :fill="num23 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="796.20002" y="51.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num23}}</text>
                </g>
                <g id="svg_147">
                  <title>普文</title>
                  <circle class="machine" id="circle_24" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="854.20002"
                    cy="63.2" r="20" @click="everyList($event)" />
                  <text id="text_24" :fill="num24 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="853.20002" y="68.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num24}}</text>
                </g>
                <g id="svg_148">
                  <title>中继10</title>
                  <circle class="machine" id="circle_25" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="910.19999"
                    cy="82.2" r="20" @click="everyList($event)" />
                  <text id="text_25" :fill="num25 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="909.19999" y="87.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num25}}</text>
                </g>
                <g id="svg_149">
                  <title>野象谷客场 </title>
                  <circle class="machine" id="circle_26" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="974.2"
                    cy="109.2" r="20" @click="everyList($event)" />
                  <text id="text_26" :fill="num26 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="973.2" y="115.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num26}}</text>
                </g>
                <g id="svg_150">
                  <title>西双版纳</title>
                  <circle class="machine" id="circle_28" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1015.19999"
                    cy="159.2" r="20" @click="everyList($event)" />
                  <text id="text_28" :fill="num28 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1014.19999" y="165.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num28}}</text>
                </g>
                <g id="svg_152">
                  <title>勐腊</title>
                  <circle class="machine" id="circle_34" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1294.19999"
                    cy="441.19998" r="20" @click="everyList($event)" />
                  <text id="text_34" :fill="num34 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1293.19999" y="448.19998"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num34}}</text>
                </g>
                <g id="svg_153">
                  <title>磨憨</title>
                  <circle class="machine" id="circle_35" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1299.19999"
                    cy="502.2" r="20" @click="everyList($event)" />
                  <text id="text_35" :fill="num35 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1298.19999" y="509.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num35}}</text>
                </g>
                <g id="svg_154">
                  <title>野象谷货场</title>
                  <circle class="machine" id="circle_27" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="942.2"
                    cy="161.2" r="20" @click="everyList($event)" />
                  <text id="text_27" :fill="num27 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="941.2" y="168.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num27}}</text>
                </g>
                <text id="svg_160" xml:space="preserve" text-anchor="middle" y="217.59998" x="1150.19998"
                  stroke-width="0" stroke="#ffffff" fill="#000">曼飞龙站</text>
                <text id="svg_165" xml:space="preserve" text-anchor="middle" y="270.59999" x="1198.20003"
                  stroke-width="0" stroke="#ffffff" fill="#000">梭罗河站</text>
                <g id="svg_166">
                  <title>勐远站</title>
                  <circle class="machine" id="circle_32" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1201.2"
                    cy="332.2" r="20" @click="everyList($event)" />
                  <text id="text_32" :fill="num32 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1200.2" y="339.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num32}}</text>
                </g>
                <text id="svg_170" xml:space="preserve" text-anchor="middle" y="369.60001" x="1178.19997"
                  stroke-width="0" stroke="#ffffff" fill="#000">勐远站</text>
                <g id="svg_171">
                  <title>曼勒站</title>
                  <circle class="machine" id="circle_33" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1249.19999"
                    cy="382.19999" r="20" @click="everyList($event)" />
                  <text id="text_33" :fill="num33 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1248.19999" y="389.19999"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num33}}</text>
                </g>
                <text id="svg_175" xml:space="preserve" text-anchor="middle" y="358.6" x="1278.20002" stroke-width="0"
                  stroke="#3d81fd" fill="#000">曼勒站</text>
                <!-- <text xml:space="preserve" text-anchor="middle" id="svg_208" y="441" x="197.80005" stroke-width="0"
                stroke="#3d81fd" fill="#000">罗里车间仓库</text> -->
                <line id="svg_29" x1="1296.20007" y1="462.20002" x2="1298.20007" y2="481" stroke-width="3"
                  stroke="#005fbf" fill="none" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" />
                <!-- <g id="svg_31">
                <title>普洱车间仓库</title>
                <image x="716.50004" y="87.69996" width="53" height="37"
                  xlink:href="data:image/png;base64,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"
                  id="svg_5" class="machine" />
                <text fill="#000000" stroke="#ffffff" stroke-width="0" x="744.00006" y="113.59999" font-size="null"
                  font-family="null" text-anchor="middle" xml:space="preserve" id="svg_17">0</text>
              </g>
              <text style="cursor: move;" xml:space="preserve" text-anchor="middle" y="147.59999" x="748.00006"
                stroke-width="0" stroke="#3d81fd" fill="#000" id="svg_40">普洱车间仓库</text> -->
                <g id="svg_25">
                  <title>研和</title>
                  <circle class="machine" id="circle_7" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="25.39999"
                    cy="511.60001" r="20" @click="everyList($event)" />
                  <text id="text_7" :fill="num7 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="21.39999" y="515.60001"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num7}}</text>
                </g>
                <g id="svg_42">
                  <title>峨山</title>
                  <circle class="machine" id="circle_8" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="54.19998"
                    cy="451.2" r="20" @click="everyList($event)" />
                  <text id="text_8" :fill="num8 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="455.59999" x="51.19998" stroke-width="0" stroke="#ffffff">{{num8}}</text>
                </g>
                <g id="svg_47">
                  <title>罗里站</title>
                  <circle class="machine" id="circle_9" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="85.19998"
                    cy="392.2" r="20" @click="everyList($event)" />
                  <text id="text_9" :fill="num9 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="82.19998" y="396.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num9}}</text>
                </g>
                <line id="svg_49" y2="357" x2="115" y1="375" x1="98" stroke-width="3" stroke="#005fbf" fill="none"
                  stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" />
                <line id="svg_53" y2="318" x2="171" y1="336" x1="137" stroke-width="3" stroke="#005fbf" fill="none"
                  stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" />
                <g id="svg_65">
                  <title>中继1</title>
                  <circle class="machine" id="circle_10" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="124.19998"
                    cy="346.2" r="20" @click="everyList($event)" />
                  <text id="text_10" :fill="num10 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="349.20001" x="121.59998" stroke-width="0" stroke="#ffffff">{{num10}}</text>
                </g>
                <g id="svg_57">
                  <title>元江站</title>
                  <circle class="machine" id="circle_11" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="183.20004"
                    cy="306.2" r="20" @click="everyList($event)" />
                  <text id="text_11" :fill="num11 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="308.59999" x="180.19998" stroke-width="0" stroke="#3d81fd">{{num11}}</text>
                </g>
                <g id="svg_61">
                  <title>中继2</title>
                  <circle class="machine" id="circle_12" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="244.19998"
                    cy="273.2" r="20" @click="everyList($event)" />
                  <text id="text_12" :fill="num12 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="277.59999" x="241.19998" stroke-width="0" stroke="#ffffff">{{num12}}</text>
                </g>
                <g id="svg_69">
                  <title>中继5</title>
                  <circle class="machine" id="circle_16" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="442.19997"
                    cy="176.2" r="20" @click="everyList($event)" />
                  <text id="text_16" :fill="num16 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="440.19997" y="181.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num16}}</text>
                </g>
                <g id="svg_74">
                  <title>过尧</title>
                  <circle class="machine" id="circle_17" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="489.19999"
                    cy="152.2" r="20" @click="everyList($event)" />
                  <text id="text_17" :fill="num17 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="487.19999" y="157.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num17}}</text>
                </g>
                <g id="svg_79">
                  <title>橄榄坝</title>
                  <circle class="machine" id="circle_29" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1053.19999"
                    cy="204.2" r="20" @click="everyList($event)" />
                  <text id="text_29" :fill="num29 > 0 ? '#fff' : '#000'" xml:space="preserve" text-anchor="middle"
                    y="209.59999" x="1050.19998" stroke-width="0" stroke="#ffffff">{{num29}}</text>
                </g>
                <g id="svg_83">
                  <title>曼飞龙站</title>
                  <circle class="machine" id="circle_30" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1108.2"
                    cy="244.2" r="20" @click="everyList($event)" />
                  <text id="text_30" :fill="num30 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1104.2" y="248.2"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num30}}</text>
                </g>
                <g id="svg_87">
                  <title>梭罗河站</title>
                  <circle class="machine" id="circle_31" fill="#fff" stroke="#3d81fd" stroke-width="3" cx="1150.19999"
                    cy="291.19999" r="20" @click="everyList($event)" />
                  <text id="text_31" :fill="num31 > 0 ? '#fff' : '#000'" stroke="#ffffff" stroke-width="0"
                    stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="1147.19999" y="296.19999"
                    font-family="serif" text-anchor="middle" xml:space="preserve">{{num31}}</text>
                </g>
                <!-- <g id="svg_88">
                <title>罗里车间仓库</title>
                <image x="106.09995" y="403.99999" width="53" height="37" id="svg_3"
                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAJVRJREFUeNrt3XmATfX/x/Hn586CQTIlJNwZQ+hLJVLom4gSQozlzkyyq1Aqpa+ofE1Z2jQJQ4pZzGL7Zk/SL1n6ipTSiFmtpabszHI/vz9mLvNlVK658zkz8378g7jnvM6Z5r7mfs45nw8IIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQpQgynQAITwjOHj/mxUqgE/b3D/uugtsEXp9mzagG6leTZsCbzCrQQPgPv1wrVrAIg5XqQJMZ5K3d4ENPYb92DHQt7L80CFQtZiZkgJ6NLnffgu6q35x61ao8HFW8uefw7xpDQefOGH66IUoDlIgooR7WWtts8HeE6ndH3oI+MOWFhYGahMtHnoIWKHHVapUDEG2qAHZ2UAzjm7YAHqic1t0NFR6p/xTixdDZOSNc06fNn22hChKUiCihAnu9UMvX1/wHV2xw+DBQFV935gxQDg+drvpdIVooCb/+iswQc+aMQO8gXfegfkqQP3xh+lwQlwNKRBRQvTbmLKha1ew9Vanp08H2tE4IMB0Kje4CuV+mr38MgS1qjt01ix4VSnldJoOJ8SVkAIRFhXcK3lflSrgW9NWb/ZsIJO0Pn1Mp/KAqWrel1+CHqMG9+8PsbF166akmA4lxN9hMx1AiP/lSEjVt90Gvnu8Ir7+mtJbHC7P64Ft2oDSuu0330DoA6lte/c2HUqIv0M+gQiLCK2YFtKvHzj36XvnzgX1HB38/EynMqiLCo+KgqwlXo2GDYPExNrPnjljOpQQBUmBCEPu1Ru0tzfUbmNn0iTQdtJeeMF0KgvaTtyOHZDzgdedvXtDfOs67ZOTTYcSAqRARLHrN3vPrOuvB9XA92B8PKi5DGzXznSqEsCp2h0/Dlzv7DtoEMREBL6+aJHpUKJskwIRxSS0YXrHZs1Ad3CuXbIEyCStbl3TqUqgUFK1BqqrFyMiIOu1U7XHjIHERbcsysoyHU6ULVIgwsNCZ6V2f/RR0NmMmDUL2Eq9ChVMpypFDqjR27ZBzud6ae/eEK8CVFqa6VCibJACEUWsU9DeEeXKwXUZPlvffRd0sE4cOtR0qjJgIzN++w2oorLDwiBml3366tWmQ4nSTQpEFJGQkXtH3HQT6Ge9IxYtAjWOtJYtTaf6G/bgPHsWeJ5VmZlAEjlnzwJHuaVqVSCT+lWrmg55BVbymdMJ3MDjr78OWbfaz738MiQmKpWbazqcKF2kQMRVcuxOOf3Pf4LaoCokJACbSate3XSqQqzB/u23oJqw6sMPQW9y3vzZZxCUFVjvhx8u/yR4cPD+N/39wXtUdrPWrcH2horq3h30LO7q27cE3G68lVOffw7Kx/aMwwHRSXU/OXzYdChROkiBCDeFtk1d+dRToKcS+8YbXDqLrWH6bXb9+COor2zrRo6EmK51I9avL7rtOxzp6VWrgjruPDBhAjCB90eMsN55OH8+JpFz5Ah4tVQ3hYRA1C/2Cp99ZjqVKNmkQMTfNHTooSF+fnD643PfRUaCbk9cSIjpVIXw584334Ssw6fv/de/iu/upPN3mT2tvePigI16Rv36pk9GoednXm4uqHWsf/VVqPejfVN4uMzFJdwhBSL+Qt+O+5bWrg1e57znL14M3KTfbtHCdKoC8q9hqME8O2wYRA8PWLZggbk4A8ckza1cGc5NKtcsMhIYSNW+fU2fpD/Rnq82bADvAfRxOPJmCT5yxHQoUTJIgYjLCNGpum1boJmqFx8PNNbrb7jBdKoCEtT9GRmgg9VnjzySNwnh9u2mQ12qpNzGrGfyzsGDoBc6R/btCwuH1Qv68kvTqYS1SYGI87RWChyOtHXPPw/qOjaGhwOZDPTyMp2tQMp3ObFmDTDSVsXhyCuO3383neqvnR/i2uQMSkgARjGmXj3TqQrxFC/l5AAtiA4PhyDsTJwoQ1yiMFIgZV5wrx96VaoEvrkVW334IeCne/TqZTpVAflPXqtJ3Dd1Kpy70c64cSX3ttSQkXtHXHMN6DE+G+fMAfWiXmbp2Xf/oeJXrICsHV4+/fvnTeqYmWk6lLAGKZAyq9+x5KH164Pte5tz6VLgfcbdcovpVAV0UeEnTwKbndUGDCi9cz85HKmPDh0KqoH6IiIC2Ks3+PqaTlWIIWr4/v3g9OeBPn1gYVP7M1u2mA4lzJICKXNCG6Z37NwZ9H7n+9HRQHe8rr3WdKoC7lFP7t0LzpW2P3r0gIXL62z+4QfToTzP4UhPv+MOUA2dSxISgD10Dww0naoQ+UNc+h36v/QSxMbaO0ydCqCU1qbDieIlBVIGXHRtYxX7X3sN6Ew7m5UWFEvgiZUrwTuLVaGhZXfNcNcQFwd8Aj/4AOsNKV5E9+HYsmXg05VbBwwou1+3skkKpNQ6P9bewXvw/Pmg4qnSvbvpVAVcdG2j3pd2/vUvuVh7QV7xh7ZNWzVqFOi26smpU7HuEJc/9vR00DF6Z+/eEJsZePt//2s6lPAsKZBSp9/sVN2wIdiq8dPSpcBifBs2NJ3qAj1PDTpxAtQSAvv3h5h+9rlLl5pOZX0hm1JubdEC6KVei48H2tE4IMB0qkK4nsupRNLYsRD9eUDn6dNNhxKeIQVSaoS0TP2oTx+gCkkffABUY1jFiqZTFXAY+549YBuqtvToAVF97a1+/NF0qJLn0e4HK113HeSuzLpn/nygN+937mw61eWp9fSNiYFzbU7XHj48b2aAkydNpxJFQwqkxAoO1trLC8odSiM8HPRLbHj+eSCaAGWhr6tapl5avhzOdcp9NSwMEhfVCzp2zHSq0uCiIa4MNW3aNOBu/aGPj+lshcj/AYKNzuTgYIjJrhe0a5fpUOLqWOiNRvw9538CHZ79fFwcEKXD7r/fdKoC5NqGEQ7/lG/uvBPUl6pifDwQjo/dbjpVIe4i+cwZUDN09qhREJ0U2GnuXNOhhHukQEqMvjvTYm+/Hbx8dfMlS7DeG8QY1mRmgu7JSYcDYpMDxqxdazpU2eNac972vW/lBQuATFp16mQ61Z/oosKjoqDiBl81fDhERt445/Rp06HE3yMFYnkhu1IiQ0NBX6+YPduC609MVA989x3o8Wpdjx55U4ukpJgOJUraEJdr+n09yGtycHDZef6nZJMCsZx79Qbt7Q2129iZNAm0nbQXXjCdqhDz+D0uDmy1KxwdPBiifqnxwKlTpkOJy+k3JHX8vfeCrQM3xMYC/6HLjTeaTnUp1116tNDrhw6F2O8CVFyc6VSicFIglhF2Q/INN9wAzsq2z+Ljgbuo2Lat6VQF5K8joX/jnnHjIDY2oOOUKaZDiSsV3GvviGrVwPdl74ioKGAyaQ88YDrVn8gf4spa4tVo2LC8ubjOnDEdSuSRAjEupE76h61bAw2cNRITgeo0rFnTdKoCNjLjt99At9bxfftC7MLA/Z9+ajqUuHolY/bl87YTt2MH5HzgdWfv3hDfuk775GTToco6KRBjLD+JXiQ7v/kGcvzo/sgjEK8CVFqa6VDCU86v/9KBNbGxWO8HGRenanf8OHC9s++gQaV3ks2SwUpzIZVynYL2jihXDkIOpjaZOxeU4tXZs7Fccbge/Ko4utyqNm2kOMqKGBWgPv8cbN85+992G+hxauy6daZTFcKmP7vmGuAh1SEhAUJ2pLWcPj1vWQIrfR+VDfIJxONCRu4dcdNNQEefdYsXA3F6zZ13mk5VwCWzq8q1DXHhQVXfhDTGjweqMm/8eKw3CafLATV62zbI+Vwv7d1bfvApHlIgHuPYnXL6n/8EtUFVSEgANpNWvbrpVAVMVUOPHgW9jLv69IHYJ+3/3rDBdChhVWE3pJ1p1w5yv9IHYmJAvYR3jRqmUxUi/5odVVR2WBjE7LJPX73adKjSSgqkyJ2/trFVZbz3Hta7774tL2/fDrZ2zgmPPAJR9eoFZWSYDiVKikd37n+zVi3IrZb7R1wc8Lwe2KaN6VSFyJ8RgerqxYgIqDjz1/eeew4i5zRvkZ1tOlxpIQVy1VxLwvq8VXHvBx9YeIlSuR1SFCHX80o3Yeell7D+EFdj9dAXX0BuDVuXfv0gblCdaYcOmQ5V0kmBuC109L6ng4JA53gnL1kCZOp3mzQxneoCPQ77uXPAJPqPGgWxsQELIiNNpxKllaNfSu377wfVRmVER2O9IVuX/KFbJuudoaEQExFw9JNPTIcqqaRArlhIk7SnOnUC2urOMTFAJvWrVjWdqoBurDh0CNjIiJ49ISYiQG3dajqUKCvO3zSC99G4OCCTya1bm05VCJn0swhIgfwNJWRJWH/GbtoEap3t9+BgiE6q+8nhw6ZDibKqxA1xteerDRvAewB9HI68pXmPHDEdyuqs+IW0iIFjkuZWrgwhn6U9s2gRKEX9yZOx3DeASlTBkZGQdfh0brt2UhzCGv5P3adycvKeL3nlFXAu14Hdu3N+1mbLWU/L++6D7BM8/fXX0G928j5L3hxgKfIJ5BIhB1Ob3Hwz8AyPLlkCeNOrcWPTqS5wXdtQM9XCJ56AmAi7Y94806mE+HvCkpP31akDzkzbzrg44B3uuPtu06kKkf98FC2IDg+HIOxMnChDXP9LCuS8kIOpTR5+GNjNdwsWAB+RVqWK6VQF5Ko3DhwA/YlzcM+eEJsZePt//2s6lBDuuWTWaYuuqHneP1T8ihWQtcPLp3//vLsYLflJqlhZaCimuLmetA3RqfqVV4DvmL5sGdYrjvzbD50fO29t3lyKQ5QOriGu6E0BauxY0N7s6dED8Gfv77+bTleI73WfLl3A98ncT3buhH7fpb1lyU9OxcqKTe9h55eE9c6uGxsLlNMrOnY0nepSrmsbfv1/nTlihDwAJcoGx+6U03XrAn6qQnw8qHGktWxpOlUhLpkCyN5h6lQApbQ2Ha64lKECcSSk6ttuA/UUq5YsAdrROCDAdKoC9uA8exZ4gm3Dh0PMwIC+8+ebDiWEGa7JR/0TfLZNnQq8qeNGjTKd6vJ0H44tWwY+Xbl1wIC8u7j++MN0Kk8rAwUS4pO20uEAnaEPzpljwSVhE9T9GRmgg9VnjzyStyTs9u2mQwlhLSEL0wb36AEM1mPnzQO643XttaZTFcIfe3o66Bi9s3fv0j7kXAoLpKQsCavf5cSaNZA93HtdSIhclBPi7+h3LHlo/fpge9c2OiEBSKL8bbeZTlWI/BEFVYmksWMh+vOAztOnmw5V1EpRgbiW6vR50rtqXByouQxs1850qgIuevL13I12xo2DxESlcnNNhxOiZOmvU3X58pDzjbpryhQsP8TlWmfnXJvTtYcPh8RFtyw6edJ0qqs+KtMBrp7DkZ5+xx2grnPWWbwYyCStbl3TqQroosJPngQ2O6sNGCArqAnhCaGvp9/csyfo5s6kDz7AendTuhzGvmcPsNGZHBwMMdn1gnbtMh3KXSW4QEJnpXZ/9FHQ2YyYNQvYSr0KFUynKuAe9eTevWCbkPv1I49A1C/1fvn+e9OhhCjdHu2e0q1BA8h90/ZjYiIwQa9t2tR0qkLcRfKZM6Bm6OxRoyA6KbDT3LmmQ12pElQg5+/K6OSTGxEBZOrnhwwxnaoQEcxatQq8qzI5JKSs3I0hhLWUtCEu13ILFTf4quHDITLyxjmnT5sO9VdKQIGcX8AmPOfBRYsAX/zuust0qgJkVk8hLM+xO+V0WBiop9XEmTOBagyrWNF0qkvpt9n144+gB3lNDg6GhcvrbP7hB9OpLsfCT6KH9kwZcc89kFMl5+Gvv8ZyxaHnqUEnTgB/qNiePS88USvFIYT1xDYO9IuKAmdPXm/eHPBXo6x47UGNpkmjRqAWOctv2QKOpqm6b1/TqS6b1nSAS1l+Sdj8i2C2oWpLjx4Q1dfe6scfTYcSQlyJ4OD9b1aoAD6v5l777rugwnW7wYNNp/oTllxR1AIFcn6scjNfz5wJvM/1jz1mOtWl1DL10vLlcK5T7qthYZC4qF7QsWOmUwkhioLrphxnNx6aOdOCDxy7bCduxw7I+cDrzt69Ib51nfbJyabCGCwQ17TOuZlecxcvBvWOHta8ubk8l5BrG0KUOWFxaZsbNQJnbT0vMRF4n3G33GI6VSGcqt3x48D1zr6DBpl6PMBAgThmpI2/7z5Q3dkaHw88ryOrVSv+HJeVv+CN7slJhwNikwPGrF1rOpQQojgF9/qhV6VK4NvC74bZs4HvGONwmE5ViPwfdKmuXoyIgKzXTtUeMybvQcWsLE/vvFgK5KIlYa9jY3g4kMlAL6/i2P/fNFE98N13oMerdT165M1JlZJiOpQQwgpKzBDXATV62zbI+Vwv7d0b4lWASkvz1M48WCDnGzy3YqsPPwT8dI9evTy3P7fN4/e4OLDVrnB08GCI+qXGA6dOmQ4lhLCi87N6/1s9nZgINNVPBwWZTlWIjcz47TegisoOC4OYXfbpq1cX9U48cBuva7Iz39F+127divWKw595ubmgNXvHjoWYcvbbHQ4pDiHEX4vtHaB27oRyD55t0qwZ538AtZx7ePK664CputvKlRCyI63l9OkwdMjX24rurtYi/ATiOJ7SrUsXUDXVm1FRWG+65fxG1q11fN++ELswcP+nn5oOJYQoDSw/tZJL/gqnuTVsXfr1g7hBdaYdOuTuxq6qQC66trGK/a+9BnSmnc1KDyg25OzOnWCLUPa8OansFVJTTYcSQpRGoQ3TOzZrBnqTMyghARjFmHr1TKcqxFQ19OhRYLLeGRoKMREBRz/55Eo34sYbfcjIvSOuuQZCFqSxdCkoRf3Jk7FccbimT664v9xbrVtLcQghPC86qe4nO3YAr+TYmjUD/brqnpBgOlUhXHe/PkT8mjUQ2jpVT54ML2ut//77+BV8AunnlxLZtCnY9qudS5ZgvWa9ZI3igI5TppgOJYQQBWbYaKC+iIgA9uoNvr6mUxWiPV9t2ADeA+jjcORNBnvkyOX+8d8oENdcLKoGL86di/UmIWuF/eefQX2mRwYHQ/TiwPc2bjQdSgghLhV2Q+oTLVuCsw8z4uOx3vpFLrnqjQMHgJHOLx95BGJaB367bdvF/+hPCiSkU9o/X30V8NfzJ0wwfTSX0uHYv/oKvP/wfqtnT1hwW+1nDx40nUoIIf5acPD+N/39odyq3B0ffQS6u57UtavpVIXIXxDPlpEbdN99EPVCvbFff+36y0IKJGRT2uwnngDe1x1nzDCdvhD+auqcOZC5Ottr5EhYva/+e+fOmQ4lhBDuyL8ZaVzqwWefBbXQFvraa1huElk9TnX46SfIfrnu3saNXUtxFygQhyM9vWpVUF31vzMygBV6XKVKpmODHof93DlgEv1HjYLY2IAFkZGmUwkhRNELXZZes1Ur0NfqpnFxwBw9q3Zt06kuUKOx9+gB0c0D1LJl/3O13Tk+OBjrFMdM3jl4ENRMaNtWikMIUfpFd697ePNm8HrHZ9Ptt3N+hVOr0APU0+3auf5UsEBmMb9ZM9PxgKlq3pdfgk9l3mneHGIiAtTWraZDCSFE8VmwrNbJ336DGH/75C5dgMewv/gi5+82NeZr3f/C5LcFCkStVEOMTg7Wg3YzZkDFV359uF27v7p9TAghygKltIaYDgFq8mRQU3TVdu0ujNAUNz1DJf36q+tPBQpEZ1LTc7M2FmIPzrNngfZ89dhjENMrIHXECIic07xFdnbxnxghhLA612MK2QNzcm+/HTinulz5E+Tus63VkRcekyhYIPdQtehnayxEgro/IwN0A5t3mzYQMzCg7/z5xXcChBCipEtcVP+9o0chKLHu9506gR6nq48fz/nJYovcOLLT0sBrDRs+/tj1HwsUyMKm9me2bAHSGL1+vQcC5D/hmNUtu1Pz5nnrbWzf7oH9CCFEGeFaITW2caDfpEmgGyo6dAB+Junw4SLYwRY1IDsbSLZFDB6cd2nh7FnXXxYy50luxdz+AwYAN7OsKBZU0iMY/dZbcGBAWp+OHS80pxBCiKIV+6T93xs2gHOz3n9VQ1zLyP3jD2Cj/q1XL4jpWjfi0g8Wf/IkemjD9I41a4JzqnPq+++DiqdK9+5/Y8cXpk1//PHHIXZhYL3ERNOnVQghyi7HutSZ3bqBOszwAQOAVWrEHXcA1XS3ihWBdWxPTQWcvLx6NXjv4dx77xXBXFguISPTwxs3BsY64zp3BrZwsm5d0BkqXGvgJt1v+3bITjgdvGhR3pq8J0+aPm1CCCFEPtd0w2FTkic3bw6OfinJwcHg2J1y+p//zFtK15KzXAohyrz+OlVfe23e7ObVq1/p9OlW48E10YtayMi02IEDgaNsevVVwEs/d9NNhfzD/Nl58aJOeDgEDbNnzJhx4WKT1YTFpW1u1Ahyw9QDzZoBwc4enpjtWB1ksdZAphp84ABkNfSq8/nnkJhY+9kzZ0yfBSFKl/OTJR7Keeb550GHqwcdDi6dmsR1rWGumrx8OTiP6zmvvQYLhwWopCTTR/FXLF0geZOMhfqmt5g1C3SwThw61I3NfKpWRUdD0JG6T/Tvb50iCX00reeAAaA/1g/NnUvxL8iVw6Ldu8E7jufuuOPiuyuEEO4InZXa/dZbwemg7sqVoB7n6Vq1rmADrufjvlVJgwZBTLa9c2ys6aO6HAt/dHJsTHty5MirKA6X+/VDoaGwr0P6D6NHmz6qC3Q6uY8/jrmVHL3p1bgx5D6TN9eYEMJ9/XWqrlEDdC5L1651ozhcbsZWvjwwXG9dsABCdKq27venBQtk6NBDQ/z8QFWmycsvF+GGG+lD48blXSOxwmSRzNRTL8wpY45uQnz16qZTCFGy5YxST0ycCGwmrUi+nzIZ6OUF9OWNGTOseq3EcoHgRNhZR/v2wDQe9Pcvwg1nUr9qVfCd7rfnwmySQleij7L0UKYQ1tUpaO+IcuWAVmT36+eBHeSPFPy0K/3tli1NH+3FLFggag31b77Zc9vX7+vVDRqYPkohRGlwzV7viJo18fgyGCpJj/bk+6J7rFggk1Qtj34hPLx9IYQoGyxYIEIIIUoCKRAhhBBukQIRQgjhFikQIYQQbpECEUII4RYpECGEEG6RAhFCCOEWKRAhhBBukQIxZwT1z50zHQKYBDILrxDiykmBGKM/4YMdOwwGWMlnTieo1TT95hvTZ0MIUfJ4mw5Qdjnne+157jnwapq7Q2ugPk81awZ8zypPrqioH+Xpo0fBdg/L338fomsF7Nqzx/TZEEKUPFIgxsQNqjPt0KG834eEAPB+sex4AhZaFUUIUXLJEJYQQgi3SIEIIYRwixSIEEIIt0iBCCGEcIsUiBBCCLdIgQghhHCL3MZrXHDw/jf9/cH3K6d/o0agW+dOqFDBc/vz6maLP3gQovrWvTspCUApra9+u6Gj9z0dFAQqxvv1OnUgt72zgc0TP6CMZ09WFujmRO/ZAwtPBw79+WfPnS8hxOVIgRjjOJ7SrUsX4FRO5fh44Dna+vmBQn3hyf06l+e1RUjrtB7r10PWjVo/8AAkJiqVm3vl2wtZmDZ4wQLQK/RTYWGgO+gj4MHjCOdnAFVDxWZnQ6hvyuonnoDopMBOc+d68swJIf6XDGEZo07Ymr7wAqjn6ODnZyCAnbfbt4fy/5d+9t57r/zlrk8crNDjwsIM5L9bf+jjA3qW7Z0JEwzsX4gyTwrEnOb6rlq1TIcAPVH3u+mmK39d7kmvylbIzxn9gjv5hRBXSwrEnPXUV8p0CHD6s9SdaxW2SCZaIT/RBFgihxBljhSIEEIIt0iBCCGEcIsUiBBCCLdIgQghhHCLFIgQQgi3SIEIIYRwixSIEEIIt0iBCCGEcIsUiBBCCLdIgQghhHCLFIg5fdSMnBzTIYAQ2zXZ2W68rq7tI7deV9S2qAGWyCFEmSMFYoxK4dcffzSdApzb9Ozdu9143a+52fv2Yf4N/Jje4E5+IcTVkgIxJvctHf3886DnELV5M+hx2M+dK4Ydt8L+88+gx+nq48dD3G12xzffXPlmXAs5KV/nC088ASSo+zMyiiG/q7DWYP/2W8ABw4cXw36FEBeRBaWMWTgsQCUlAcOgdWsAimdVi5ii3VzBhZzmzgViCCiW44C8OXgjimlvQoiLyCcQIYQQbpECEUII4RYpECGEEG6RAhFCCOEWKRAhhBBukQIRQgjhFikQIYQQbpHnQIwJGbl3xDXXALO8e7/4IjCc/bfeCnRWyT4+ntuvbszizEzgBWfmnDkQuzBw/6efur+9sCnJk5s3B+dbXpWfegqYz281anjwxM0l3ukE9nD/nj3g/Z1+57XXYL4KUEeOXPnmOgXtHVGuHFx3q0/NZ58F/bH+slUrYLm6u1w5Dx6Hr/79+HHgRW5NSICYrwIei4/34P6EKHJSIAb55L7xBtBb1x4yBMikNgBRupUn96ogDECPV/Zu3cAxPuXMzTdDbONAv/T0v7+dgWOS5lauDOcesGWvXQt8px/09weiPHzayuXlpyl07Ag530ODBnl/9eCDV76588VRXjvCw4HeOACI0h4+kHyvkNqjB/SrlfZWRgYsbGp/ZsuW4tm1EFdHhrDM+UUH5j+BboQKJ61cOeDfHL7zzit//dkPfO9o1AiYRl5xGKKvZ84991zF6+fo4ya/DkQToBTYrtMftmljMIcQV0wKxJyX6ebnZzoE0EMFVqx45S9Tv6nbrJBfPUeHq8rRgjArHAc38p07XwchzJECEUII4RYpECGEEG6RAhFCCOEWKRAhhBBukQIRQgjhFikQIYQQbpECEUII4RYpECGEEG6RAhFCCOEWKRAhhBBukQIRQgjhFikQc+ryw++/mw4Buqb+/Lffrvx1zop6Tmam6fTARma4k/+86/naCl8HZlPnqo5DiGInBWKMHkJFo+s//EzS4cOQM13X/uKLK3/5oVPpQ3bvBvzVqF27DB7HMQ5d7XmMjwdCSdXFNIP7/zjK7FOnIGcYGcuXG9i/EG6T9UCMiY0N6DhlCoSMTK32zTdAA/WfFi1Axem7K1cu+v3psYQ7ncBjjMvIAJuXs+WSJZD4S71fjh278u39n7pP5eTkrQvSujWc8y+/JTgYWKsfCwwEVY1z3h74/8v5LzacOQO26tz37bdQL9oe8/HHgCLWne25FnJyrcdh26hX3XMPqNpM8+g09XfqnQcOQHa0en3FCohXASotzYP7E6LISYEYFxMRcPSTTwBolf+rZ3Q9/7uXinKz86Y1HHziRP7v5xX4i59QHjmOzh7Z6v8s5LRlC5DBG57ZU75N+b++7dG9COFBMoQlhBDCLVIgQggh3CIFIoQQwi1WLJD31JbsbA9u/yF1r/LM6LwQoozxCrFl2IrhfVSFqFVZWaaP9mIWLBC1WP9+8qQHt5+qe1arZvoohRClgdenzinF8X7i/JWb//jD9NFezIIFos9w9MgRD24/hI533236KIUQpUHuZJXcqpXn96PW6nqHDpk+2otZsUCepf+ePR7cQRLlb7sNwm5IfaJlS9NHK4QoiYKDtfbyArVW3z94sAd3tJLPnE6o9Gm5oT/9ZPqoL2bBAslOOB28ezfoN1h3+rTn9uNMpcPMmTB06KEhfn6mj1oIUZL4vJp65sUXAW96NW7swR1tV1O+/x4iI2+c48n3Q/dYsEASF92yKCsL1Eg1/csvPbijodx2++1w6q5z7VesgEe7H6x03XWmj14IYU1aKwUhB1ObjBkDqpVa+OqrxbDb6/WQ9etNH/vlWPhupNCGKasHDwZ9h2o4Z04x7DB/Uj7lx+bp0yE3Qz/2n/+A7yk15KefYL4KUGfPmj4rQghPcg1N+dbYN7JmTdCzfOffey+oJfrGUaOAOL3mzjuLMZA/9rvvhpiIALV1q+mzczELF0hwr+R9VaqA73Hb3IMHgWoMq1jRdCohhPA8/Ta7fvwRYm+wd73lFgCljEz2+acsOITlkrioXtCxY0Ai10VGmk4jhBDFx7aEeZMngzWLw8XCn0Bc+utUXaMG5HwKSUnAR6RVqWI6lRBCFD0dpd77/ns4qFLfuP32C7NeW5OFP4G4zFcB6sgRIJk648ebTiOEEB6Qf7suSc5/P/mk1YvDpQQUiEvMcHvGe+8B/1DxK1aYTiOEEEUoisNTpkBs40A/dxZ4M6MEFYhrLDBre/aBgQOBe9STe/eaziSEEO7T73JizRo40CVt3IQJptNcqRJVIHkSF9V/7+hR0F+omQ8+COSqNw4cMJ1KCCGuwNNs37IFsoednhgcXFKGrC5WAi6i/5Ww5OR9depAbmXb7jVrQI2mSaNGplMJIUQhIpi1ahXYGlZo17s3RP1S44FTp0yHclcJ/ARysah69YIyMqD8tHO/tGwJ+GOPjzedSgghAH/m5eYCmar/xImQNcw++eGHS3pxuJSCTyCXE/p6+s09e4K+W9vffhuYo2fVrm06lRCiTDigRm/bBrqWmv744xAbW7fu9u2mQxW1UlwgLv11qi5fHrKPqoODBoFawtCnngI26hn165tOJ4QoFfwZu2kT6IdpO20axHawD//4Y7D2g4BXqwwUyOWELkuv2aoV6GBnfNeuwBI1pF07IE3PaNIE2Eq9ChVMpxRCWMIY1mRmAkfU0R07gKH6+Lp14NVM7122DBYsC/yP9aZb97QyXCCXlz/r5sh9I2vVgtxBPq2qVQOvW3W/KlVAO3Qdb2/TGYUQnqArqceys8H2kbN/ZiY4fdRnv/wCC08HDv35Z9PphBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCHEVfh/EV62t6wq5UAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTItMjRUMTY6NDI6MjErMDg6MDC1Yj43AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEyLTI0VDE2OjQyOjIxKzA4OjAwxD+GiwAAAE90RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fb3d6cTl2NmEwd3IvY2FuZ2t1Y3VuY2h1LnN2Z6e93JwAAAAASUVORK5CYII="
                  class="machine" />
                <text fill="#000000" stroke="#ffffff" stroke-width="0" x="135" y="429.39999" id="svg_11"
                  font-size="null" font-family="null" text-anchor="middle" xml:space="preserve">
                  <title>普洱车间仓库</title>0
                </text>
              </g> -->
              </g>
            </svg>
          </SvgPanZoom>
        </div>
        <div v-if="stockInquiryParam.sel == 1" style="padding: 20px;">
          <div style="text-align: center;" v-if="stockInList.length == 0">
            <p>{{stockInMsg}}</p>
          </div>
          <div v-else>
            <div v-for="(every,index) in listPage" :key="index">
              <div style="display: flex;text-align: left;">
                <p style="font-size: 18px;font-weight: bold;">仓库： {{every.warehouseName}}</p>
                <p style="margin: 24px 0 0 20px;font-size: 13px;color: #bbb;">数量：{{every.deviceList.length}}</p>
              </div>
              <el-table style="width: 100%;" ref="multipleTable" :data="every.deviceList" tooltip-effect="dark" border
                highlight-current-row @row-click="checkDeviceDetails">
                <el-table-column prop="deviceName" label="设备名称">
                </el-table-column>
                <!-- <el-table-column prop="warehouseName" label="仓库">
              </el-table-column> -->
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
              </el-table>
              <el-dialog title="设备详情" :visible.sync="dialogDeviceDetailVisible" :close-on-press-escape="false"
                :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
                <div>
                  <p class="font-title-style">库存信息</p>
                  <div class="font-div">
                    <div class="div-one">
                      <div class="one-left">
                        仓库名称
                      </div>
                      <div class="one-right">
                        {{deviceDetail.warehouseName}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        设备名称
                      </div>
                      <div class="one-right">
                        {{deviceDetail.deviceName}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        设备编号
                      </div>
                      <div style="width: 382px;display: flex;justify-content: space-between;">
                        <div class="one-right">
                          {{deviceDetail.deviceNumber}}
                        </div>
                        <div class="qrcodeClick" @click="getQrcode" v-preventClick>打印二维码</div>
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        货架号
                      </div>
                      <div class="one-right">
                        {{deviceDetail.shelfNumber}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        在库时长
                      </div>
                      <div class="one-right">
                        {{deviceDetail.stockInDays + ' 天'}}
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
                        {{deviceDetail.supplierName}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        系统名称
                      </div>
                      <div class="one-right">
                        {{deviceDetail.systemName}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        设备型号
                      </div>
                      <div class="one-right">
                        {{deviceDetail.deviceModel}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        生产日期
                      </div>
                      <div class="one-right">
                        {{deviceDetail.productTime}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        有效日期
                      </div>
                      <div class="one-right">
                        {{deviceDetail.validTime}}
                      </div>
                    </div>
                    <div class="div-one">
                      <div class="one-left">
                        生产批次
                      </div>
                      <div class="one-right">
                        {{deviceDetail.benchmark}}
                      </div>
                    </div>
                  </div>
                  <p class="font-title-style">备注信息</p>
                  <div class="font-div">
                    <div class="div-one">
                      <div class="one-left">
                        备注
                      </div>
                      <div class="one-right">
                        <el-input type="textarea" v-model="deviceDetail.note" readonly>
                        </el-input>
                      </div>
                    </div>
                  </div>
                  <p class="font-title-style">
                    设备状态：{{deviceDetail.flag == 0 ? '库存中' : (deviceDetail.flag == 1 ? '维修中' : (deviceDetail.flag == 2 ? '检修中' : '使用中'))}}
                  </p>
                  <el-timeline>
                    <el-timeline-item color="#3d82fe" size="large"
                      v-for="(activity, index) in deviceDetail.stockInOutList" :key="index">
                      {{activity.time}}
                      <span
                        style="display: inline-block;margin-left: 10px;">{{activity.type == 0 ? (activity.flag == 1 ? '新购入库' : (activity.flag == 2 ? '归还入库' : (activity.flag == 3 ? '维修入库' : '检修入库'))) : (activity.flag == 1 ? '使用出库' : (activity.flag == 2 ? '维修出库' : '检修出库'))}}</span>
                    </el-timeline-item>
                  </el-timeline>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeviceDetailVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogDeviceDetailVisible = false">确 定</el-button>
                </div>
              </el-dialog>
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
    </div>
    <div v-else>
      <div style="width: 60px;margin-bottom: 20px;display: flex;justify-content:space-between;cursor: pointer;"
        @click="backToImg">
        <img src="../assets/imgs/home/goback.png" style="height: 21px;" />
        <p style="margin: 0;">返回</p>
      </div>
      <el-tabs type="border-card" v-model="activeDeviceName" @tab-click="handleDeviceClick">
        <el-tab-pane name="allDevice" label="设备信息">
          <div v-if="siteDeviceList.length == 0" style="text-align: center;">
            <p>{{siteDeviceMsg}}</p>
          </div>
          <div v-else v-for="(every,index) in siteDeviceList" :key="index">
            <div style="display: flex;text-align: left;">
              <p style="font-size: 18px;font-weight: bold;">仓库： {{every.warehouseName}}</p>
              <p style="margin: 24px 0 0 20px;font-size: 13px;color: #bbb;">数量：{{every.deviceList.length}}</p>
            </div>
            <el-table ref="multipleTable" :data="every.deviceList" tooltip-effect="dark" style="width: 100%" border
              highlight-current-row @row-click="checkDeviceDetailsTwo">
              <el-table-column prop="deviceName" label="设备名称">
              </el-table-column>
              <!-- <el-table-column prop="warehouseName" label="仓库">
              </el-table-column> -->
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
            </el-table>
            <el-dialog title="设备详情" :visible.sync="dialogDeviceDetailTwoVisible" :close-on-press-escape="false"
              :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="false">
              <div>
                <p class="font-title-style">库存信息</p>
                <div class="font-div">
                  <div class="div-one">
                    <div class="one-left">
                      仓库名称
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.warehouseName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备名称
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.deviceName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备编号
                    </div>
                    <div style="width: 382px;display: flex;justify-content: space-between;">
                      <div class="one-right">
                        {{deviceDetailTwo.deviceNumber}}
                      </div>
                      <div class="qrcodeClick" @click="getQrcodeTwo" v-preventClick>打印二维码</div>
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      货架号
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.shelfNumber}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      在库时长
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.stockInDays + ' 天'}}
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
                      {{deviceDetailTwo.supplierName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      系统名称
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.systemName}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      设备型号
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.deviceModel}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      生产日期
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.productTime}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      有效日期
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.validTime}}
                    </div>
                  </div>
                  <div class="div-one">
                    <div class="one-left">
                      生产批次
                    </div>
                    <div class="one-right">
                      {{deviceDetailTwo.benchmark}}
                    </div>
                  </div>
                </div>
                <p class="font-title-style">备注信息</p>
                <div class="font-div">
                  <div class="div-one">
                    <div class="one-left">
                      备注
                    </div>
                    <div class="one-right">
                      <el-input type="textarea" v-model="deviceDetailTwo.note" readonly>
                      </el-input>
                    </div>
                  </div>
                </div>
                <p class="font-title-style">
                  设备状态：{{deviceDetailTwo.flag == 0 ? '库存中' : (deviceDetailTwo.flag == 1 ? '维修中' :  (deviceDetailTwo.flag == 2 ? '检修中' : '使用中'))}}
                </p>
                <el-timeline>
                  <el-timeline-item color="#3d82fe" size="large"
                    v-for="(activity, index) in deviceDetailTwo.stockInOutList" :key="index">
                    {{activity.time}}
                    <span
                      style="display: inline-block;margin-left: 10px;">{{activity.type == 0 ? (activity.flag == 1 ? '新购入库' : (activity.flag == 2 ? '归还入库' : (activity.flag == 3 ? '维修入库' : '检修入库'))) : (activity.flag == 1 ? '使用出库' : (activity.flag == 2 ? '维修出库' : '检修出库'))}}</span>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div slot="footer">
                <el-button @click="dialogDeviceDetailTwoVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogDeviceDetailTwoVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </div>

        </el-tab-pane>
        <el-tab-pane name="warnDevice" label="报警信息" v-if="everyStationDetail.flag == 1">
          <el-table :data="warnListPage" style="width: 100%" border>
            <el-table-column prop="warehouseName" label="报警仓库">
            </el-table-column>
            <el-table-column label="报警内容" width="300px">
              <template slot-scope="scope">
                <div>
                  <p style="margin: 0;">{{scope.row.note}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="报警时间" width="160px">
            </el-table-column>
            <el-table-column label="操作人">
              <template slot-scope="scope">
                <div>
                  <span>{{scope.row.name == '' ? '暂未处理' : scope.row.name}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <div>
                  <span>{{scope.row.flag == 0 ? '报警' : (scope.row.flag == 1 ? '处理中' : '处理完成')}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button v-if="scope.row.flag == 0" type="text" @click="warnDispose(scope.row)">确认</el-button>
                  <el-dialog title="处理报警" :visible.sync="dialogWarnVisible" :close-on-press-escape="false"
                    :close-on-click-modal="false" :modal-append-to-body="false" :append-to-body="true">
                    <div style="text-align: center;">
                      <p style="font-size: 16px;">确定处理该报警？</p>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogWarnVisible = false">取 消</el-button>
                      <el-button type="primary" @click="warnDisposeSure" v-preventClick>确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div style="width: 100%;height: 50px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @current-change="handleCurrentChange2" :current-page="page2"
                layout="total, prev, pager, next, jumper" :total="total2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import SvgPanZoom from 'vue-svg-pan-zoom';
  export default {
    components: {
      SvgPanZoom
    },
    props: {
      stockInquiryParam: {
        type: Object
      },
      warnList: {
        type: Array
      }
    },
    data() {
      return {
        img1: require('../assets/imgs/list.png'),
        img2: require('../assets/imgs/camer.png'),
        cliHeight: 500,
        num1: 10,
        siteSel: 0,

        dialogDeviceCheckVisible: false,
        deptId: '',
        supplierId: '',
        systemId: '',
        benchmark: '',
        deviceName: '',
        deviceModel: '',
        stockInList: [],
        menuList: [],
        propsMenu: {
          checkStrictly: true,
          emitPath: false,
          value: 'id',
          label: 'label'
        },
        supplierList: [],
        systemList: [],
        systemSelList: [],
        stockInMsg: '数据加载中...',
        listPage: [],
        total: 0,
        page: 1,
        pageNum: 10,
        keyword: '',

        stationInList: [],
        siteDeviceList: {},
        num7: 0,
        num9: 0,
        num10: 0,
        num8: 0,
        num11: 0,
        num14: 0,
        num12: 0,
        num13: 0,
        num15: 0,
        num16: 0,
        num18: 0,
        num17: 0,
        num22: 0,
        num19: 0,
        num21: 0,
        num23: 0,
        num25: 0,
        num20: 0,
        num24: 0,
        num26: 0,
        num27: 0,
        num28: 0,
        num29: 0,
        num30: 0,
        num31: 0,
        num32: 0,
        num33: 0,
        num34: 0,
        num35: 0,
        num: 'num',
        dialogDeviceDetailVisible: false,
        deviceDetail: {},

        dialogDeviceDetailTwoVisible: false,
        deviceDetailTwo: {},

        flag: 0,
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

        warnDeviceStockList: this.warnList,
        everyStationDetail: {},
        activeDeviceName: 'allDevice',
        siteWarnDeviceList: [],

        dialogWarnVisible: false,
        warnDetails: {},
        page2: 1,
        pageNum2: 10,
        total2: 0,
        warnListPage: [],

        siteDeviceMsg: '数据加载中',

      }
    },

    created() {
      // document.documentElement.clientHeight 
      this.cliHeight = document.body.clientHeight - 185;
      // console.log(document.documentElement);
      // this.getStationInList();
      // this.warnDeviceStockList = JSON.parse(sessionStorage.getItem('warnDeviceList'));
      // this.warnDeviceStockList = this.warnList;
      this.warehouseKeywordCheck();
      this.getWarehouseList();
      this.getSupplierAllList();
    },
    watch: {
      warnList(newVal, oldVal) {
        console.log(newVal);
        console.log(oldVal);
        this.warnDeviceStockList = newVal;
        this.$nextTick(() => {
          this.colorSure();
        })
      }
    },
    mounted() {
      // this.colorSure();
    },
    methods: {
      // 打印二维码
      getQrcode() {
        let param = "\"CMD\":\"2\",\"CMDDATA\":\"TEXT 30,30,\"TSS24.BF2\",0,1,1," + "\"仓库：" + this.deviceDetail
          .warehouseName + "\"" +
          "`TEXT 30,68,\"TSS24.BF2\",0,1,1,\"厂家：" + this.deviceDetail.supplierName + "\"" +
          "`TEXT 30,106,\"TSS24.BF2\",0,1,1,\"设备名称：" + this.deviceDetail.deviceName + "\"" +
          "`TEXT 30,144,\"TSS24.BF2\",0,1,1,\"设备型号：" + this.deviceDetail.deviceModel + "\"" +
          "`TEXT 30,182,\"TSS24.BF2\",0,1,1,\"入库时间：" + this.shellDateTwo(this.deviceDetail.stockInTime) + "\"" +
          "`TEXT 30,220,\"TSS24.BF2\",0,1,1,\"到期时间：" + this.shellDateTwo(this.deviceDetail.validTime) + "\"" +
          "`TEXT 30,258,\"TSS24.BF2\",0,1,1,\"编号：" + this.deviceDetail.deviceNumber + "\"" +
          "`QRCODE 340,174,L,5,A,0," + "\"" +
          this.deviceDetail.deviceNumber + "\"" + "\"CMDEND";
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
      getQrcodeTwo() {
        let param = "\"CMD\":\"2\",\"CMDDATA\":\"TEXT 30,30,\"TSS24.BF2\",0,1,1," + "\"仓库：" + this.deviceDetailTwo
          .warehouseName + "\"" +
          "`TEXT 30,68,\"TSS24.BF2\",0,1,1,\"厂家：" + this.deviceDetailTwo.supplierName + "\"" +
          "`TEXT 30,106,\"TSS24.BF2\",0,1,1,\"设备名称：" + this.deviceDetailTwo.deviceName + "\"" +
          "`TEXT 30,144,\"TSS24.BF2\",0,1,1,\"设备型号：" + this.deviceDetailTwo.deviceModel + "\"" +
          "`TEXT 30,182,\"TSS24.BF2\",0,1,1,\"入库时间：" + this.shellDateTwo(this.deviceDetailTwo.stockInTime) + "\"" +
          "`TEXT 30,220,\"TSS24.BF2\",0,1,1,\"到期时间：" + this.shellDateTwo(this.deviceDetailTwo.validTime) + "\"" +
          "`TEXT 30,258,\"TSS24.BF2\",0,1,1,\"编号：" + this.deviceDetailTwo.deviceNumber + "\"" +
          "`QRCODE 340,174,L,5,A,0," + "\"" +
          this.deviceDetailTwo.deviceNumber + "\"" + "\"CMDEND";
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

      // 获取某个站点下的仓库及设备
      everyList(e) {
        console.log(e);
        let idName = e.target.id.split('_')[1];
        console.log(idName);
        console.log(this.stationInList);
        this.siteDeviceList = [];
        this.siteDeviceMsg = '数据加载中';
        for (let i = 0; i < this.stationInList.length; i++) {
          // console.log(this.stationInList[i].stationId);
          if (this.stationInList[i].stationId == idName) {
            console.log(this.stationInList[i]);
            this.everyStationDetail = this.stationInList[i];
            this.siteDeviceList = this.everyStationDetail.warehouseList;

            console.log(this.siteDeviceList);
            if (this.siteDeviceList.length == 0) {
              this.siteDeviceMsg = '暂无数据';
            };

            this.siteWarnDeviceList = [];
            for (const iterator of this.warnDeviceStockList) {
              if (iterator.stationId == idName) {
                this.siteWarnDeviceList.push(iterator);
              }
            };
            if (this.siteDeviceList.length == 0 && this.siteWarnDeviceList.length == 0) {
              this.$message.error({
                message: '该站点仓库下暂无设备',
                showClose: true,
                duration: 2000
              });
            } else {
              this.siteSel = 1;
              this.activeDeviceName = 'allDevice';
            }
          }
        }

        console.log(this.siteWarnDeviceList);
      },
      // 处理该报警
      warnDispose(row) {
        console.log(row);
        this.warnDetails = row;
        this.dialogWarnVisible = true;
      },
      // 确定处理
      warnDisposeSure() {
        this.$axios.post(this.$store.state.baseUrl + '/warnCheck', {
          id: this.warnDetails.id
        }).then(res => {
          console.log('处理报警设备');
          console.log(res);
          this.$message.success({
            message: '处理成功',
            showClose: true,
            duration: 2000
          });
          this.dialogWarnVisible = false;
        }).catch(err => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
          this.dialogWarnVisible = false;
        })
      },
      // 是否有报警设备
      colorSure() {
        let circleList = document.getElementsByTagName('circle');

        circleList.forEach(item => {
          item.attributes[2].value = '#fff';
          item.attributes[3].value = '#3d81fd';
        })
        // this.warnDeviceStockList = JSON.parse(sessionStorage.getItem('warnDeviceList'));

        for (let j = 0; j < this.warnDeviceStockList.length; j++) {
          circleList.forEach(item => {
            if (this.warnDeviceStockList[j].stationId == item.id.split('_')[1]) {
              // console.log('==========');
              // console.log(this.warnDeviceStockList[j].stationId);
              // console.log(item.id.split('_')[1]);
              // console.log('==========111111111111');
              item.attributes[2].value = '#fff';
              item.attributes[3].value = '#ff3600';
              return
            }
          });
        };

        for (let u = 0; u < this.stationInList.length; u++) {
          this['num' + this.stationInList[u].stationId] = 0;
          circleList.forEach(item => {
            if (this.stationInList[u].stationId == item.id.split('_')[1]) {
              // console.log(this['num' + this.stationInList[u].stationId]);
              this['num' + this.stationInList[u].stationId] = this.stationInList[u].allDeviceNum;
              if (this['num' + this.stationInList[u].stationId] > 0) {
                item.attributes[2].value = item.attributes[3].value;
              }
            }
          });
        };
      },
      handleDeviceClick() {
        console.log(this.siteWarnDeviceList);
        if (this.activeDeviceName == 'warnDevice') {
          this.getList2();
        }
      },
      backToImg() {
        this.siteSel = 0;
        this.$nextTick(() => {
          this.colorSure();
        })
      },
      // 图表切换
      listOrChart() {
        if (this.stockInquiryParam.sel == 0) {
          this.stockInquiryParam.sel = 1;
        } else if (this.stockInquiryParam.sel == 1) {
          this.stockInquiryParam.sel = 0;
        };
        if (this.keyword == '') {
          this.filterListSure();
        } else {
          this.warehouseKeywordCheck();
        }
      },
      // 模糊搜索
      warehouseKeywordCheck() {
        this.deptId = '';
        this.supplierId = '';
        this.systemId = '';
        this.benchmark = '';
        this.deviceName = '';
        this.deviceModel = '';

        if (this.stockInquiryParam.sel == 0) {
          this.stationInList = [];
          this.$axios.post(this.$store.state.baseUrl + '/stationInList', {
            flag: this.flag,
            keyword: this.keyword
          }).then(res => {
            console.log('条件查找站点及设备');
            console.log(res);
            this.stationInList = res.data;
            if (this.findElem(this.stationInList) !== 1) {
              this.$message.warning({
                message: '暂无数据',
                showClose: true,
                duration: 2000
              })
            }
            this.$nextTick(() => {
              this.colorSure();
            });

          }).catch(err => {
            console.log(err);
          })
        } else if (this.stockInquiryParam.sel == 1) {
          this.stockInList = [];
          this.stockInMsg = '数据加载中...';
          this.$axios.post(this.$store.state.baseUrl + '/stockInList', {
            flag: this.flag,
            keyword: this.keyword
          }).then((res) => {
            console.log('模糊搜索库存列表');
            console.log(res);
            this.stockInList = res.data.list;
            this.total = res.data.total;
            console.log(this.stockInList);
            if (this.stockInList.length == 0) {
              this.stockInMsg = '暂无数据';
            };
            this.getList();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          });
        }
      },
      findElem(arrayToSearch) {
        for (let i = 0; i < arrayToSearch.length; i++) {
          if (arrayToSearch[i].allDeviceNum > 0) {
            return 1;
          }
        }
        return 0;
      },
      // 筛选设备
      filterList() {
        this.dialogDeviceCheckVisible = true;
      },
      // 部门选择
      menuChange() {
        this.$refs.menuCascaderFilter.dropDownVisible = false;
        console.log(this.deptId);
      },
      // 厂家选择
      supplierChange() {
        this.systemId = '';
        this.systemSelList = [];
        for (const item of this.systemList) {
          if (item.parentId == this.supplierId) {
            this.systemSelList.push(item);
          }
        }
      },
      // 确定筛选
      filterListSure() {
        if (this.stockInquiryParam.sel == 0) {
          this.stationInList = [];
          this.$axios.post(this.$store.state.baseUrl + '/stationInList', {
            flag: this.flag,
            keyword: this.keyword,
            deptId: this.deptId,
            supplierId: this.supplierId,
            systemId: this.systemId,
            benchmark: this.benchmark,
            deviceName: this.deviceName,
            deviceModel: this.deviceModel
          }).then(res => {
            console.log('条件查找站点及设备');
            console.log(res);
            this.stationInList = res.data;
            if (this.findElem(this.stationInList) !== 1) {
              this.$message.warning({
                message: '暂无数据',
                showClose: true,
                duration: 2000
              })
            };
            this.dialogDeviceCheckVisible = false;
            this.$nextTick(() => {
              this.colorSure();
            })
          }).catch(err => {
            console.log(err);
            this.dialogDeviceCheckVisible = false;
          })
        } else if (this.stockInquiryParam.sel == 1) {
          this.stockInList = [];
          this.stockInMsg = '数据加载中...';
          this.$axios.post(this.$store.state.baseUrl + '/stockInList', {
            flag: this.flag,
            keyword: this.keyword,
            deptId: this.deptId,
            supplierId: this.supplierId,
            systemId: this.systemId,
            benchmark: this.benchmark,
            deviceName: this.deviceName,
            deviceModel: this.deviceModel
          }).then((res) => {
            console.log('条件查找库存列表');
            console.log(res);
            this.stockInList = res.data.list;
            this.total = res.data.total;
            console.log(this.stockInList);
            if (this.stockInList.length == 0) {
              this.stockInMsg = '暂无数据';
            };
            this.getList();
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
        }
      },
      // 查看设备详细信息
      checkDeviceDetails(row) {
        console.log(row);
        this.deviceDetail = row;
        this.dialogDeviceDetailVisible = true;
      },
      checkDeviceDetailsTwo(row) {
        console.log(row);
        this.deviceDetailTwo = row;
        this.dialogDeviceDetailTwoVisible = true;
      },
      // 分页处理数据
      getList2() {
        console.log('分页数据');
        this.warnListPage = [];
        console.log(this.siteWarnDeviceList);
        this.total2 = this.siteWarnDeviceList.length;
        // es6过滤得到满足搜索条件的展示数据list
        this.warnListPage = this.siteWarnDeviceList.filter((item, index) =>
          index < this.page2 * this.pageNum2 && index >= this.pageNum2 * (this.page2 - 1)
        );
        console.log(this.warnListPage);
      },
      // 分页
      handleCurrentChange2(val) {
        console.log(`当前页: ${val}`);
        this.page2 = val;
        this.getList2();
        (function smoothscroll() {
          let currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          console.log(document.documentElement.scrollTop);
          console.log(document.body.scrollTop);
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
            console.log('0000000000000');
          }
        })();
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.listPage = [];
        console.log(this.stockInList);
        // es6过滤得到满足搜索条件的展示数据list
        this.listPage = this.stockInList.filter((item, index) =>
          index < this.page * this.pageNum && index >= this.pageNum * (this.page - 1)
        );
        console.log(this.listPage);
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
        (function smoothscroll() {
          let currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
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
  };
</script>
<style scoped lang="scss">
  .stock-inquiry-container {
    width: 100%;

    .stock-inquiry-top {
      padding: 22px 30px;
      padding-bottom: 0;
      background-color: #fff;
      border-radius: 6px;
      box-shadow: #aaa;
      text-align: left;
      display: flex;
      justify-content: space-between;

      .top-right {
        display: flex;

        p {
          margin: 0;
          cursor: pointer;
        }
      }
    }

    .stock-inquiry-main {
      margin-top: 20px;
      background-color: #fff;
      border-radius: 6px;

      .svg-style {
        width: auto;
        padding: 0 10px;
        overflow: hidden;
        position: relative;
      }
    }

    .input-style {
      width: 385px;
      margin-bottom: 20px;
    }

    .qrcode {
      display: inline-block;
      margin-left: 15px;
      cursor: pointer;
    }
  }

  text {
    pointer-events: none;
    font-size: 14px;
    font-weight: bold;
  }

  circle {
    cursor: pointer;
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
  }
</style>
<style lang="scss">
  #stock-inquiry {
    .el-dialog__body {
      padding: 0 20px;
    }

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
  }

  #stockWarehouseCheck {

    // .el-input__inner,
    // .el-button {
    //   height: 34px !important;
    //   line-height: 34px;
    //   font-size: 13px;
    // }

    // .el-button {
    //   line-height: 9px;
    // }

    .el-button--info {
      color: #000;
      background-color: #d1d8de;
      border-color: #d1d8de;
    }
  }

  .el-dialog__header {
    text-align: left;
  }
</style>