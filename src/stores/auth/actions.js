import axios from "axios";

const actions = {
  async login({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_AUTH_API}login`;

    const data = {
      data: {
        attributes: payload
      }
    };
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    };

    const config = {
      url,
      method,
      headers,
      data
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getProfile({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}profiles`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[user_id]": payload,
      include: "addresses"
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

      data.data[0].attributes.alamat = {};
      // Data address checked
      if (data.included) {
        data.data[0].attributes.alamat = data.included.find(obj => {
          return (
            obj.type == "addresses" &&
            obj.id == data.data[0].relationships.addresses.data[0].id
          );
        });
      }

      commit("setProfile", data.data);
      // commit('setIncluded', data.included)

      return data;
    } catch (e) {
      return e;
    }
  },
  async checkAuth({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}auth_check`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // "filter[user_id]": payload,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      return e;
    }
  },
  async refreshToken({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_OAUTH_TOKEN}`;

    const token = window.localStorage.getItem("access_token");
    const refresh_token = window.localStorage.getItem("refresh_token");
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // "filter[user_id]": payload,
    };
    let formData = new FormData();
    formData.set("grant_type", "refresh_token");
    formData.set("refresh_token", refresh_token);
    formData.set("client_id", process.env.VUE_APP_CLIENT_ID);
    formData.set("client_secret", process.env.VUE_APP_CLIENT_SECRET);
    formData.set("scope", "");

    const config = {
      url,
      method,
      data: formData,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response.data;

      window.localStorage.setItem("access_token", data.access_token);
      window.localStorage.setItem("refresh_token", data.refresh_token);

      return data;
    } catch (e) {
      return e;
    }
  },
  async logout({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}logout`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const params = {
      // "filter[user_id]": payload,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response;

      return data;
    } catch (e) {
      return e;
    }
  },
  async getUser({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}users/${payload}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {};

    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      let data = response.data;
      commit("setUser", data.data);
      // commit('setIncluded', data.included)

      return data;
    } catch (e) {
      return e;
    }
  },
  async getInternals({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}users`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[internal_user]": "true",
      include: "profile,groups",
      sort: payload.order == "asc" ? payload.property : "-" + payload.property,
      "page[size]": payload.pageSize,
      "page[number]": payload.pageNumber
    };

    // Additional params
    if (payload.searchColumn) {
      params["filter[" + payload.searchColumn.column + "]"] =
        payload.searchColumn.searchData;
    }
    if (payload.start_date) {
      params["filter[start_date]"] = payload.start_date;
    }
    if (payload.end_date) {
      params["filter[end_date]"] = payload.end_date;
    }
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      let data = response.data;
      commit("setInternals", data.data);
      commit("setIncluded", data.included);

      return data;
    } catch (e) {
      return e;
    }
  },
  async getGroups({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}groups`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    const params = {
      "page[size]": 100
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
      commit("setGroups", data.data);

      return data;
    } catch (e) {
      return e;
    }
  },
  async getGroupUser({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_AUTH_API
    }group_users?filter[user_id]=${payload}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers
    };
    try {
      const response = await axios(config);
      let data = response.data;
      commit("setGroupUser", data.data);

      return data;
    } catch (e) {
      return e;
    }
  },
  async updateGroupUser({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_AUTH_API}group_users/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const config = {
      url,
      // body,
      method,
      data: {
        data: payload,
        _method: "PATCH"
      },
      headers
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async updateUser({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_AUTH_API}users/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const config = {
      url,
      // body,
      method,
      data: {
        data: payload,
        _method: "PATCH"
      },
      headers
    };
    try {
      if (payload) {
        const response = await axios(config);
        return response;
      }
    } catch (e) {
      return Promise.reject(e.response);
    }
  },

  async resetPassword({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}password/email`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const params = {
      // "filter[user_id]": payload,
    };
    let formData = new FormData();
    formData.set("email", payload);

    const config = {
      url,
      method,
      data: formData,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response;

      return data;
    } catch (e) {
      return e;
    }
  },
  async newResetPassword({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}change/password/reset/axi`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const params = {
      // "filter[user_id]": payload,
    };
    let body = { nomor_axi_id: payload };

    const config = {
      url,
      method,
      data: body,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response;

      return data;
    } catch (e) {
      return e;
    }
  },
  async changePassword({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AUTH_API}password/change`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const params = {
      // "filter[user_id]": payload,
    };
    let formData = new FormData();
    formData.set("old_password", payload.old);
    formData.set("password", payload.new);
    formData.set("new_password", payload.newConfirm);

    const config = {
      url,
      method,
      data: formData,
      headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response;

      return data;
    } catch (e) {
      return Promise.reject(e.response);
    }
  },

  async postResetPassword({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_AUTH_API}password/reset`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";

    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json"
    };
    const params = {
      // "filter[user_id]": payload,
    };

    let formData = new FormData();
    formData.set("token", payload.token);
    formData.set("email", payload.email);
    formData.set("password", payload.password);
    formData.set("password_confirmation", payload.password_confirmation);

    const config = {
      url,
      method,
      headers,
      params,
      data: formData
    };
    try {
      const response = await axios(config);
      const data = response;

      return data;
    } catch (e) {
      return e;
    }
  }
};

export default actions;
