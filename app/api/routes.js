import { v4 as uuidv4 } from 'uuid'

const dbUrl = process.env.DATABASE_URL

const setOptions = (method, body) => {
	return {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body) || null,
		cache: 'no-cache'
	}
}

const fetchReq = async (url, options) => {
	const response = await fetch(url, options)
	return response.json()
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
			username: username,
			email: email
		}

		return await fetchReq(`${dbUrl}/users`, setOptions('POST', newUser))
	},

	getAll: async () => await fetchReq(`${dbUrl}/users`, setOptions('GET')),

	getOne: async (query, userParam) => {
		await Users.initialize()

		return await fetchReq(
			`${dbUrl}/users?${query}=${userParam}`,
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

const Posts = {
	postData: null,

	initialize: async () => {
		const posts = await Posts.getAll()
		Posts.postData = posts
	},

	add: async (content, userId) => {
		await Users.initialize()

		const newPost = {
			id: uuidv4(),
			date: new Date().toISOString(),
			content: content,
			userId: userId
		}

		return await fetchReq(`${dbUrl}/posts`, setOptions('POST', newPost))
	},

	getAll: async () =>
		await fetchReq(
			`${dbUrl}/posts?_sort=date&_order=desc`,
			setOptions('GET')
		),

	getOne: async (postId) => {
		await Posts.initialize()

		return await fetchReq(`${dbUrl}/posts/${postId}`, setOptions('GET'))
	},

	getUser: async (userId) => {
		await Users.initialize()

		return await fetchReq(
			`${dbUrl}/posts?userId=${userId}`,
			setOptions('GET')
		)
	},

	edit: async (postId, content) => {
		return await fetchReq(
			`${dbUrl}/posts/${postId}`,
			setOptions('PATCH', { content: content })
		)
	},

	delete: async (postId) =>
		await fetchReq(`${dbUrl}/posts/${postId}`, setOptions('DELETE')),

	getRandom: {
		id: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].id,
		date: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].date,
		content: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].content,
		userId: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].userId
	}
}

const Comments = {
	commentData: null,

	initialize: async () => {
		const comments = await Comments.getAll()
		Comments.commentData = comments
	},

	add: async (content, userId, postId) => {
		await Users.initialize()
		await Posts.initialize()

		const newComment = {
			id: uuidv4(),
			date: new Date().toISOString(),
			content: content,
			userId: userId,
			postId: postId
		}

		return await fetchReq(`${dbUrl}/comments`, setOptions('POST', newComment))
	},

	getAll: async () => await fetchReq(`${dbUrl}/comments`, setOptions('GET')),

	getOne: async (commentId) => {
		await Comments.initialize()

		return await fetchReq(`${dbUrl}/comments/${commentId}`, setOptions('GET'))
	},

	getUser: async (userId) => {
		await Users.initialize()

		return await fetchReq(
			`${dbUrl}/comments?userId=${userId}`,
			setOptions('GET')
		)
	},

	getPost: async (postId) => {
		await Posts.initialize()

		return await fetchReq(
			`${dbUrl}/comments?postId=${postId}`,
			setOptions('GET')
		)
	},

	edit: async (commentId, content) => {
		return await fetchReq(
			`${dbUrl}/comments/${commentId}`,
			setOptions('PATCH', { content: content })
		)
	},

	delete: async (commentId) =>
	await fetchReq(`${dbUrl}/comments/${commentId}`, setOptions('DELETE')),

	getRandom: {
		id: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].id,
		date: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].date,
		content: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].content,
		postId: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].postId,
		userId: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].userId
	}
}

export { Users, Posts, Comments }
