<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            DEMOGRAFI USIA <small>updated {{ updated }}</small>
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
  data() {
    return {
      chartData: null,
      options: {
        legend: {
          display: true,
          position: "right",
          onClick: (e) => e.stopPropagation(),
          labels: {
            boxWidth: 5,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            align: "start",
            anchor: "end",
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
    ...mapActions("transaksi", ["getOrderDemografi"]),
    async getData() {
      const resData = await this.getOrderDemografi();

      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
      this.chartData = {
        labels: [""],
        datasets: [
          {
            label: `< 22 (${resData[0].umurKur22})`,
            backgroundColor: "#A5D6A7",
            data: [resData[0].umurKur22],
          },
          {
            label: `23 - 27 (${resData[0].umur22_27})`,
            backgroundColor: "#FFCC80",
            data: [resData[0].umur22_27],
          },
          {
            label: `28 - 32 (${resData[0].umur28_32})`,
            backgroundColor: "#F882A2",
            data: [resData[0].umur28_32],
          },
          {
            label: `33 - 37 (${resData[0].umur33_37})`,
            backgroundColor: "#EDEF9A",
            data: [resData[0].umur33_37],
          },
          {
            label: `38 - 42 (${resData[0].umur38_42})`,
            backgroundColor: "#8FD7FF",
            data: [resData[0].umur38_42],
          },
          {
            label: `> 42 (${resData[0].umurLeb42})`,
            backgroundColor: "#1CE9F6",
            data: [resData[0].umurLeb42],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
