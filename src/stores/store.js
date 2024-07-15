/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import axi from "./axi";
import maxi from "./maxi";
import transaksi from "./transaksi";
import produk from "./produk";
import subproduk from "./subproduk";
import berita from "./berita";
import materiAxi from "./materi-axi";
import kategori from "./kategori";
import nasabah from "./nasabah";
import permission from "./permission";
import notifikasi from "./notifikasi";
import area from "./area";
import testimoni from "./testimoni";
import informaxi from "./informaxi";
import banner from "./banner";
import sap from "./sap";
import program from "./program";
import programContent from "./program-content";

Vue.use(Vuex);

const ip = window.location.host;
const protocol = window.location.protocol;

console.log(ip);
console.log(protocol);

const baseUrl = process.env.NODE_ENV === "development" ? "uatgw" : "prod";

export default new Vuex.Store({
  modules: {
    auth,
    axi,
    maxi,
    transaksi,
    produk,
    subproduk,
    berita,
    materiAxi,
    kategori,
    nasabah,
    permission,
    notifikasi,
    area,
    testimoni,
    informaxi,
    banner,
    sap,
    program,
    programContent
  },
  state: {
    //area_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/area",
    //simulation_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/simulation/api",
    //bo_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/branch-office",
    //br_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/reward/existing",
    //br_setting_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/reward",
    //order_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/tasya/orderList",
    //edit_order_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/tasya/editOrderList",
    //crh_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/listCrh",
    //manufacture_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/vehicles",
    //tipe_object_list_base_url:
    //  "https://" + baseUrl + ".dicicilaja.com/v3/simulation/api",
    //post_orderin_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/telecenterRequestTasya",
    //update_orderin_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/telecenter",

    area_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/area",
    simulation_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/simulation/api",
    bo_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/branch-office",
    br_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/reward/existing",
    br_setting_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/reward",
    order_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/tasya/orderList",
    edit_order_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/tasya/editOrderList",
    crh_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/listCrh",
    manufacture_list_base_url:
      "https://" + baseUrl + ".dicicilaja.com/v3/orderin/vehicles",
    tipe_object_list_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/simulation/api",
    post_orderin_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/orderin/telecenterRequestTasya",
    update_orderin_base_url:
      "https://" + baseUrl + ".dicicilaja.com/v3/orderin/telecenter",
    get_list_channel_url: "https://" + baseUrl + ".dicicilaja.com/v3/bffnew/channel",
    bff_base_url: "https://" + baseUrl + ".dicicilaja.com/v3/bffnew",

    token_update:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZDFneDktcXd6eGwtaDgxdy1pMDMzIl0sInNjb3BlIjpbIndyaXRlIl0sImF1dGhvcml0aWVzIjpbIlJPTEVfVEVMRUNFTlRFUiJdLCJqdGkiOiJiODcxM2E5Yy1iM2FjLTQ3ZDAtYjEyMC0zNjQ3ZWNmNTBiMWYiLCJjbGllbnRfaWQiOiJ0ZWxlY2VudGVyIn0.TyujtuRyrmSuOMhvzVDLgxmFHLOTahR5NhYFSRiq4hy-XdM4IzOcnDq_ZCVrBD-OGQFibC2aDgKRHjvUYuq3icqilEZf-Tk1aIy36Ug-7UlTs5ImqJ1UEElh98QKMxRCshW7PqYMNTYTSsRf6J2uIpXQFZTNaluJmD0Jw5jqFwtXSdnr4wsJfnKO13WDAiVbQSYGVWKbhXqSyZuPDawMxejNagyCno0bd_iQRnqpn5H4n1t3WcZxvejuFhYaexC6e5GQsI28vySKlN8TRjnCPX-wALskcjQBjfPw1Jxs56t713KTw_bBQ8RbSKRviV-DlsghAgra6wMI8GOVL77k7A",
    token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZDFneDktcXd6eGwtaDgxdy1pMDMzIl0sInNjb3BlIjpbIndyaXRlIl0sImF1dGhvcml0aWVzIjpbIlJPTEVfVEVMRUNFTlRFUiJdLCJqdGkiOiI3ZGQyNTIwNi1iM2E3LTQyYjYtODJlZi04OWMzYjM1N2E1YzkiLCJjbGllbnRfaWQiOiJ0ZWxlY2VudGVyIn0.Wv7dJF8t7tYDLd2RwU840h_un_RmkesHRcrzDLGqeg_yh5GAAn2bjIxh-aowfvFog34kCmA6TMH22Q3zD_KS57uW2d1YHmeCDMxuqwGS73eVaQJm5dSPQqHvtv9UwESX_tlRAfpj4HxDzAuvLx_3bsmns0n9kZ3Ewvoib0AAv3CHhmRTG6_PANUxipKzAwikYfiWXonf_GuA7S2FIEU2bYgiTx8TZ5bqfd4BdDl1L3VYPXJ6QTJNznxuszQN50S1GaAGMX0Sc5oEg4T69p9Q5ksXLId9hzjVgRLE3MXI5JPTe_n36dljEw_iI3CvOjcf7tcRwbBqSyLNcIu4kh0NRA",
    token_channel:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI0MDEzN2UxMTcyN2ZlNDE5NDk1OWI1MmMyYTdkY2QyYjg3ZjkyMTI0YWFmYmE2NjU2M2UxZDYwMWFjMmJkNDBjNWMxZWM1ZTM3NGFkNzE4In0.eyJhdWQiOiIyIiwianRpIjoiMjQwMTM3ZTExNzI3ZmU0MTk0OTU5YjUyYzJhN2RjZDJiODdmOTIxMjRhYWZiYTY2NTYzZTFkNjAxYWMyYmQ0MGM1YzFlYzVlMzc0YWQ3MTgiLCJpYXQiOjE2MTU5Njc5MzcsIm5iZiI6MTYxNTk2NzkzNywiZXhwIjoxNjQ3NTAzOTM2LCJzdWIiOiIxNzkzNTgiLCJzY29wZXMiOlsicHJvZHVrLnIiLCJwcm9kdWsubCIsIndoaXNsaXN0LmMiLCJ3aGlzbGlzdC5yIiwid2hpc2xpc3QudSIsIndoaXNsaXN0LmQiLCJzdWJwcm9kdWsuciIsInN1YnByb2R1ay5sIiwidGFnLnIiLCJ0YWcubCIsInByb2dyYW0uciIsInByb2dyYW0ubCIsIm1heGlfcHJvZHVrLnIiLCJtYXhpX3Byb2R1ay5sIiwicG9pbi5yIiwicG9pbi5sIiwic2VtZXN0ZXIuciIsInNlbWVzdGVyLmwiLCJyZXdhcmRfa2F0ZWdvcmkuciIsInJld2FyZF9rYXRlZ29yaS5sIiwicHJvZHVrX2thdGFsb2cuciIsInByb2R1a19rYXRhbG9nLmwiLCJjbGFpbV9yZXdhcmQuYyIsImNsYWltX3Jld2FyZC5yIiwiY2xhaW1fcmV3YXJkLmwiLCJjbGFpbV9yZXdhcmQudSIsImNsYWltX3Jld2FyZC5kIiwicmV3YXJkX3Rlc3RpbW9uaS5yIiwicmV3YXJkX3Rlc3RpbW9uaS5sIiwicmV3YXJkX3N0YXR1cy5yIiwicmV3YXJkX3N0YXR1cy5sIiwiY2FiYW5nLnIiLCJjYWJhbmcubCIsInByb3ZpbnNpLnIiLCJwcm92aW5zaS5sIiwia290YS5yIiwia290YS5sIiwiZGlzdHJpay5yIiwiZGlzdHJpay5sIiwiZGVzYS5yIiwiZGVzYS5sIiwiem9uYV9hcmVhLnIiLCJ6b25hX2FyZWEubCIsImFyZWEuciIsImFyZWEubCIsIndpbGF5YWguciIsIndpbGF5YWgubCIsImtvbnRlbl9rYXRlZ29yaS5yIiwia29udGVuX2thdGVnb3JpLmwiLCJwYWdlcy5yIiwicGFnZXMubCIsIm5ld3MuciIsIm5ld3MubCIsInBhZ2VfaW1nLnIiLCJwYWdlX2ltZy5sIiwia29udGVuX3Rlc3RpbW9uaS5yIiwia29udGVuX3Rlc3RpbW9uaS5sIiwia29udGVuX3N0YXR1cy5yIiwia29udGVuX3N0YXR1cy5sIiwiZG93bmxvYWQuciIsImRvd25sb2FkLmwiLCJqYW1pbmFuLmMiLCJqYW1pbmFuLnIiLCJqYW1pbmFuLmwiLCJqYW1pbmFuLnUiLCJqYW1pbmFuLmQiLCJ0cmFuc2Frc2kuYyIsInRyYW5zYWtzaS5yIiwidHJhbnNha3NpLmwiLCJ0cmFuc2Frc2kudSIsInRyYW5zYWtzaS5kIiwidHJhbnNha3NpX2RldGFpbC5jIiwidHJhbnNha3NpX2RldGFpbC5yIiwidHJhbnNha3NpX2RldGFpbC5sIiwidHJhbnNha3NpX2RldGFpbC51IiwidHJhbnNha3NpX2RldGFpbC5kIiwidm91Y2hlcl9jb2RlLnIiLCJ2b3VjaGVyX2NvZGUubCIsImdydXBfaXppbi5yIiwiZ3J1cF9pemluLmwiLCJncnVwLnIiLCJncnVwLmwiLCJpemluLnIiLCJpemluLmwiLCJncnVwX3VzZXIuciIsImdydXBfdXNlci5sIiwidXNlci5yIiwidXNlci5sIiwicG9wdXAuciIsInBvcHVwLmwiLCJldmVudC5yIiwiZXZlbnQubCIsImFsYW1hdC5jIiwiYWxhbWF0LnIiLCJhbGFtYXQubCIsImFsYW1hdC51IiwiYWxhbWF0LmQiLCJwcm9maWxlLmMiLCJwcm9maWxlLnIiLCJwcm9maWxlLmwiLCJwcm9maWxlLnUiLCJwcm9maWxlLmQiLCJyZWtlbmluZy5jIiwicmVrZW5pbmcuciIsInJla2VuaW5nLmwiLCJyZWtlbmluZy51IiwicmVrZW5pbmcuZCIsImJhbmsuYyIsImJhbmsuciIsImJhbmsubCIsImJhbmsudSIsImJhbmsuZCIsImRldGFpbF9heGkuYyIsImRldGFpbF9heGkuciIsImRldGFpbF9heGkubCIsImRldGFpbF9heGkudSIsIm5wd3AuYyIsIm5wd3AuciIsIm5wd3AubCIsIm5wd3AudSIsInBhcnRuZXJfbWF4aS5yIiwia29udGVuX3Rlc3RpbW9uaS5jIiwia29udGVuX3Rlc3RpbW9uaS51IiwicGFydG5lcl9tYXhpLmwiXSwiaWRzIjp7InByb2ZpbGVfaWQiOjE3OTUxMiwiZGV0YWlsX2F4aV9pZCI6MTE5NDc5LCJwYXJ0bmVyX21heGlfaWQiOm51bGx9fQ.W_dc3m_MSTSJqVIyX1ZH-sfQu2q8J1FKczu3wIqfhR6VjaBThwDIVs5Jut-6Qn81eMqElYstvCDVdzlXDj6na1IHJSO9TkbzVJNKHl84VhooSteesMcWA1Kt39jylTvE6tiZ3bZ7jB2quv9-h4rjc_po4m4-IgtJz_UzrwwIeuMM6r6dR24ee2tNI3m6Nbjp0OfeYwn6BIlcZDHe0QgPzuryGcmLMFAAfBO1xJ1Oznmf9AcFOK9ukd3y1LResXddztYa4KcR2kMt8hqgi8AXI8EIs0saAlbX1YQ_z9wqiI_GA3LrIi2tqLFi6z9ui88nEw8Sy0feH5MYUwMpEG4sd83Dek9VOEhg6TC10I0Sdlj7Uy6jdWG67EOfG9IHWpbLM63bCkRuVbiDH46D52SdmuDe6y76GXO9K273Tz326B_bXq7_zeHmjbQVFgzz1kJUG8OQbktgR-WQYDheYJVPbFFV1IxedbFWP-lxPbE7_Woit7OgBeJqBmS7PDFfT-Sy2US14vcNXqlpYssYVACuLiyeNz46Gl-flzL6_FumqP8yi2uliXkN8XyfN3I2gNGDFliqEChbKkAw81nTuHJh-qDMFCSXwKD16IhAvgatpqgjXf75mEGXBr2E4eJuwlJHCygPuLc09SoENocdMuYtjJEfwU2OLkbHWXF3Hg3R8r8"
  },
  mutations: {},
  getters: {},
  actions: {}
});
