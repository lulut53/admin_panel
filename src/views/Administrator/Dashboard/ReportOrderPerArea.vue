<template>
  <div>
    <stats-card>
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-5">
            REPORT ORDER PER AREA (MONTHLY)
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
  data() {
    return {
      chartData: null,
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
    ...mapActions("transaksi", ["getOrderPerArea"]),
    async getData() {
      const resData = await this.getOrderPerArea();
      const newArrayData = [];
      const newArrayLabel = [];
      resData.map((item) => {
        newArrayData.push(item.jumlah_order);
         newArrayLabel.push(item.area);
      });
      let date = new Date();
      this.updated = moment(date).format("DD MMMM YYYY");
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
          {
            label: `${newArrayLabel[3]} (${newArrayData[3]})`,
            backgroundColor: ["#EDEF9A"],
            data: [newArrayData[3]],
          },
          {
            label: `${newArrayLabel[4]} (${newArrayData[4]})`,
            backgroundColor: ["#1CE9F6"],
            data: [newArrayData[4]],
          },
          {
            label: `${newArrayLabel[5]} (${newArrayData[5]})`,
            backgroundColor: ["#FFCC80"],
            data: [newArrayData[5]],
          },
          {
            label: `${newArrayLabel[6]} (${newArrayData[6]})`,
            backgroundColor: ["#FDACFF"],
            data: [newArrayData[6]],
          },
          {
            label: `${newArrayLabel[7]} (${newArrayData[7]})`,
            backgroundColor: ["#009EF6"],
            data: [newArrayData[7]],
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
