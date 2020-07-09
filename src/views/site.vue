<template>
  <div class="adbook subMain clearfix">
    <p class="page_title">{{this.$ParentRouter}}&nbsp;&nbsp;>&nbsp;&nbsp;站点管理</p>
    <div class="top_btn clearfix">
      <Button type="primary" @click="addBtn" style="float: right;">新增站点</Button>
    </div>
    <Modal
      v-model="modal1"
      width="400"
      :title="aboxTitle"
      :closable="false"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="f_box">
        <Form :label-width="75" :model="formItem" :rules="ruleValidate" ref="formValidate">
          <FormItem label="站点名称" prop="name">
            <Input v-model="formItem.name" placeholder="Enter something..." />
          </FormItem>
          <FormItem label="序号">
            <Row>
              <Col span="19">
                <FormItem prop="number">
                  <Input type="text" v-model="formItem.number" placeholder="Enter something..." />
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="上行">
            <Row>
              <Col span="19">
                <FormItem prop="stationlastname">
                  <Input
                    type="text"
                    v-model="formItem.stationlastname"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="位置">
            <Row>
              <Col span="19">
                <FormItem prop="posilastJ">
                  <Input type="text" v-model="formItem.posilastJ" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">经度</Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="19">
                <FormItem prop="posilastW">
                  <Input type="text" v-model="formItem.posilastW" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">纬度</Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="19">
                <FormItem prop="posilastH">
                  <Input type="text" v-model="formItem.posilastH" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">高度</Col>
            </Row>
          </FormItem>

          <FormItem label="是否启用" prop="siteSwitch1">
            <i-switch v-model="formItem.siteSwitch1" @on-change="change1" />
          </FormItem>
          <FormItem label="下行">
            <Row>
              <Col span="19">
                <FormItem prop="posilastH">
                  <Input
                    type="text"
                    v-model="formItem.stationnextname"
                    placeholder="Enter something..."
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="位置">
            <Row>
              <Col span="19">
                <FormItem prop="posinextJ">
                  <Input type="text" v-model="formItem.posinextJ" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">经度</Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="19">
                <FormItem prop="posinextW">
                  <Input type="text" v-model="formItem.posinextW" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">纬度</Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="19">
                <FormItem prop="posinextH">
                  <Input type="text" v-model="formItem.posinextH" placeholder="Enter something..."></Input>
                </FormItem>
              </Col>
              <Col span="4" offset="1">高度</Col>
            </Row>
          </FormItem>
          <FormItem label="是否启用" prop="siteSwitch2">
            <i-switch v-model="formItem.siteSwitch2" @on-change="change2" />
          </FormItem>
        </Form>
      </div>

      <div slot="footer">
        <Button type="text" @click="cancel('formValidate')">取消</Button>
        <Button type="primary" @click="ok('formValidate')">保存</Button>
      </div>
    </Modal>
    <Tabs value="name1">
      <TabPane label="站点列表" name="name1">
        <Table :loading="loading" :columns="columns7" :data="siteList"></Table>
      </TabPane>
    </Tabs>
    <div class="account_subMain_section_footer">
      <Page
        size="small"
        :total="total"
        style="display: inline-block;margin-top: 0;"
        show-total
        show-elevator
        :page-size-opts="pagesizes"
        :page-size="limit"
        @on-change="currentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "site",
  data() {
    return {
      formItem: {
        id: "",
        name: "",
        number: "",
        stationlastname: "",
        posilastJ: "",
        posilastW: "",
        posilastH: "",
        stationnextname: "",
        posinextJ: "",
        posinextW: "",
        posinextH: "",
        siteSwitch1: false,
        siteSwitch2: false
      },
      stations: [],
      aboxTitle: "",
      modal1: false,
      loading: false,
      status1: 0,
      status2: 0,
      limit: 10,
      total: 0,
      nowpage: 1,
      currentpage: 1,
      pagesizes: [10],
      siteList: [],
      ruleValidate: {
        name: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        stationlastname: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posilastJ: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posilastW: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posilastH: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        stationnextname: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posinextJ: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posinextW: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ],
        posinextH: [
          {
            required: true,
            message: "此项不能为空",
            trigger: "blur"
          }
        ]
      },

      columns7: [
        {
          title: "站点名称",
          key: "name",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.name);
          }
        },
        {
          title: "站点序号",
          key: "sitePosition",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.location);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.which = "edit";
                      this.modal1 = true;
                      this.aboxTitle = "编辑";
                      this.gettablelist1(params.row.busId);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Common.waring(() => {
                        let currentIndex = params.index;
                        this.$api
                          .post("/bus/deleteBus/" + params.row.busId)
                          .then(res => {
                            if (res.code == 1) {
                              if (currentIndex == 0) {
                                this.nowpage = 1;
                              }
                              this.gettablelist();
                            }
                          });
                      }, "确定要删除吗？");
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    siteList(cval, oval) {}
  },
  created: function() {
    this.gettablelist();
  },
  mounted: function() {
    this.$nextTick(function() {});
  },
  methods: {
    gettablelist() {
      let param = {
        deviceType: this.deviceType,
        pageSize: this.limit,
        pageNum: this.nowpage
      };
      this.$api.post("/bus/findBus", param).then(res => {
        if (res.code == 1) {
          this.siteList = res.result.list;
          this.total = res.result.total;
          console.log(this.total);
        }
      });
    },
    gettablelist1(id) {
      let param = {
        busId: id
      };
      this.$api.post("/bus/findBus", param).then(res => {
        if (res.code == 1) {
          console.log(res.result);
          this.stations = res.result.stations;
          this.formItem.name = res.result.name;
          this.formItem.id = res.result.busId;
          this.formItem.number = res.result.location;
          this.formItem.stationlastname = res.result.stations[0].stationName;
          this.formItem.posilastJ = res.result.stations[0].stationLon;
          this.formItem.posilastW = res.result.stations[0].stationLat;
          this.formItem.posilastH = res.result.stations[0].stationHighly;
          this.formItem.siteSwitch1 =
            res.result.stations[0].employ == 1 ? true : false;
          this.formItem.stationnextname = res.result.stations[1].stationName;
          this.formItem.posinextJ = res.result.stations[1].stationLon;
          this.formItem.posinextW = res.result.stations[1].stationLat;
          this.formItem.posinextH = res.result.stations[1].stationHighly;
          this.formItem.siteSwitch2 =
            res.result.stations[1].employ == 1 ? true : false;
        }
      });
    },
    addBtn() {
      this.which = "add";
      this.$refs["formValidate"].resetFields();
      this.aboxTitle = "新增站点";
      this.modal1 = true;
      this.formItem.name = "";
      this.formItem.number = "";
      this.formItem.stationlastname = "";
      this.formItem.posilastJ = "";
      this.formItem.posilastW = "";
      this.formItem.posilastH = "";
      this.formItem.siteSwitch1 = false;
      this.formItem.siteSwitch2 = false;
      this.formItem.stationnextname = "";
      this.formItem.posinextJ = "";
      this.formItem.posinextW = "";
      this.formItem.posinextH = "";
    },
    change1(status) {},
    change2(status) {},
    sendlist() {
      this.status1 = this.formItem.siteSwitch1 ? 1 : 0;
      this.status2 = this.formItem.siteSwitch2 ? 1 : 0;
      let params = {
        name: this.formItem.name,
        location: this.formItem.number,
        describe: "测试数据",
        stations: [
          {
            stationName: this.formItem.stationlastname,
            stationLon: Number(this.formItem.posilastJ),
            stationLat: Number(this.formItem.posilastW),
            stationHighly: this.formItem.posilastH,
            isUpside: 1,
            describe: "测试数据上行",
            employ: this.formItem.siteSwitch1 ? 1 : 0
          },
          {
            stationName: this.formItem.stationnextname,
            stationLon: Number(this.formItem.posinextJ),
            stationLat: Number(this.formItem.posinextW),
            stationHighly: this.formItem.posinextH,
            isUpside: 0,
            describe: "测试数据下行",
            employ: this.formItem.siteSwitch2 ? 1 : 0
          }
        ]
      };
      this.modal1 = false;
      this.$api.post("bus/insertBusOrStation", params).then(res => {
        if (res.code == 1) {
          // this.siteList = res.result.list;
          // console.log(this.siteList);
          this.gettablelist();
        }
      });

      console.log(params);
    },
    ok(name) {
      var that = this;
      if (this.which === "add") {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.sendlist();
            this.modal1 = false;
            this.$refs[name].resetFields();
            // this.$emit('on-ok',this.formItem);
            // this.$nextTick(()=>{
            //   if(this.$refs[name]!=undefined){
            //          this.$refs[name].resetFields();
            //   }
            // })
            this.$Message.success("Success");
          } else {
            this.$Message.error("Fail!");
          }
        });
        // });
      } else if (this.which === "edit") {
        let params = {
          busId: that.formItem.id,
          name: this.formItem.name,
          location: this.formItem.number,
          describe: "测试数据",
          stations: [
            {
              id: this.stations[0].id,
              stationName: this.formItem.stationlastname,
              stationLon: this.formItem.posilastJ,
              stationLat: this.formItem.posilastW,
              stationHighly: this.formItem.posilastH,
              isUpside: 1,
              describe: "测试数据上行",
              employ: this.formItem.siteSwitch1 ? 1 : 0
            },
            {
              id: this.stations[1].id,
              stationName: this.formItem.stationnextname,
              stationLon: this.formItem.posinextJ,
              stationLat: this.formItem.posinextW,
              stationHighly: this.formItem.posinextH,
              isUpside: 0,
              describe: "测试数据下行",
              employ: this.formItem.siteSwitch2 ? 1 : 0
            }
          ]
        };
        this.modal1 = false;
        this.stations = [];
        this.$api.post("bus/updateBusOrStation", params).then(res => {
          if (res.code == 1) {
            // this.siteList = res.result.list;
            // console.log(this.siteList);
            this.gettablelist();
          }
        });

        // this.siteList[this.editIdx].siteName = this.siteName;
        // this.siteList[this.editIdx].sitePlo = this.sitePlo;
        // this.siteList[this.editIdx].sitePla = this.sitePla;
        // this.siteList[this.editIdx].siteSwitch = this.siteSwitch;
      }
    },
    cancel(name) {
      this.modal1 = false;
      this.$refs[name].resetFields();
      // this.$emit('on-cancel')
    },
    currentChange(current) {
      this.nowpage = current;
      this.gettablelist();
    }
  }
};
</script>

<style>
.sa_input {
  margin-left: 10px;
}
</style>