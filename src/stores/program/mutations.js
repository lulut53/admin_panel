const mutations = {
  setChannelList(state, value) {
    state.channelList = value;
  },
  setProgramList(state, value) {
    state.programList = value;
  },
  setResCreateUserProgram(state, value) {
    state.resCreateUserProgram = value;
  },
  setDetails(state, value) {
    state.details = value;
  },
  setUpdateDetails(state, value) {
    state.update = value;
  },
  setNewUser(state, value) {
    state.newUser = value;
  },
  setRefreshToken(state, value) {
    state.refreshToken = value;
  },
  setDeleteToken(state, value) {
    state.deleteToken = value;
  },
  setFlagValidation(state, value) {
    state.flagValidation = value;
  },
  setEmailValidation(state, value) {
    state.emailValidation = value;
  },
  setCheckChannelId(state, value) {
    state.checkChannelId = value;
  },
  setCheckChannelCode(state, value) {
    state.checkChannelCode = value;
  }
};

export default mutations;
