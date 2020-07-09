<template>
  <div class="devsetting subMain">
    <div id="container"></div>
    <div class="page_title" style="color:#fff;">{{this.$ParentRouter}}&nbsp;&nbsp;>&nbsp;&nbsp;设备配置</div>
    <!-- <div class="btnBox">
      <Select v-model="formItem.equipmentType" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>-->
    <div class="devset-container">
      <div class="menu">
        <div class="title">站台列表</div>
        <div class="equipmentList sbar">
          <ul>
            <li
              class="equipmentItem"
              v-bind:class="{selected:listIndex===index}"
              @click="showMarker(index)"
              v-for="(item,index) in siteList"
              :key="item.id"
            >
              <span class="name">{{item.stationName}}</span>
              <Icon type="md-settings" class="Icon" @click="settingPoup(item.id)" />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 设备配置弹窗 -->
    <Modal
      v-model="settingFlag"
      title="设备配置"
      class-name="vertical-center-modal"
      @on-ok="poupSure"
      @on-cancel="poupCancel"
    >
      <!--      <Form :model="formItem" :label-width="80">-->
      <!--        <FormItem label="设备名称">-->
      <!--          <Select v-model="formItem.equipmentType">-->
      <!--            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
      <!--          </Select>-->
      <!--        </FormItem>-->
      <!--      </Form>-->
      <!--      {{data1}}-->
      <div class="equipmentContent">
        <Transfer
          :data="data1"
          :target-keys="targetKeys1"
          :render-format="render1"
          @on-change="handleChange1"
          :titles="['设备列表','已选设备']"
          :list-style="{}"
        ></Transfer>
      </div>
    </Modal>
  </div>
</template>
<script>
import Vue from "vue";
import "@/assets/css/amap.css";
import amap from "../amap/amap";
import log from "./log";
export default {
  name: "App",
  data() {
    return {
      nowSiteId: 0,
      nowSiteName: "",
      siteList: [],
      equipmentList: [],
      rightList: [],
      data1: [],
      targetKeys1: [],
      name: "",
      settingFlag: false, // 控制设置弹窗的显示和隐藏
      formItem: {
        equipmentType: ""
      },
      cityList: [],
      listIndex: -1
    };
  },
  created: function() {
    // this.findLamppost();
    //获取站点列表
    this.$api.post("/station/findStationMenu").then(res => {
      if (res.code === 1) {
        this.siteList = res.result;
      } else {
      }
      // console.log('站点列表',res);
    });
  },
  mounted: function() {
    this.$nextTick(function() {});
    this.initMap();
  },
  methods: {
    findLamppost() {
      var self = this;

      self.$api
        .post("/lighpole/findLamppost", {
          pageNum: 1,
          pageSize: 1000
        })
        .then(function(res) {
          if (res.code === 1) {
            self.equipmentList = res.result.list;
            self.updateMarkers();
          }
        });
    },
    updateLamppost({ lamppostname, longitude, latitude, height, id }) {
      var self = this;

      self.$api
        .post("/lighpole/updateLamppost", {
          lamppostname,
          longitude,
          latitude,
          height,
          id
        })
        .then(function(res) {
          if (res.code === 1) {
            Vue.prototype.$Message.info(`【${lamppostname}】的经纬度已更新`);
          } else {
            Vue.prototype.$Message.error(res.message);
          }
        });
    },
    updateMarkers() {
      var self = this;

      if (window.amap && this.listIndex < 0 && self.equipmentList.length > 0) {
        self.equipmentList.forEach(obj => {
          if (obj.longitude && obj.latitude) {
            self.addMarker(obj);
          }
        });
        self.listIndex = 0;
      }
    },
    addMarker(obj) {
      var self = this;

      window.amap.addMarker({
        lng: obj.longitude,
        lat: obj.latitude,
        text: obj.lamppostname,
        data: obj,
        drag: function(marker) {
          var param = marker.getExtData();

          param.longitude = marker.getPosition().getLng();
          param.latitude = marker.getPosition().getLat();

          self.updateLamppost(param);
        }
      });
    },
    showMarker(index) {
      return;
      var self = this;
      var data = this.equipmentList[index];
      var marker = window.amap.markers[index]; //.find(m=>m.getExtData().id===data.id);
      var center = window.amap.amap.getCenter();

      this.listIndex = index;

      data.longitude = center.getLng();
      data.latitude = center.getLat();
      marker.setPosition(new AMap.LngLat(data.longitude, data.latitude));

      if (!data.longitude || !data.latitude) {
        data.longitude = center.getLng();
        data.latitude = center.getLat();
        self.addMarker(data);
      }

      // window.amap.setCenterAndZoom([data.longitude, data.latitude]);
      marker.setAnimation("AMAP_ANIMATION_DROP");
    },
    initMap() {
      var self = this;

      amap
        .loadAndInit({
          center: [119.778786, 34.168548],
          zooms: [15, 19],
          zoom: 15,
          limit: false
        })
        .then(amap => {
          window.amap = amap;
          self.updateMarkers();
        });
    },
    poupSure() {
      this.sendRightList(this.nowSiteId, parseInt(this.targetKeys1.join("")));
    },
    poupCancel() {
      this.nowSiteId = 0;
      this.data1 = [];
      this.targetKeys1 = [];
      //   this.$Message.info("Clicked cancel");
    },
    settingPoup(id) {
      this.settingFlag = true;
      this.nowSiteId = id;
      this.data1 = [];
      this.targetKeys1 = [];
      this.getEquList(id);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      // console.log(newTargetKeys);
      // console.log(direction);
      // console.log(moveKeys);
      if (newTargetKeys.length > 1) {
        this.$Message.error("只可配置一个设备");
      } else {
        this.targetKeys1 = newTargetKeys;
      }
    },

    //获取左侧设备列表
    getEquList(id) {
      this.$api.post("/device/findGateway/").then(res => {
        if (res.code === 1) {
          this.equipmentList = res.result;
          this.getRightList(id);
        }
        // console.log('左侧设备列表',res);
      });
    },
    //获取右侧设备列表
    getRightList(id) {
      this.$api.post("/device/findGatewayByStationId/" + id).then(res => {
        if (res.code === 1) {
          if (res.result.length > 0) {
            this.equipmentList.push(res.result[0]);
            this.targetKeys1 = [res.result[0].id];
          }
          this.getMockData();
        }
        // console.log("获取右侧设备列表",res);
      });
    },
    //整合左侧列表
    getMockData() {
      let mockData = [];
      console.log(this.equipmentList);
      for (let index in this.equipmentList) {
        mockData.push({
          key: this.equipmentList[index].id,
          label: this.equipmentList[index].name
          // description: "The desc of content  " + index,
          // disabled: !(this.targetKeys1.length != 0 || index == this.equipmentList.length - 1)
        });
      }
      this.data1 = mockData;
    },
    //发送右侧列表
    sendRightList(sitId, equId) {
      let sendData = {
        stationId: sitId,
        gatewayList: [{ id: equId }]
      };
      this.$api.post("/device/addGatewayByStationId/", sendData).then(res => {
        if (res.code === 1) {
          this.$Message.info(res.message);
          // console.log(res);
        } else {
          this.$Message.error(res.message);
        }
      });
    }
  }
};
</script>

<style scoped  lang="scss">
.devset-container {
  margin-top: 20px;
  height: calc(100vh - 174px - 81px);
  position: relative;
  width: max-content;
}
#container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #6a727d !important;
}
.menu {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 250px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  color: #fff;
  .title {
    line-height: 30px;
    border-bottom: 1px solid #666;
  }
  .equipmentList {
    max-height: calc(100% - 30px);
    overflow-y: auto;
    .equipmentItem {
      padding: 0 5px;
      line-height: 35px;
      height: 35px;
      .Icon {
        float: right;
        line-height: 35px;
        cursor: pointer;
      }
      &:hover,
      &.selected {
        background-color: #00ffff42;
      }
    }
  }
}

.addPoupForm label {
  display: inline-block;
  width: 100px;
  text-align: right;
  margin-right: 10px;
}

.equipmentContent {
  margin: 20px auto;
  width: 420px;
}
</style>


