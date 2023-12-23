import { v4 as uuidv4 } from 'uuid'
import Users from '@app/api/users/route'

const dbUrl = process.env.JSON_SERVER_URL
const postsUrl = `${dbUrl}/posts`

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
			content,
			userId
		}

		return await fetchReq(postsUrl, setOptions('POST', newPost))
	},

	getAll: async () =>
		await fetchReq(`${postsUrl}?_sort=date&_order=desc`, setOptions('GET')),

	getOne: async (id) => {
		await Posts.initialize()

		return await fetchReq(`${postsUrl}/${id}`, setOptions('GET'))
	},

	getUser: async (id) => {
		await Users.initialize()

		return await fetchReq(`${postsUrl}?userId=${id}`, setOptions('GET'))
	},

	edit: async (id, content) => {
		return await fetchReq(`${postsUrl}/${id}`, setOptions('PATCH', { content }))
	},

	delete: async (id) =>
		await fetchReq(`${postsUrl}/${id}`, setOptions('DELETE')),

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

export default Posts
