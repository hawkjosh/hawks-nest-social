import Link from 'next/link'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const getPost = async (id) => {
	const res = await fetch(`http://localhost:4000/posts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return await res.json()
}

const getUsers = async () => {
	const res = await fetch('http://localhost:4000/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return await res.json()
}

const getComments = async (id) => {
	const res = await fetch(`http://localhost:4000/comments?postId=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return await res.json()
}

const DetailItem = ({ label, value, type = 'post' }) => {
	return (
		<div
			className={`flex items-center gap-3 ${type === 'comment' && 'text-sm'}`}
		>
			<div className="font-semibold uppercase">{label}:</div>
			<div className={type === 'comment' ? 'text-orange-600' : 'text-blue-600'}>
				{value}
			</div>
		</div>
	)
}

export default async function SinglePost({ params }) {
	const postData = await getPost(params.id)
	const commentData = await getComments(params.id)
	const userData = await getUsers()

	const post = {
		...postData,
		postAuthor: userData.find((user) => user.id === postData.userId).username,
		postAuthorEmail: userData.find((user) => user.id === postData.userId).email
	}

	const comments = commentData.map((comment) => {
		return {
			...comment,
			commentAuthor: userData.find((user) => user.id === comment.userId)
				.username,
			commentAuthorEmail: userData.find((user) => user.id === comment.userId)
				.email
		}
	})

	return (
		<Card>
			<div className="flex flex-col w-3/4 gap-6 mx-auto">
				<div className="pb-6 text-2xl font-bold text-center underline">
					Post Details
				</div>
				<div className="flex flex-col gap-2">
					<DetailItem label="ID" value={post.id} />
					<DetailItem
						label="Date"
						value={dayjs(postData.date).format('ddd, M/D/YY @ h:mm A')}
					/>
					<DetailItem label="Content" value={post.content} />
					<DetailItem label="Author ID" value={post.userId} />
					<DetailItem label="Author Username" value={post.postAuthor} />
					<DetailItem label="Author Email" value={post.postAuthorEmail} />
				</div>
				<div className="flex flex-col gap-3 ps-4">
					<div className="text-xl font-semibold">Comments:</div>
					{comments.length === 0 ? (
						<div className="text-orange-600">No comments yet...</div>
					) : (
						<>
							{comments.map((comment) => (
								<div key={comment.id} className="flex flex-col gap-2">
									<DetailItem type="comment" label="ID" value={comment.id} />
									<DetailItem
										type="comment"
										label="Date"
										value={dayjs(comment.date).format('ddd, M/D/YY @ h:mm A')}
									/>
									<DetailItem
										type="comment"
										label="Content"
										value={comment.content}
									/>
									<DetailItem
										type="comment"
										label="Author ID"
										value={comment.userId}
									/>
									<DetailItem
										type="comment"
										label="Author Username"
										value={comment.commentAuthor}
									/>
									<DetailItem
										type="comment"
										label="Author Email"
										value={comment.commentAuthorEmail}
									/>
								</div>
							))}
						</>
					)}
				</div>
				<Link href="/posts" className="mt-6 place-self-center">
					<Button label="Back to Posts" btnStyle="btn" />
				</Link>
			</div>
		</Card>
	)
}
