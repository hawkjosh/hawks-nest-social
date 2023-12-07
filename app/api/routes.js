const dataUrl = 'http://localhost:4000/posts'

async function getPosts() {
	const res = await fetch(`${dataUrl}?_sort=date&_order=desc`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})
	return res.json()
}

async function deletePost(id) {
	const res = await fetch(`${dataUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-cache',
	})
	return
}

async function addPost(post) {
  const res = await fetch(`${dataUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    cache: 'no-cache',
  })
  return res.json()
}

export { getPosts, deletePost, addPost }
