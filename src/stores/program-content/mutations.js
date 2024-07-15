const mutations = {
  setContentList(state, value) {
    state.contentList = value;
  },
  setUpdateDetails(state, value) {
    state.update = value;
  },
  setNewContent(state, value) {
    state.newContent = value;
  },
  setTypeListExist(state, value) {
    state.typeListExist = value;
  },
  setTypeListAll(state, value) {
    state.typeListAll = value;
  }
};

export default mutations;
