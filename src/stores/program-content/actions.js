import axios from "axios";

const actions = {
  async getListContent({ commit }, payload = {}) {
    const url = `${
      process.env.VUE_APP_URL_BFF
    }third_party/content_setting/list/${payload.namaProgram}`;
    const method = "get";

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
      commit("setContentList", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async postCreateContent({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/content_setting`;
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
      commit("setNewContent", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async putUpdateContent({ commit }, payload = {}) {
    const { rowId, ...rest } = payload;
    const url = `${
      process.env.VUE_APP_URL_BFF
    }third_party/content_setting/${rowId}`;
    const method = "put";
    const token = window.localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const config = {
      url,
      method,
      headers,
      data: rest.payload
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
  async getListContentTypes({ commit }, payload = {}) {
    const url = `${
      process.env.VUE_APP_URL_BFF
    }third_party/content_setting/type`;
    const method = "get";

    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      const data = response.data;
      if (data) {
        const formattedData = data.map(each => {
          return { text: each.nama_tipe, value: each.tipe };
        });
        commit("setTypeListAll", formattedData);
        return formattedData;
      }
      return [];
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getListContentTypesByName({ commit }, payload = {}) {
    const url = `${
      process.env.VUE_APP_URL_BFF
    }third_party/content_setting/list/tipe_content/${payload.namaProgram}`;
    const method = "get";

    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      const data = response.data;
      if (data) {
        const formattedData = data.map(each => {
          return { text: each.type_content, value: each.value };
        });
        commit("setTypeListExist", formattedData);
        return formattedData;
      }
      return [];
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async deleteDeleteContent({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_BFF}third_party/content_setting/${
      payload.rowId
    }`;
    const method = "delete";
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
      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  }
};

export default actions;
