<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            LEADS PER SUMBER ORDER
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
            boxWidth: 10,
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
    ...mapActions("transaksi", ["getOrderPerSumberOrder"]),
    async getData() {
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
      const resData = await this.getOrderPerSumberOrder();

      const newArrayData = [];
      const newArrayLabel = [];
      resData.forEach((item) => {
        newArrayData.push(item.jumlah_order);
          newArrayLabel.push(item.sumber_order, item.jumlah_order);
      });
      const totalData = newArrayData.reduce((a, b) => a + b, 0);
      newArrayData.forEach((item) => (item / totalData) * 100);
      this.chartData = {
        labels: [
          `Customer (${resData[0].jumlah_order})`,
          `AXI (${resData[1].jumlah_order})`,
          `Channel (${resData[2].jumlah_order})`,
        ],
        datasets: [
          {
            labels: newArrayLabel,
            backgroundColor: ["#F882A2", "#53E959", "#009EF6"],
            data: newArrayData.map((item) => (item / totalData) * 100),
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
