import { v4 as uuidv4 } from 'uuid'
import Users from '@app/api/users/route'
import Posts from '@app/api/posts/route'

const dbUrl = process.env.JSON_SERVER_URL
const commentsUrl = `${dbUrl}/comments`

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
			content,
			userId,
			postId
		}

		return await fetchReq(commentsUrl, setOptions('POST', newComment))
	},

	getAll: async () => await fetchReq(commentsUrl, setOptions('GET')),

	getOne: async (id) => {
		await Comments.initialize()

		return await fetchReq(`${commentsUrl}/${id}`, setOptions('GET'))
	},

	getUser: async (id) => {
		await Users.initialize()

		return await fetchReq(`${commentsUrl}?userId=${id}`, setOptions('GET'))
	},

	getPost: async (id) => {
		await Posts.initialize()

		return await fetchReq(`${commentsUrl}?postId=${id}`, setOptions('GET'))
	},

	edit: async (id, content) => {
		return await fetchReq(
			`${commentsUrl}/${id}`,
			setOptions('PATCH', { content })
		)
	},

	delete: async (id) =>
		await fetchReq(`${commentsUrl}/${id}`, setOptions('DELETE')),

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
		userId: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].userId,
		postId: () =>
			Comments.commentData[
				Math.floor(Math.random() * Comments.commentData.length)
			].postId
	}
}

export default Comments
