import Link from 'next/link'
import dayjs from 'dayjs'
import { Users, Posts, Comments } from '@/api/routes'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DeletePostBtn from '@/components/DeletePostBtn'
import DeleteCommentBtn from '@/components/DeleteCommentBtn'
import EditPostBtn from '@/components/EditPostBtn'
import EditCommentBtn from '@/components/EditCommentBtn'
import AddCommentBtn from '@/components/AddCommentBtn'
import { IoList } from 'react-icons/io5'

export default async function PostsList() {
	const postsData = await Posts.getAll()
	const usersData = await Users.getAll()
	const commentsData = await Comments.getAll()

	const posts = postsData.map((post) => {
		const user = usersData.find((user) => user.id === post.userId)
		const comments = commentsData.filter(
			(comment) => comment.postId === post.id
		)

		return {
			...post,
			username: user.username,
			email: user.email,
			// comments: comments,
			comments: comments.map((comment) => {
				const user = usersData.find((user) => user.id === comment.userId)

				return {
					...comment,
					username: user.username,
					email: user.email
				}
			})
		}
	})

	return (
		<div className="flex flex-col gap-4">
			{posts.map((post) => (
				<Card
					key={post.id}
					className="flex flex-col gap-3 bg-opacity-50 bg-slate-300"
				>
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<div className="text-lg text-blue-600">{post.content}</div>
								<div className="flex items-center gap-1 text-sm">
									<div>Posted by</div>
									<div className="font-bold text-blue-400">{post.username}</div>
									<div>on</div>
									<div>Posted on</div>
									<div className="font-bold text-blue-400">
										{dayjs(post.date).format('ddd, M/D/YY @ h:mm A')}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								{/* <Link href={`/posts/${post.id}`}>
									<Button
										label={<IoList />}
										btnStyle="icon"
										className="hover:text-orange-400"
									/>
								</Link> */}
								<AddCommentBtn postId={post.id} />
								<EditPostBtn
									postId={post.id}
									currPostContent={post.content}
									postEmail={post.email}
								/>
								<DeletePostBtn postId={post.id} postEmail={post.email} />
							</div>
						</div>
					</div>
					{post.comments.map((comment) => (
						<Card
							key={comment.id}
							className="flex flex-col gap-4 bg-opacity-60 bg-slate-400"
						>
							<div className="flex items-center justify-between">
								<div className="flex flex-col gap-1">
									<div className="text-base text-yellow-600">
										{comment.content}
									</div>
									<div className="flex items-center gap-1 text-xs">
										<div className="text-white">Comment from</div>
										<div className="font-bold text-yellow-400">
											{comment.username}
										</div>
										<div className="text-white">on</div>
										<div className="font-bold text-yellow-400">
											{dayjs(comment.date).format('ddd, M/D/YY @ h:mm A')}
										</div>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<EditCommentBtn
										commentId={comment.id}
										currCommentContent={comment.content}
										commentEmail={comment.email}
									/>
									<DeleteCommentBtn
										commentId={comment.id}
										commentEmail={comment.email}
									/>
								</div>
							</div>
						</Card>
					))}
				</Card>
			))}
		</div>
	)
}
