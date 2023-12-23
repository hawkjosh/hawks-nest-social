import { v4 as uuidv4 } from 'uuid'

const dbUrl = process.env.JSON_SERVER_URL
const usersUrl = `${dbUrl}/users`

const setOptions = (method, body) => {
	return {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body) || null,
		cache: 'no-cache'
	}
}

const fetchReq = async (url, options) => {
	const response = await fetch(url, options)
	return await response.json()
}

const Users = {
	userData: null,

	initialize: async () => {
		const users = await Users.getAll()
		Users.userData = users
	},

	add: async (username, email) => {
		const newUser = {
			id: uuidv4(),
			username,
			email
		}

		return await fetchReq(usersUrl, setOptions('POST', newUser))
	},

	getAll: async () => await fetchReq(usersUrl, setOptions('GET')),

	getOne: async (query, userParam) => {
		await Users.initialize()

		return await fetchReq(
			`${usersUrl}?${query}=${userParam}`,
			setOptions('GET')
		)
	},

	getRandom: {
		id: () =>
			Users.userData[Math.floor(Math.random() * Users.userData.length)].id,
		username: () =>
			Users.userData[Math.floor(Math.random() * Users.userData.length)]
				.username,
		email: () =>
			Users.userData[Math.floor(Math.random() * Users.userData.length)].email
	}
}

export default Users
