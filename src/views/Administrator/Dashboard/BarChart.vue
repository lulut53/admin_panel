
<script>
import { Bar, mixins } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.plugins.unregister(ChartDataLabels);
const { reactiveProp } = mixins;
export default {
  extends: Bar,
  mixins: [reactiveProp],
  name: "BarChart",
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
  // watch: {
  //   chartData () {
  //     this.$data._chartData.update()
  //   }
  // },
  mounted() {
    this.addPlugin(ChartDataLabels);
    this.renderChart(this.chartData, this.options);
  },
  // created() {
  //   this.addPlugin(ChartDataLabels);
  //   this.renderChart(this.chartData, this.options);
  // },
};
</script>
