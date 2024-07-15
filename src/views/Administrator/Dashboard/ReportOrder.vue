<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            REPORT ORDER
            <div>
              <small>updated {{ updated }}</small>
            </div>
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <bar-chart :chart-data="chartData" :options="options2" />
        </div>
        <div class="col-md-8">
          <bar-chart :chart-data="chartData2" :options="options2" />
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
      // options: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   plugins: {
      //     datalabels: {
      //       textAlign: "start",
      //       font: {
      //         weight: "bold",
      //         size: 16,
      //       },
      //     },
      //   },
      // },
      chartData2: null,
      options2: {
        legend: {
          position: "top",
          display: true,
          onClick: (e) => e.stopPropagation(),
          labels: {
            padding: 20,
            boxWidth: 20,
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
    this.getDataOrder();
    // console.log(this.chartData.datasets);
  },
  methods: {
    ...mapActions("transaksi", [
      "getOrderPerDay",
      "getOrderPerMonth",
      "getOrderPerYear",
    ]),
    async getDataOrder() {
      const resData = await this.getOrderPerDay();
      const resData2 = await this.getOrderPerMonth();
      const resData3 = await this.getOrderPerYear();
      const newArray = [];
      const newArray2 = [];
      const newArray3 = [];
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
      newArray.unshift(resData.jumlah_order);
      newArray2.unshift(resData2.jumlah_order);
      newArray3.unshift(resData3.jumlah_order);
      this.chartData = {
        labels: [""],
        datasets: [
          {
            label: `DAILY (${newArray})`,
            backgroundColor: "#A5D6A7",
            data: newArray,
          },
        ],
      };
      this.chartData2 = {
        labels: [""],
        datasets: [
          {
            label: `MONTHLY (${newArray2})`,
            backgroundColor: "#EDEF9A",
            data: newArray2,
          },
          {
            label: `YEARLY (${newArray3})`,
            backgroundColor: "#00F0FF",
            data: newArray3,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
