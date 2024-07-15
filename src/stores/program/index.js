import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  channelList: [],
  programList: [],
  resCreateUserProgram: [],
  details: [],
  update: [],
  newUser: [],
  refreshToken: [],
  deleteToken: [],
  flagValidation: [],
  emailValidation: [],
  checkChannelId: [],
  checkChannelCode: [],
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;