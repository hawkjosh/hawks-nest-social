import Link from 'next/link'
import dayjs from 'dayjs'

export default async function SingleUser({ params }) {
	const { id } = params

	const user = await fetch(`http://localhost:3000/api/users/${id}`, {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())

	const { id: userId, username, email: userEmail } = user

	const posts = await fetch(`http://localhost:3000/api/posts`, {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())

	const userPosts = posts.filter((post) => post.userId === userId)

	const comments = await fetch(`http://localhost:3000/api/comments`, {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())

	const userComments = comments.filter((comment) => comment.userId === userId)

	return (
		<div>
			<div>{username}</div>
			<div>{userEmail}</div>
			<div>{userId}</div>
			<div className='my-3'>Posts (Total: {userPosts.length})</div>
			<div className="flex flex-col gap-4 mb-4">
				{userPosts.map((post) => (
					<Link
						key={post.id}
						href={`/posts/${post.id}`}
						className="flex flex-col gap-2"
					>
						<div>{post.content}</div>
						<div>{dayjs(post.date).format('ddd, M/D/YY @ h:mm A')}</div>
						<div>{post.id}</div>
					</Link>
				))}
			</div>
			<div className='my-3'>Comments (Total: {userComments.length})</div>
			<div className="flex flex-col gap-4 mb-4">
				{userComments.map((comment) => (
					<Link
						key={comment.id}
						href={`/comments/${comment.id}`}
						className="flex flex-col gap-2"
					>
						<div>{comment.content}</div>
						<div>{dayjs(comment.date).format('ddd, M/D/YY @ h:mm A')}</div>
						<div>{comment.id}</div>
					</Link>
				))}
			</div>
			<Link href="/users">Back to all users</Link>
		</div>
	)
}
