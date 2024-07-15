<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            Leads per jenis jaminan
            <div>
              <small>updated {{ updated }}</small>
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
  name: "JenisJaminan",
  components: {
    DoughnutChart,
    StatsCard,
  },
  data() {
    return {
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          onClick: (e) => e.stopPropagation(),
          labels: {
            boxWidth: 10,
          },
        },
        plugins: {
          datalabels: {
            color: "white",
            textAlign: "start",
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
    ...mapActions("transaksi", ["getOrderPerJenisJaminan"]),
    async getData() {
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");

      const resData = await this.getOrderPerJenisJaminan();

      const newArrayData = [];
      const newArrayLabel = [];
      resData.map((item) => {
        newArrayData.push(item.jumlah_order);
          newArrayLabel.push(item.jenis_jaminan);
      });
      const totalData = newArrayData.reduce((a, b) => a + b, 0);
      this.chartData = {
        labels: [
          `Motor (${resData[0].jumlah_order})`,
          `Mobil (${resData[1].jumlah_order})`,
        ],
        datasets: [
          {
            labels: newArrayLabel,
            backgroundColor: ["#53E959", "#009EF6"],
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
