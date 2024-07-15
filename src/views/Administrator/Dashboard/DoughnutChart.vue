<script>
import { Doughnut, mixins } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.plugins.unregister(ChartDataLabels);
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  name: "DoughnutChart",
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.addPlugin(ChartDataLabels);
    this.renderChart(this.chartData, this.options);
  },
  // created() {
  //   this.addPlugin(ChartDataLabels);
  //   this.renderChart(this.chartdata, this.options);
  // },
};
</script>
