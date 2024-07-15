import axios from "axios";

const token = process.env.VUE_APP_TOKEN_UPDATE;

const actions = {
  async getAreas({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}area`;

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
      commit("setAreas", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getAreasById({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}area/${payload}`;

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
      commit("setAreasById", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getCabangById({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}cabang/${payload}`;

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
      // console.log(response.data);

      commit("setCabangById", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getCabang({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}cabang/sap`;

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
      commit("setCabang", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getCabangByAreaId({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}area/${payload}/cabang`;

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
      commit("setCabang", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getProvinsi({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}provinsi`;

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
      commit("setProvinsis", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getProvinsibyId({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}provinsi/${payload}`;

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
      commit("setProvinsiId", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKota({ commit }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }provinsi/${payload}/kabupaten`;

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
      commit("setKotas", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKotabyId({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}kabupaten/${payload}`;

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
      commit("setKotaId", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKecamatan({ commit }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }kabupaten/${payload}/kecamatan`;

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
      commit("setKecamatans", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKecamatanbyId({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}kecamatan/${payload}`;

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
      commit("setKecamatanId", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKelurahan({ commit }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }kecamatan/${payload}/kelurahan`;

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
      commit("setDesas", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getKelurahanbyId({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}kelurahan/${payload}`;

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
      commit("setDesaId", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
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
  async fetchBankDanamon({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}check/BDI/Acc`;
    const method = "POST";
    const headers = { Authorization: `Bearer ${token}` };
    const body = {
      header: {
        requestId: "ERP-20204093173022707900008",
        requestTimestamp: "2020-04-09 14:37:05",
        userId: "",
        userType: "",
        branch: "",
        costGrp: "ERP",
        appNo: "ERP-01134547718875",
        channelId: "DICICILAJA",
        callbackUrl: "",
        props: {}
      },
      data: {
        userReferenceNumber: "1200123456784321",
        requestTime: payload.requestTime,
        accountNumber: payload.accountNumber
      }
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };
    try {
      const response = await axios(config);
      commit("setResDanamon", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async fetchBankBCA({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}check/BCA/Acc`;
    const method = "POST";
    const headers = { Authorization: `Bearer ${token}` };
    const body = {
      header: {
        requestId: "SAP-20194113173022707900008",
        requestTimestamp: "2019-04-11 14:37:05",
        userId: "",
        userType: "",
        branch: "",
        costGrp: "SAP",
        appNo: "SAP-01134547718875",
        channelId: "DICICILAJA",
        callbackUrl: "",
        props: {}
      },
      data: {
        accountNumber: payload.accountNumber,
        accountName: payload.accountName
      }
    };
    const config = {
      url,
      method,
      headers,
      data: body
    };
    try {
      const response = await axios(config);
      commit("setResBCA", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async updateDataDetail({ commit }, { payload, profileId }) {
    // const url = `http://localhost:8080/v2/rgstrnsvc/axiReg/update/${profileId}`;
    const url = `${process.env.VUE_APP_URL_SAP_API}axiReg/update/${profileId}`;
    const method = "POST";
    const headers = {
      // "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${token}`
    };
    const body = payload;
    let formData = new FormData();
    // console.log(payload);

    Object.keys(payload).forEach(function(key) {
      if (
        key != "foto_ktp" &&
        key != "foto_rekening" &&
        key != "foto_npwp" &&
        key != "foto_selfie" &&
        key != "profile_id" &&
        key != "jenis_badan" &&
        key != "jalan" &&
        key != "cabang_id" &&
        key != "desa_id" &&
        key != "nama_ibu_kandung" &&
        key != "nama_bank" &&
        key != "alasan_registrasi" &&
        key != "status_verifikasi_data" &&
        key != "alasan_verifikasi_data"
      ) {
        if (payload[key] == null || payload[key] == "" || payload[key] == "-") {
          formData.set(key, "");
        } else {
          formData.set(key, payload[key]);
        }
      }
    });
    if (payload.foto_ktp && typeof payload.foto_ktp == "object")
      formData.set("foto_ktp", payload.foto_ktp);
    if (payload.foto_rekening && typeof payload.foto_rekening == "object")
      formData.set("foto_rekening", payload.foto_rekening);
    if (payload.foto_npwp && typeof payload.foto_npwp == "object")
      formData.set("foto_npwp", payload.foto_npwp);
    if (payload.foto_selfie && typeof payload.foto_npwp == "object")
      formData.set("foto_selfie", payload.foto_selfie);
    // Object.keys(payload).forEach(key => {
    //   formData.append(key, payload[key]);
    // });
    // formData.set("_method", "PATCH");
    // console.log(formData);
    const config = {
      url,
      method,
      data: formData,
      headers
    };
    try {
      const response = await axios(config);
      // console.log(response);

      commit("setResUpdateData", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getCrhName({ commit }, payload) {
    // console.log(payload);

    const url = `${process.env.VUE_APP_URL_API_HOST}orderin/listCrh/${payload}`;
    const method = "GET";
    // const headers = {
    // "Content-Type": "application/vnd.api+json",
    // Authorization: `Bearer ${token}`
    // };
    // const body = payload;
    const config = {
      url,
      method
      // headers,
      // data: body
    };
    try {
      const response = await axios(config);
      // console.log(response);

      commit("setCrhName", response.data);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getApproveList({ commit }, payload = {}) {
    // console.log(payload);

    const url = `${process.env.VUE_APP_URL_SAP_API}list/axiApprove`;
    const method = "get";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    // };
    // console.log(payload);
    const params = {
      pageNo: payload.pageNumber,
      pageSize: payload.pageSize,
      filter:
        payload.filterByService != undefined &&
        payload.filterByService != "" &&
        payload.searchColumn.column == "nama"
          ? "nama_integrasi"
          : payload.searchColumn.column,
      filterValue:
        payload.filterByService != undefined &&
        payload.filterByService != "" &&
        payload.searchColumn.column == "nama"
          ? `${payload.searchColumn.searchData},${payload.filterByService}`
          : payload.searchColumn.column == "integrasi"
          ? `${payload.filterByService}`
          : `${payload.searchColumn.searchData}`
    };
    const paramsAll = {
      pageNo: payload.pageNumber,
      pageSize: payload.pageSize
    };
    // console.log(payload.searchColumn.column);
    const config = {
      url,
      method,
      // headers,
      params:
        payload.searchColumn.column !== "" &&
        payload.searchColumn.column !== "all"
          ? params
          : paramsAll
    };
    try {
      const response = await axios(config);
      const data = response.data;
      // console.log(data);
      commit("setApproveList", data.data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async getInboundSAP({ commit }, profileId) {
    // console.log(profileId);

    const url = `${process.env.VUE_APP_URL_SAP_API}sap/inbound/${profileId}`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${token}`
      // "Access-Control-Allow-Origin": "http://localhost:8080",
      // "Access-Control-Allow-Methods": "GET, POST, PUT",
      // "Access-Control-Allow-Headers": "Content-Type"
    };
    // const params = {
    //   "pageNo":payload.pageNumber,
    //   "pageSize":payload.pageSize,
    //   "filter":payload.searchColumn.column,
    //   "filterValue":payload.searchColumn.searchData
    // };
    const config = {
      url,
      method,
      headers
      // params,
    };
    try {
      const response = await axios(config);
      const data = response;
      // console.log(data);
      // commit("setApproveList", data.data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async postCallbackSAP({ commit }, payload) {
    // console.log(profileId);

    const url = `${process.env.VUE_APP_URL_SAP_API}sap/callback`;
    const method = "POST";
    const headers = {
      "Content-Type": "application/json"
      // Authorization: `Bearer ${token}`
      // "Access-Control-Allow-Origin": "http://localhost:8080",
      // "Access-Control-Allow-Methods": "GET, POST, PUT",
      // "Access-Control-Allow-Headers": "Content-Type"
    };
    const body = payload;
    // const params = {
    //   "pageNo":payload.pageNumber,
    //   "pageSize":payload.pageSize,
    //   "filter":payload.searchColumn.column,
    //   "filterValue":payload.searchColumn.searchData
    // };
    const config = {
      url,
      method,
      headers,
      data: body
      // params,
    };
    try {
      const response = await axios(config);
      const data = response;
      // console.log(data);
      // commit("setApproveList", data.data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e;
    }
  },
  async fetchCheckKtp({ commit }, payload) {
    // console.log(payload);
    // console.log(profileId);

    const url = `${process.env.VUE_APP_URL_SAP_API}epks/validasiktp/${
      payload.no_ktp
    }`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${token}`
      // "Access-Control-Allow-Origin": "http://localhost:8080",
      // "Access-Control-Allow-Methods": "GET, POST, PUT",
      // "Access-Control-Allow-Headers": "Content-Type"
    };
    const params = {
      profile_id: payload.profile_id
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
      // commit("setApproveList", data.data);

      return data;
    } catch (e) {
      // console.log(e.response);
      return e.response;
    }
  },
  async fetchCheckKtpPasangan({ commit }, payload) {
   // console.log(payload);
   // console.log(profileId); 

    const url = `${process.env.VUE_APP_URL_SAP_API}epks/validasiktpPasangan/${
      payload.no_ktp_pasangan
    }`;
    const method = "GET";
    const headers = {
      Authorization: `Bearer ${token}`
      // "Access-Control-Allow-Origin": "http://localhost:8080",
      // "Access-Control-Allow-Methods": "GET, POST, PUT",
      // "Access-Control-Allow-Headers": "Content-Type"
    };
    const params = {
      profile_id: payload.profile_id
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
      // commit("setApproveList", data.data);

      return data;
    } catch (e) {
      // console.log(e.response);
      return e.response;
    }
  },
  async getListVerifikasiDataAXI({ commit }, payload = {}) {
    // console.log(payload);

    const url = `${process.env.VUE_APP_URL_SAP_API}list/verifikasiData`;
    const method = "get";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    // };
    // console.log(payload);
    const params = {
      pageNo: payload.pageNo,
      pageSize: payload.pageSize,
      filter: payload.filter,
      filterValue: payload.filterValue
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
      commit("setListVerifikasiDataAXI", data.data);

      return data;
    } catch (e) {
      console.log(e.response);
      return e.response;
    }
  },
  async verifikasiDataAXI({ commit }, { payload, profileId }) {
    // const url = `http://localhost:8080/v2/rgstrnsvc/axiReg/update/${profileId}`;
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }epks/verifyData/${profileId}`;
    const method = "POST";
    // const headers = {
    //   "Content-Type": "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`
    // };
    // const body = payload;
    let formData = new FormData();
    // console.log(payload);

    Object.keys(payload).forEach(function(key) {
      if (key != "foto_ktp" && key != "foto_selfie") {
        if (payload[key] == null || payload[key] == "") {
          formData.set(key, "");
        } else {
          formData.set(key, payload[key]);
        }
      }
    });
    if (payload.foto_ktp) formData.set("foto_ktp", payload.foto_ktp);
    if (payload.foto_selfie) formData.set("foto_selfie", payload.foto_selfie);
    // Object.keys(payload).forEach(key => {
    //   formData.append(key, payload[key]);
    // });
    // formData.set("_method", "PATCH");
    // console.log(formData);
    const config = {
      url,
      method,
      data: formData
      // headers
    };
    try {
      const response = await axios(config);
      // console.log(response);

      // commit("setResUpdateData", response.data);
      return response.data;
    } catch (e) {
      return e;
    }
  },
  async importStatusAxi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}import/axiStatus/aktif`;

    // const token = window.localStorage.getItem("access_token");
    const method = "POST";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    let formData = new FormData();
    formData.set("file", payload);

    const config = {
      url,
      // body,
      method,
      data: formData
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async importStatusAxiExpired({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}import/axiStatus/expired`;

    // const token = window.localStorage.getItem("access_token");
    const method = "POST";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    let formData = new FormData();
    formData.set("file", payload);

    const config = {
      url,
      // body,
      method,
      data: formData
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async importStatusAxiNonActive({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}import/axiStatus/nonaktif`;

    // const token = window.localStorage.getItem("access_token");
    const method = "POST";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    let formData = new FormData();
    formData.set("file", payload);

    const config = {
      url,
      // body,
      method,
      data: formData
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async importReportPPD({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_ORDER_IN_API}import/dataTransaksi`;

    // const token = window.localStorage.getItem("access_token");
    const method = "POST";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    let formData = new FormData();
    formData.set("file", payload);

    const config = {
      url,
      // body,
      method,
      data: formData
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async importPointAxi({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}import/pointReward`;

    // const token = window.localStorage.getItem("access_token");
    const method = "POST";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    let formData = new FormData();
    formData.set("file", payload);

    const config = {
      url,
      // body,
      method,
      data: formData
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async downloadReportTransaksi({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_ORDER_IN_API}download/order/report`;

    // const token = window.localStorage.getItem("access_token");
    const method = "GET";
    // const headers = {
    //   Accept: "application/vnd.api+json",
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "multipart/form-data",
    // };

    // console.log(payload);
    const params = {
      filter: payload.subject,
      filterValue: payload.keyword,
      startDate: payload.date,
      endDate: payload.date2
    };

    const config = {
      url,
      params,
      // body,
      method
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getChannelList({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}list/channel`;

    // const token = window.localStorage.getItem("access_token");
    const method = "GET";

    const config = {
      url,
      // params,
      // body,
      method
      // headers,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (e) {
      return e;
    }
  },
  async getRegisterPerArea({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}chart-data/registrasi/area`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
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
  async getRegisterStatusAxi({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }chart-data/registrasi/statusAxi`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
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
  async getRegisterJenisAxi({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }chart-data/registrasi/jenisAxi`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
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
  async getRegisterjumlahRegisterAxi({ dispatch }, payload) {
    const url = `${
      process.env.VUE_APP_URL_SAP_API
    }chart-data/registrasi/jumlahRegisterAxi`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
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
  async postUploadToECM({ dispatch }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}ecm/file/upload/${
      payload.profileId
    }`;

    // const token = window.localStorage.getItem('access_token')
    const method = "post";
    const params = {
      crh_email: payload.crhEmail ? payload.crhEmail : ""
    };
    const config = {
      url,
      method,
      // headers,
      params
    };
    try {
      const response = await axios(config);
      // window.open(response.data.data.attributes.file, '_self');

      return response.data;
    } catch (e) {
      throw e;
    }
  },
  async getDataLastReportPPD() {
    const url = `${process.env.VUE_APP_URL_ORDER_IN_API}lastReportPPD`;

    // const token = window.localStorage.getItem('access_token')
    const method = "get";
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
      throw e;
    }
  },

  async getJenisKaryawan({ commit }, payload) {
    const url = `${process.env.VUE_APP_URL_SAP_API}jeniskaryawan`;
    const method = "get";
    const config = {
      url,
      method
    };
    try {
      const response = await axios(config);
      commit("setJenisKaryawan", response.data);
      return response;
    } catch (e) {
      return e;
    }
  }

};

export default actions;
