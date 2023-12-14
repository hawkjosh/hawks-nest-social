import {
	randBetweenDate,
	randPhrase,
	randQuote,
	randUser,
	randUuid,
} from '@ngneat/falso'

// const dataUrl = 'http://localhost:4000'
const dataUrl = process.env.JSON_SERVER_URL || 'http://localhost:4000'

const setOptions = (method, body) => {
	return {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body) || null,
		cache: 'no-cache',
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

	add: async () => {
		const newUser = {
			id: randUuid(),
			username: randUser().username,
			email: randUser().email,
		}

		return await fetchReq(`${dataUrl}/users`, setOptions('POST', newUser))
	},

	getAll: async () => await fetchReq(`${dataUrl}/users`, setOptions('GET')),

	getOne: async (query = 'id') => {
		await Users.initialize()

		const setQuery = () => {
			return query === 'username'
				? Users.getRandom.username()
				: query === 'email'
				? Users.getRandom.email()
				: Users.getRandom.id()
		}

		return await fetchReq(
			`${dataUrl}/users?${query}=${setQuery()}`,
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
			Users.userData[Math.floor(Math.random() * Users.userData.length)].email,
	},
}

const Posts = {
	postData: null,

	initialize: async () => {
		const posts = await Posts.getAll()
		Posts.postData = posts
	},

	add: async () => {
		await Users.initialize()

		const newPost = {
			id: randUuid(),
			date: randBetweenDate({
				from: new Date('12/01/2023').toISOString(),
				to: new Date().toISOString(),
			}),
			content: randQuote(),
			userId: Users.getRandom.id(),
		}

		return await fetchReq(`${dataUrl}/posts`, setOptions('POST', newPost))
	},

	getAll: async () => await fetchReq(`${dataUrl}/posts`, setOptions('GET')),

	getOne: async () => {
		await Posts.initialize()

		return await fetchReq(
			`${dataUrl}/posts/${Posts.getRandom.id()}`,
			setOptions('GET')
		)
	},

	getUser: async () => {
		await Users.initialize()

		return await fetchReq(
			`${dataUrl}/posts?userId=${Users.getRandom.id()}`,
			setOptions('GET')
		)
	},

	getRandom: {
		id: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].id,
		date: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].date,
		content: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].content,
		userId: () =>
			Posts.postData[Math.floor(Math.random() * Posts.postData.length)].userId,
	},
}

const Comments = {
	commentData: null,

	initialize: async () => {
		const comments = await Comments.getAll()
		Comments.commentData = comments
	},

	add: async () => {
		await Users.initialize()
		await Posts.initialize()

		const newComment = {
			id: randUuid(),
			date: new Date().toISOString(),
			content: randPhrase(),
			userId: Users.getRandom.id(),
			postId: Posts.getRandom.id(),
		}

		return await fetchReq(`${dataUrl}/comments`, setOptions('POST', newComment))
	},

	getAll: async () => await fetchReq(`${dataUrl}/comments`, setOptions('GET')),

	getOne: async () => {
		await Comments.initialize()

		return await fetchReq(
			`${dataUrl}/comments/${Comments.getRandom.id()}`,
			setOptions('GET')
		)
	},

	getUser: async () => {
		await Users.initialize()

		return await fetchReq(
			`${dataUrl}/comments?userId=${Users.getRandom.id()}`,
			setOptions('GET')
		)
	},

	getPost: async () => {
		await Posts.initialize()

		return await fetchReq(
			`${dataUrl}/comments?postId=${Posts.getRandom.id()}`,
			setOptions('GET')
		)
	},

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
			].userId,
	},
}

// Users.add()
// Users.getAll()
// Users.getOne() // query: 'id', 'username', 'email'

// Posts.add()
// Posts.getAll()
// Posts.getOne()
// Posts.getUser()

// Comments.add()
// Comments.getAll()
// Comments.getOne()
// Comments.getUser()
// Comments.getPost()

// const test = await Users.add()
// console.log(test)