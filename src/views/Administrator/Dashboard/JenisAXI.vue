<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            report berdasarkan jenis axi
            <div>
              <small>Updated {{ updated }}</small>
            </div>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <doughnut-chart :chart-data="chartData" :options="options" />
        </div>
      </div>
    </stats-card>
  </div>
</template>

<script>
import StatsCard from "@/components/Cards/StatsCard";
import DoughnutChart from "@/views/Administrator/Dashboard/DoughnutChart";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  components: {
    DoughnutChart,
    StatsCard,
  },
  data() {
    return {
      chartData: null,
      options: {
        legend: {
          display: true,
          onClick: (e) => e.stopPropagation(),
          labels: {
            boxWidth: 5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            color: "white",
            align: "center",
            formatter: function (value) {
              return Math.round(value) + "%";
            },
            font: {
              weight: "bold",
              size: 20,
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
    ...mapActions("sap", ["getRegisterJenisAxi"]),

    async getData() {
      const resData = await this.getRegisterJenisAxi();
      const arrayData = Object.values(resData);
      const newArrayDAta = arrayData.shift();
      const totalData = arrayData.reduce((a, b) => a + b, 0);

      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");

      this.chartData = {
        labels: [
          `AXI Perorangan (${arrayData[0]})`,
          `AXI Pedagang (${arrayData[1]})`,
          `AXI Karyawan (${arrayData[2]})`,
        ],
        datasets: [
          {
            labels: ["AXI Perorangan", "AXI Pedagang", "AXI Karyawan"],
            backgroundColor: ["#F882A2", "#53E959", "#009EF6"],
            data: arrayData.map((item) => (item / totalData) * 100),
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
