import Vue from 'vue';
import { ApmVuePlugin } from '@elastic/apm-rum-vue'
import Axios from 'axios';
import jQuery from 'jquery';
import BootstrapVue from 'bootstrap-vue'
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import Viewer from 'v-viewer';
import store from './stores/store';
import _ from "lodash";
import CKEditor from "@ckeditor/ckeditor5-vue";
// import datePicker from "vue-bootstrap-datetimepicker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
// import en from "vee-validate/dist/locale/en.json";
import id from "vee-validate/dist/locale/id.json";
import * as rules from "vee-validate/dist/rules";
// import locale from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale/lang/id";

import "bootstrap-vue/dist/bootstrap-vue.css";
import "pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css";
import "@/assets/global.css";

// router setup
import router from "./routes/router";

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("id", id);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
// plugin setup
Vue.use(ApmVuePlugin, {
  router,
  config: {
    serviceName: 'dccom-uat-adminctrlpnel',
    serverUrl: 'https://apmdevops.dicicilaja.com',
    secretToken: 'pIna8kgu0aj2Hi8WEVQM',
    environment: 'uat',
    // agent configuration
  }
})

Vue.use(BootstrapVue);
Vue.use(CKEditor);
Vue.use(DashboardPlugin);
Vue.use(Viewer);
Vue.use(ElementUI, { locale });
// Vue.use(datePicker);
// jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
//   icons: {
//     time: 'far fa-clock',
//     date: 'far fa-calendar',
//     up: 'fas fa-arrow-up',
//     down: 'fas fa-arrow-down',
//     previous: 'fas fa-chevron-left',
//     next: 'fas fa-chevron-right',
//     today: 'fas fa-calendar-check',
//     clear: 'far fa-trash-alt',
//     close: 'far fa-times-circle'
//   }
// });

// Add component date picker
import VCalendar from 'v-calendar';
Vue.use(VCalendar, {});

Vue.prototype.$api = Axios;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
