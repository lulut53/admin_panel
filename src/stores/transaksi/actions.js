import axios from "axios";

const actions = {
  async getTransaksis({ commit }) {
    const url = `${process.env.VUE_APP_URL_TRANSACTION_API}transactions`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // paginate: false,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setTransaksis", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getTransaksisQueried({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}transactions`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include: payload.include,
      "filter[all]": payload.searchAll,
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
      params["filter[tanggal_start]"] = payload.start_date;
    }
    if (payload.end_date) {
      params["filter[tanggal_end]"] = payload.end_date;
    }

    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setTransaksis", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getTransaksi({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_COMPOSER_API
    }transactions/${payload}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include:
        "branch,area,current_pic.addresses,prospective_customer.addresses,agent.addresses,sub_product,product,object_brand,object_model,collateral,voucher-code,insurance_type,agent.detail-axis"
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);

      commit("setTransaksi", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getHistory({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_TRANSACTION_API
    }transactions/history/${payload}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // paginate: false,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setHistory", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getProfile({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}profiles/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // 'include': 'user.groups'
    };
    if (payload.params) {
      params.include = payload.params;
    }

    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      let response = await axios(config);

      response.data.data.attributes.role = response.data.included.find(obj => {
        return (
          obj.type == "groups" &&
          obj.id ==
            response.data.included.find(obj => {
              return obj.type == "users";
            }).relationships.groups.data[0].id
        );
      }).attributes.nama;

      commit("setProfile", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getAlamat({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}addresses/${payload}`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include: "village.district.city.province"
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setAlamat", response.data.data);
      commit("setAlamatIncluded", response.data.included);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getCabang({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}branches/${payload}`;

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
      commit("setCabang", response.data.data);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getCountTransaksi({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_TRANSACTION_API
    }transactions?page[size]=1`;

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
      commit("setCountTransaksi", response.data.meta.page.total);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getCount3Bulan({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_TRANSACTION_API}transactions/recap`;

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
      commit("setCount3Bulan", response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async updateTransaksi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_TRANSACTION_API}transactions/${
      payload.id
    }`;

    const token = window.localStorage.getItem("access_token");
    const method = "PATCH";
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.api+json",
      "Access-Control-Allow-Origin": "",
      "Content-Type": "application/vnd.api+json"
    };
    const config = {
      url,
      // body,
      method,
      data: {
        data: {
          type: "transactions",
          id: payload.id,
          attributes: payload.attributes
        }
      },
      headers
    };
    try {
      const response = await axios(config);
      // dispatch('getTransaksi', payload.id)
      return response;
    } catch (e) {
      return e;
    }
  },
  async exportTransaksiProcess({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}export/transaction`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      from: payload.from,
      to: payload.to
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getExportTransaksiStatus({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/2`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // paginate: false,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getExportTransaksiFile({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/2`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // paginate: false,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      window.open(response.data.data.attributes.file, "_self");

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerDay({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/currDay`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerMonth({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/currMonth`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerYear({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/currYear`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerArea({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_ORDER_IN_API}chart-data/order/area`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerSumberOrder({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/sumberOrder`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderPerJenisJaminan({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/jaminan`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getOrderDemografi({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_ORDER_IN_API
    }chart-data/order/agerange`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
    // const headers = {
    // 	"Accept": "application/vnd.api+json",
    // 	'Authorization': `Bearer ${token}`,
    // }
    // const params = {
    // 	// paginate: false,
    // }
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getTransactionStatusList({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_BFF}transaction/status/list`;

    const method = "get";

    const config = {
      url,
      method
    };

    try {
      const response = await axios(config);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async postTransactionStatus({ dispatch }, payload) {
    // TODO
    const url = `${process.env.VUE_APP_URL_API_HOST}upload-rpt/transaksi/update`;
    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      // Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      order_id: payload.order_id,
      status_transaksi: payload.status_transaksi
    };

    const config = {
      url,
      // body,
      method,
      // data: formData,
      headers,
      params
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async postImportDataStatusTransaksi({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_API_HOST
    }upload-rpt/import/status-transaksi`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      // Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    let formData = new FormData();
    formData.set("file", payload);

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
  async getListUploadFileTransaction({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_BFF}log-upload-file/list`;

    const method = "get";
    const params = {
      pageSize: payload.pageSize
    };

    const config = {
      url,
      method,
      params
    };
    try {
      const response = await axios(config);

      return response.data;
    } catch (e) {
      return e;
    }
  }
};

export default actions;
