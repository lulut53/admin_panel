import axios from "axios";

const actions = {
  async getManualNotifs({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}manual-notification`;
    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      page: payload.pageNumber,
      limit: payload.pageSize,
      ot: payload.order,
      ob: payload.property,
      search: payload.searchAll
    };
    // if (payload.searchColumn) {
    // 	params['filter[' + payload.searchColumn.column + ']'] = payload.searchColumn.searchData
    // }

    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      let data = response.data;

      commit("setManualNotifs", data.data);
      // commit('setIncluded', data.included)

      return data;
    } catch (e) {
      return e;
    }
  },
  async getPopupNotifs({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}popups`;
    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // "filter[user_id]": payload,
      // "include" : 'addresses'
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      let data = response.data;

      commit("setPopupNotifs", data.data);
      // commit('setIncluded', data.included)

      return data;
    } catch (e) {
      return e;
    }
  },
  async createNotification({ dispatch }, payload) {
    let url = "";
    if (payload.target == 4) {
      url = `${process.env.VUE_APP_URL_AUTH_API}notification/create`;
    } else {
      url = `${process.env.VUE_APP_URL_AUTH_API}notification/create/filter`;
    }

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("message", payload.message);
    formData.set("title", payload.title);
    formData.set("category", payload.category);

    if (payload.isLink) formData.set("url", payload.link);
    if (payload.isTime == 2) formData.set("schedule", payload.date);
    if (payload.target != 4) formData.set("value", payload.target);

    const config = {
      url,
      // body,
      method,
      data: formData,
      headers
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async sendNotifbyFile({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_BFF}onesignal/sendNotifToUser/fromExcel`;
    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      // "Accept": "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    const params = {
      schedule: payload.schedule
    };

    const config = {
      url,
      params,
      method,
      // data: formData,
      headers
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async updatePopup({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_AUTH_API}popups/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("url", payload.attributes.url);
    // formData.set('text', payload.attributes.text);
    if (payload.attributes.image)
      formData.set("image", payload.attributes.image);
    formData.set("role", payload.attributes.role);
    formData.set("status_id", payload.attributes.status_id);
    formData.set("_method", "PATCH");

    const config = {
      url,
      // body,
      method,
      data: formData,
      headers
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  }
};

export default actions;
