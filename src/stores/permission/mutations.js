const mutations = {
	setUsers(state, value) {
		state.users = value
	},
	setGroups(state, value) {
		state.groups = value
	},
	setPermissions(state, value) {
		state.permissions = value
	},
	setIncluded(state, value) {
		state.included = value
	},
}

export default mutations
