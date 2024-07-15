<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            Report Statistik Registrasi
            <div>
              <small>updated {{ updated }}</small>
            </div>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md">
          <bar-chart :chart-data="chartData" :options="options" />
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
    tabIndex: "",
  },
  data() {
    return {
      chartData: null,
      options: {
        legend: {
          display: true,
          position: "top",
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
            anchor: "end",
            font: {
              weight: "bold",
              size: 14,
            },
          },
        },
      },
      updated: "",
      month: "",
    };
  },
  mounted() {
    this.getDataOrder();
    // console.log(this.chartData.datasets);
  },
  methods: {
    ...mapActions("sap", ["getRegisterjumlahRegisterAxi"]),
    async getDataOrder() {
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
      const resData = await this.getRegisterjumlahRegisterAxi();

      const month = moment(date).format("MMMM");
      const newData = [resData.monthly];

      this.chartData = {
        labels: [""],
        datasets: [
          {
            label: `${month.toUpperCase()} (${newData})`,
            backgroundColor: "#A5D6A7",
            data: newData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
