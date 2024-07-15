const getters = {
  channelList: state => state.channelList,
  programList: state => state.programList,
  resCreateUserProgram: state => state.resCreateUserProgram,
  details: state => state.details,
  update: state => state.update,
  newUser: state => state.newUser,
  refreshToken: state => state.refreshToken,
  deleteToken: state => state.deleteToken,
  flagValidation: state => state.flagValidation,
  emailValidation: state => state.emailValidation,
  checkChannelId: state => state.checkChannelId,
  checkChannelCode: state => state.checkChannelCode,
}

export default getters;