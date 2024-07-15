<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            REPORT STATUS AXI
            <div>
              <small>updated {{ updated }}</small>
            </div>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <bar-chart ref="chart" :chart-data="chartData" :options="options" />
        </div>
      </div>
    </stats-card>
  </div>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard";
import BarChart from "@/views/Administrator/Dashboard/BarChart";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    BarChart,
    StatsCard,
  },
  props: {
    tabindex: {
      type: Number,
    },
  },
  data() {
    return {
      chartData: null,
      index: "",
      options: {
        legend: {
          display: true,
          position: "right",
          onClick: (e) => e.stopPropagation(),
          labels: {
            boxWidth: 10,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            align: "end",
            anchor: "bottom",
            font: {
              weight: "bold",
              size: 14,
            },
          },
        },
      },
      updated: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions("sap", ["getRegisterStatusAxi"]),
    async getData() {
      const resData = await this.getRegisterStatusAxi();
      // console.log(resData);
      const newArrayData = [];
      const newArrayLabel = [];
      resData.map((item) => {
        newArrayData.push(item.jumlah);
          newArrayLabel.push(item.status_registrasi);
      });
      // console.log(newArrayLabel);
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
      // console.log(moment(date).format("DD MMMM YYYY"));
      this.chartData = {
        labels: [""],
        datasets: [
          {
            label: `${newArrayLabel[0]} (${newArrayData[0]})`,
            backgroundColor: ["#A5D6A7"],
            data: [newArrayData[0]],
          },
          {
            label: `${newArrayLabel[1]} (${newArrayData[1]})`,
            backgroundColor: ["#FFCC80"],
            data: [newArrayData[1]],
          },
          {
            label: `${newArrayLabel[2]} (${newArrayData[2]})`,
            backgroundColor: ["#F882A2"],
            data: [newArrayData[2]],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
