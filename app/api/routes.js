const dataUrl = process.env.JSON_SERVER_URL

async function addUser(user) {
	const res = await fetch(`${dataUrl}/users`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user),
		cache: 'no-cache'
	})

	return res.json()
}

async function getUsers() {
	const res = await fetch(`${dataUrl}/users?_sort=username`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	return res.json()
}

async function getUserById(id) {
	const res = await fetch(`${dataUrl}/users/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	return res.json()
}

async function getUserByEmail(email) {
	const res = await fetch(`${dataUrl}/users?email=${email}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	return res.json()
}

async function getPosts() {
	const postsRes = await fetch(`${dataUrl}/posts?_sort=date&_order=desc`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	const posts = await postsRes.json()

	const userPosts = await Promise.all(
		posts.map(async (post) => {
			const userRes = await fetch(`${dataUrl}/users/${post.userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				cache: 'no-cache'
			})

			const user = await userRes.json()

			return {
				...post,
				user
			}
		})
	)

	return userPosts
}

async function getPostById(id) {
	const postRes = await fetch(`${dataUrl}/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	const post = await postRes.json()

	const userRes = await fetch(`${dataUrl}/users/${post.userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})

	const user = await userRes.json()

	const userPost = {
		...post,
		user
	}

	return userPost
}

async function addPost(post) {
	const res = await fetch(`${dataUrl}/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(post),
		cache: 'no-cache'
	})

	return res.json()
}

// async function editPost(id, post) {
// 	const res = await fetch(`${dataUrl}/posts/${id}`, {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(post),
// 		cache: 'no-cache'
// 	})
// 	return res.json()
// }

async function deletePost(id) {
	const res = await fetch(`${dataUrl}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'no-cache'
	})
	return
}

export {
	addUser,
	getUsers,
	getUserById,
	getUserByEmail,
	getPosts,
	getPostById,
	addPost,
	deletePost
}
