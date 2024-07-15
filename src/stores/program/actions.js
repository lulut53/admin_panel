import axios from "axios";
import { method } from "lodash";

const actions = {
  async getChannels({ commit }, payload = {}) {
    const paramsAll = {
      pageNo: payload.pageNumber,
      pageSize: payload.pageSize,
      filter: payload.searchFilter,
      filterValue: payload.searchQuery,
      status: 1
    };
    const url = `${process.env.VUE_APP_URL_BFF}channel`;
    const method = "get";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers,
      params: paramsAll
    };

    try {
      const response = await axios(config);
      const data = response.data;
      commit("setChannelList", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getDetails({ commit }, payload = {}) {
    const param = {
      filter: "id",
      filterValue: payload.id,
      status: 1
    };

    // const url = `${process.env.VUE_APP_URL_BFF}channel`;
    const url = `${process.env.VUE_APP_URL_BFF}channel?filter=${
      param.filter
    }&filterValue=${param.filterValue}&status=${param.status}`;
    const method = "get";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers
      // param
    };

    try {
      const response = await axios(config);
      // console.log(response);
      const data = response.data;
      // console.log(data.data);
      commit("setDetails", data);
      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async updateDetails({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/${payload.pkid}`;
    const method = "put";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      id: payload.id,
      profile_id: payload.profile_id,
      channel: payload.channel,
      channel_code: payload.channel_code,
      nama_channel: payload.nama_channel,
      email: payload.email,
      status: 1
    };

    // console.log(body);

    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      // console.log(response);
      const data = response.data;
      // console.log(data.data);
      commit("setUpdateDetails", response.status);
      return response.status;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async createNewUser({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}create-user/channel`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      nama: payload.nama,
      email: payload.email,
      flag: payload.flag,
      channel_id: payload.channel_id,
      channel_code: payload.channel_code
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setNewUser", data);
      return data;
    } catch (e) {
      console.warn(e.response);
      return e;
    }
  },
  async getRefreshToken({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/refresh-token`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      profile_id: payload.pkid
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setRefreshToken", data);
      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async removeToken({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/delete-user`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      profile_id: payload.profile_id
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setDeleteToken", data);
      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async validateFlag({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/check-flag`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      flag: payload.flag
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setFlagValidation", data);
      return data;
    } catch (e) {
      console.warn(e.response);
      return e;
    }
  },
  async validateEmail({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/check-email`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = {
      email: payload.email
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setEmailValidation", data);
      return data;
    } catch (e) {
      console.warn(e.response);
      return e;
    }
  },
  async getCheckChannelId({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/check-channel-id/${payload.channelId}`;
    const method = "get";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setCheckChannelId", data);
      return data;
    } catch (e) {
      console.warn(e.response);
      return e;
    }
  },
  async getCheckChannelCode({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}channel/check-channel-code/${payload.channel_code}`;
    const method = "get";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers
    };

    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setCheckChannelCode", data);
      return data;
    } catch (e) {
      console.warn(e.response);
      return e;
    }
  },
  async getListProgram({ commit }, payload = {}) {
    // console.log(payload);
    const url = `${process.env.VUE_APP_URL_BFF}third_party/page_setting/list`;
    const method = "get";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const paramsDefault = {
      pageNo: payload.pageNo,
      pageSize: payload.pageSize
    };
    const paramsSearch = {
      pageNo: payload.pageNo,
      pageSize: payload.pageSize,
      filter: payload.filter,
      filterValue: payload.filterValue
    };
    const config = {
      url,
      method,
      params:
        payload.filter !== "" && payload.filter !== "all"
          ? paramsSearch
          : paramsDefault
    };
    try {
      const response = await axios(config);
      const data = response.data;
      commit("setProgramList", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async postCreateUserProgram({ commit }, payload = {}) {
    // console.log(payload);
    const url = `${process.env.VUE_APP_URL_BFF}create-user/third_party`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const config = {
      url,
      method,
      headers,
      data: payload
    };
    try {
      const response = await axios(config);
      const data = response.data;
      commit("setResCreateUserProgram", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async postCreateProgram({ commit }, payload = {}) {
    // console.log(payload);
    const url = `${process.env.VUE_APP_URL_BFF}third_party/page_setting`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const config = {
      url,
      method,
      headers,
      data: payload
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async putUpdateProgram({ commit }, payload = {}) {
    console.log(payload);
    const url = `${process.env.VUE_APP_URL_BFF}third_party/page_setting/${
      payload.id
    }`;
    const method = "put";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const config = {
      url,
      method,
      headers,
      data: payload.data
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  },
  async postDeleteProgram({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/delete-user`;
    const method = "post";
    const token = payload.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = { profile_id: payload.profile_id };

    const config = {
      url,
      method,
      headers,
      data: body
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  },
  async postCheckEmail({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/check-email`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = { email: payload.email };

    const config = {
      url,
      method,
      headers,
      data: body
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  },
  async postCheckProgram({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/check-program`;
    const method = "post";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const body = { program: payload.program };

    const config = {
      url,
      method,
      headers,
      data: body
    };
    try {
      const response = await axios(config);
      const data = response.data;

      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  }
};

export default actions;
