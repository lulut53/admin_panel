import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  contentList: [],
  newContent: [],
  update: [],
  typeListExist: [],
  typeListAll: []
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
