const mutations = {
	setUser(state, value) {
		state.user = value
	},
	setInternals(state, value) {
		state.internals = value
	},
	setGroups(state, value) {
		state.groups = value
	},
	setGroupUser(state, value) {
		state.group_user = value
	},
	setProfile(state, value) {
		state.profile = value
	},
	setIncluded(state, value) {
		state.included = value
	},
}

export default mutations
