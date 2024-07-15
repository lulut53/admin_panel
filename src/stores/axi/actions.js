import axios from "axios";
import { method } from "lodash";

const actions = {
  async getAxis({ commit }) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}detail-axis`;

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
      commit("setAxis", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getRefferalAxi({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}detail-axis/search`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      nomor_axi_id: payload,
    };
    const config = {
      url,
      method,
      // headers,
      params
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getAxisQueried({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}detail-axis`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include: payload.include,
      "filter[status_id]": payload.status,
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
      commit("setAxis", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getAxisQueriedSingleService({ commit }, payload = {}) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}detail-axis`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include: payload.include,
      "filter[status_id]": payload.status,
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
      commit("setAxis", response.data.data);
      commit("setIncluded", response.data.included);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getAxi({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}detail-axis/${payload}`;
    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      include:
        "accounts.banks,profile.addresses,npwps,registration_branch,branch"
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
      // console.log(data);
      commit("setAxi", data.data);
      commit("setIncluded", data.included);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getAxiRegList({ commit }, payload = {}) {
    // console.log(payload);

    const url = `${process.env.VUE_APP_URL_SAP_API}axiRegList`;
    const method = "get";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    // };

    let request_column = "jenis_axi";
    let request_value = `${payload.filterByJenisAxi}`;
    if(payload.searchColumn.searchData){
      request_column = `${request_column}_and_${payload.searchColumn.column}`
      request_value = `${payload.searchColumn.searchData},${request_value}`
    }

    const params = {
      pageNo: payload.pageNumber,
      pageSize: payload.pageSize,
      filter: request_column,
      filterValue: request_value
    };

    const config = {
      url,
      method,
      // headers,
      params
    };
    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setListRegAxi", data.data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getAxiDetailList({ commit }, profileId) {
    // console.log(profileId);

    const url = `${process.env.VUE_APP_URL_SAP_API}axiRegDetail/${profileId}`;
    const method = "get";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    // };
    // const params = {
    //   "pageNo":payload.pageNumber,
    //   "pageSize":payload.pageSize,
    //   "filter":payload.searchColumn.column,
    //   "filterValue":payload.searchColumn.searchData
    // };
    const config = {
      url,
      method
      // headers,
      // params,
    };
    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setDetailRegAxi", data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getLokasi({ commit }, payload = "") {
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
      commit("setLokasi", response.data.data);
      commit("setLokasiIncluded", response.data.included);

      return response.data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getBanks({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}banks`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      // "include": "village.district.city.province",
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setBanks", response.data.data);

      return response.data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getCabangs({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}branches`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[nama]": payload,
      "page[size]": 10,
      "page[number]": 1
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setCabangs", response.data.data);

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
    const params = {
      // "filter[nama]": payload,
      // "page[size]": 10,
      // "page[number]": 1,
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setCabang", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getProvinsis({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}provinces`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[nama]": payload,
      "page[size]": 10,
      "page[number]": 1
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setProvinsis", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getKotas({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}cities`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[nama]": payload.nama,
      "filter[provinsi_id]": payload.provinsi,
      "page[size]": 10,
      "page[number]": 1
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setKotas", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getKecamatans({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}districts`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[nama]": payload.nama,
      "filter[kota_id]": payload.kota,
      "page[size]": 10,
      "page[number]": 1
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setKecamatans", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getDesas({ commit }, payload = "") {
    const url = `${process.env.VUE_APP_URL_AREA_API}villages`;

    const token = window.localStorage.getItem("access_token");
    const method = "get";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const params = {
      "filter[nama]": payload.nama,
      "filter[distrik_id]": payload.kecamatan,
      "page[size]": 10,
      "page[number]": 1
    };
    const config = {
      url,
      method,
      headers,
      params
    };
    try {
      const response = await axios(config);
      commit("setDesas", response.data.data);

      return response.data;
    } catch (e) {
      return e;
    }
  },
  async getPoint({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_BR_API
    }points?filter[profile_id]=${payload}`;

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
      commit("setPoint", response.data.data);
      return response.data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getCountPendaftaranAXI({ commit }, payload = "") {
    const url = `${
      process.env.VUE_APP_URL_PROFILE_API
    }detail-axis?filter[status_id]=4,5,6,7&page[size]=1`;

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
      commit("setCountPendaftaranAXI", response.data.meta.page.total);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  // Edit data axi
  async updateAxi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}detail-axis/${
      payload.id
    }`;

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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updateProfile({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}profiles/${payload.id}`;

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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updateAlamat({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}addresses/${payload.id}`;

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
      return Promise.reject(e.response);
    }
  },
  async updateRekening({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}accounts/${payload.id}`;

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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updateNpwp({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}npwps/${payload.id}`;

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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updatePoint({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_BR_API}points/${payload.id}`;

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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updateFotoProfile({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}profiles/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    Object.keys(payload.attributes).forEach(function(key) {
      if (key != "avatar_url" && key != "scan_ktp_url") {
        if (payload.attributes[key] == null || payload.attributes[key] == "") {
          formData.set(key, "");
        } else {
          formData.set(key, payload.attributes[key]);
        }
      }
    });
    if (payload.avatar) formData.set("avatar", payload.avatar);
    if (payload.ktp) formData.set("ktp", payload.ktp);
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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  //async updateFotoNpwp({ dispatch }, payload) {
    //const url = `${process.env.VUE_APP_URL_PROFILE_API}npwps/${payload.id}`;

    //const token = window.localStorage.getItem("access_token");
    //const method = "POST";
    //const headers = {
     // Accept: "application/vnd.api+json",
      //Authorization: `Bearer ${token}`,
      //"Content-Type": "multipart/form-data"
    //};

    //let formData = new FormData();
    //Object.keys(payload.attributes).forEach(function(key) {
     // if (key != "scan_url") {
       // if (payload.attributes[key] == null || payload.attributes[key] == "") {
         // formData.set(key, "");
       // } else {
         // formData.set(key, payload.attributes[key]);
        //}
     // }
    //});
    //if (payload.scan_url) formData.set("scan_url", payload.scan_url);
    //formData.set("_method", "PATCH");

    //const config = {
     // url,
      // body,
     // method,
     // data: formData,
      //headers
    //};
    //try {
     // const response = await axios(config);
      //return response;
    //} catch (e) {
     // console.log(e.response);
      //return Promise.reject(e.response);
    //}
  //},
  async updateFotoRekening({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}accounts/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    let formData = new FormData();
    Object.keys(payload.attributes).forEach(function(key) {
      if (key != "scan_url") {
        if (payload.attributes[key] == null || payload.attributes[key] == "") {
          formData.set(key, "");
        } else {
          formData.set(key, payload.attributes[key]);
        }
      }
    });
    if (payload.scan_url) formData.set("scan_url", payload.scan_url);
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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async updateFotoNpwp({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}npwps/${payload.id}`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    let formData = new FormData();
    Object.keys(payload.attributes).forEach(function(key) {
      if (key != "scan_url") {
        if (payload.attributes[key] == null || payload.attributes[key] == "") {
          formData.set(key, "");
        } else {
          formData.set(key, payload.attributes[key]);
        }
      }
    });
    if (payload.scan_url) formData.set("scan_url", payload.scan_url);
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
      console.log(e.response);
      return Promise.reject(e.response);
    }
  },
  async importAxi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}import/axi`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
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
  // async importIntensif({ dispatch }, payload) {
  //   const url = `${
  //     process.env.VUE_APP_URL_BR_API
  //   }existing/point/file/import/insentif`;

  //   const token = window.localStorage.getItem("access_token");
  //   const method = "POST";
  //   const headers = {
  //     Accept: "application/vnd.api+json",
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "multipart/form-data"
  //   };

  //   let formData = new FormData();
  //   formData.set("file_excel", payload);

  //   const config = {
  //     url,
  //     // body,
  //     method,
  //     data: formData,
  //     headers
  //   };
  //   try {
  //     const response = await axios(config);
  //     return response;
  //   } catch (e) {
  //     return e;
  //   }
  // },
  
  async importInsentifDaily({dispatch}, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/importInsentifDaily`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
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
 
  async downloadTemplateInsentifDaily({dispatch}, payload) {
    try {
      window.open(`${process.env.VUE_APP_URL_PROFILE_API}axi/download-insentif-daily-template`);
      return "OK";
    } catch (error) {
      return e;
    }
  },

  async importPoint({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_BR_API}existing/point/file/import`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    };

    let formData = new FormData();
    formData.set("file_excel", payload);

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
  async importAnggota({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/updateAnggota`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
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
    async importMatrix({ dispatch }, payload) {
       const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/importMatrix`;
     
         const token = window.localStorage.getItem("access_token");
         const method = "POST";
         const headers = {
           Accept: "application/vnd.api+json",
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
       
  async importFID({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/importFid`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
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
  // async importInsentifDetail({ dispatch }, payload) {
  //   const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/updateInsentif`;

  //   const token = window.localStorage.getItem("access_token");
  //   const method = "POST";
  //   const headers = {
  //     Accept: "application/vnd.api+json",
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "multipart/form-data"
  //   };

  //   let formData = new FormData();
  //   formData.set("file", payload);

  //   const config = {
  //     url,
  //     // body,
  //     method,
  //     data: formData,
  //     headers
  //   };
  //   try {
  //     const response = await axios(config);
  //     return response;
  //   } catch (e) {
  //     return e;
  //   }
  // },
  async importInsentifMonthly({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_PROFILE_API}axi/import-insentif-monthly`;

    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
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
  async downloadInsentifMonthlyDynamicTemplate({ dispatch }, payload) { 
    try {
      window.open(`${process.env.VUE_APP_URL_PROFILE_API}axi/download-insentif-monthly-template`);
      return "OK";
    } catch (error) {
      return e;
    }
  },

  async exportAxi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}export/axidate`;

    try {
      window.open(`${process.env.VUE_APP_URL_COMPOSER_API}export/axidate?from=${payload.from}&to=${payload.to}`);
      return "OK";
    } catch (error) {
      return e;
    }


    // const token = window.localStorage.getItem("access_token");
    // const method = "get";
    // const headers = {
    //   Accept: "application/vnd.ms-excel", //"application/vnd.api+json",
    //   Authorization: `Bearer ${token}`
    // };
    // const params = {
    //   from : payload.from, 
    //   to : payload.to,
    //   // paginate: false,
    // };

    // const config = {
    //   url,
    //   method,
    //   headers,
    //   params
    // };
    // try {


    //   const response = await axios(config);
    //   //window.open(url, "_self");
 
      
    //   return response.data;
    // } catch (e) {
    //   return e;
    // }
  },
  //async exportAxiProcess({ dispatch }, payload) {
    //const url = `${process.env.VUE_APP_URL_COMPOSER_API}export/axi`;

   // const token = window.localStorage.getItem("access_token");
    //const method = "get";
    //const headers = {
      //Accept: "application/vnd.api+json",
      //Authorization: `Bearer ${token}`
    //};
    //const params = {
      //from: payload.from,
      //to: payload.to
    //};
    //const config = {
      //url,
      //method,
      //headers,
     // params
    //};
    //try {
      //const response = await axios(config);

      //return response.data;
    //} catch (e) {
     // return e;
   // }
  //},
  // async getExportAxiStatus({ dispatch }, payload) {
  //   const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/1`;

  //   const token = window.localStorage.getItem("access_token");
  //   const method = "get";
  //   const headers = {
  //     Accept: "application/vnd.api+json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const params = {
  //     // paginate: false,
  //   };
  //   const config = {
  //     url,
  //     method,
  //     headers,
  //     params,
  //   };
  //   try {
  //     const response = await axios(config);

  //     return response.data;
  //   } catch (e) {
  //     return e;
  //   }
  // },
  // async getExportAxiFile({ dispatch }, payload) {
  //   const url = `${process.env.VUE_APP_URL_COMPOSER_API}export-axi-status/1`;

  //   const token = window.localStorage.getItem("access_token");
  //   const method = "get";
  //   const headers = {
  //     Accept: "application/vnd.api+json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   const params = {
  //     // paginate: false,
  //   };
  //   const config = {
  //     url,
  //     method,
  //     headers,
  //     params,
  //   };
  //   try {
  //     const response = await axios(config);
  //     window.open(response.data.data.attributes.file, "_self");

  //     return response.data;
  //   } catch (e) {
  //     return e;
  //   }
  // },

  // async getTransaksiReport({ dispatch }, payload) {
   
  //   try {
  //     window.open(`${process.env.VUE_APP_URL_COMPOSER_API}export/transactionreport?from=${payload.from}&to=${payload.to}`);
  //     return "OK";
  //   } catch (error) {
  //     return e;
  //   }
  // },

  async getJenisAXI({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}axi/tipe`;

    // const token = window.localStorage.getItem("access_token");
    const method = "get";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    // };
    const params = {
      // paginate: false,
    };
    const config = {
      url,
      method
      //   headers,
      //   params,
    };
    try {
      const response = await axios(config);
      commit("setJenisAXI", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async postResetPoint({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_BR_API}point/reset`;

    const token = window.localStorage.getItem("access_token");
    const method = "post";
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
      headers
      //   params,
    };
    try {
      const response = await axios(config);
      // commit("setJenisAXI", response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async postResetInsentif({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_BR_API}point/resetInsentif`;

    const token = window.localStorage.getItem("access_token");
    const method = "post";
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
      headers
      //   params,
    };
    try {
      const response = await axios(config);
      // commit("setJenisAXI", response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  },

  async downloadTemplateMatrixAxi({ dispatch }, payload) { 
    try {
      window.open(`${process.env.VUE_APP_URL_PROFILE_API}axi/download-Matrix-Axi-Template`);
      return "OK";
    } catch (error) {
      return e;
    }
  },

  async getJenisKelamin({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}axi/jk`;
    const method = "get";
    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      commit("setJenisKelamin", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getAgama({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}agama`;
    const method = "get";
    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      commit("setAgama", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getStatusPernikahan({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}axi/status`;
    const method = "get";
    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      commit("setStatusPernikahan", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getLegalForm({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}legalForm`;
    const method = "get";
    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      commit("setLegalForm", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async postImportFileUsers({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_ORDER_IN_API}import/dataUser`;
    const method = "POST";

    let formData = new FormData();
    formData.set("file", payload.file);
    formData.set("message_title", payload.messageTitle);
    formData.set("message_body", payload.messageBody);

    const config = {
      url,
      method,
      data: formData
    };

    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },

  async getListTemplateID({ commit }, payload = "") {
		const url = `${process.env.VUE_APP_URL_COMPOSER_API}transaction-params`;
		const token = window.localStorage.getItem('access_token')
		const method = 'get'
		const headers = {
			"Accept": "application/vnd.api+json",
			'Authorization': `Bearer ${token}`
		}
		const params = {
			"filter[key_param]": "email.blast.reminder.notifikasi",
		}
		const config = {
			url,
			method,
			headers,
			params,
		}
		try {
			const response = await axios(config)
			commit('setTemplateId', response.data.data)

			return response.data;
  
		} catch (e) {
			return e
		}
	},

  async postImportFileEmail({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}manual-notification/blastemailaxi`;
    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("file", payload.file);
    formData.set("templateId", payload.jenisEmail);

    const config = {
      url,
      method,
      headers,
      data: formData
    };

    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },

  async compressKTPToCloudinary({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}upload-cloudinary`;
     const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("file", payload.file);
    formData.set("foto", payload.foto);

    const config = {
      url,
      method,
      headers,
      data: formData
    };

    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },

  async compressNPWPToCloudinary({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}upload-cloudinary`;
    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("file", payload.file);
    formData.set("foto", payload.foto);

    const config = {
      url,
      method,
      headers,
      data: formData
    };

    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  },

  async compressRekeningToCloudinary({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_COMPOSER_API}upload-cloudinary`;
    const token = window.localStorage.getItem("access_token");
    const method = "POST";
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };

    let formData = new FormData();
    formData.set("file", payload.file);
    formData.set("foto", payload.foto);

    const config = {
      url,
      method,
      headers,
      data: formData
    };

    try {
      const response = await axios(config);
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }  

};

export default actions;
