import Link from 'next/link'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DeletePostBtn from '@/components/DeletePostBtn'
import DeleteCommentBtn from '@/components/DeleteCommentBtn'
import EditPostBtn from '@/components/EditPostBtn'
import EditCommentBtn from '@/components/EditCommentBtn'
import AddCommentBtn from '@/components/AddCommentBtn'
import { IoList } from 'react-icons/io5'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getPosts() {
	const posts = await prisma.post.findMany({
		orderBy: {
			date: 'desc'
		}
	})
	return posts
}

async function getUsers() {
	const users = await prisma.user.findMany()
	return users
}

async function getComments() {
	const comments = await prisma.comment.findMany()
	return comments
}

export default async function PostsList() {
	const postData = await getPosts()
	const userData = await getUsers()
	const commentData = await getComments()

	const posts = postData.map((post) => {
		const user = userData.find((user) => user.id === post.userId)
		const comments = commentData.filter((comment) => comment.postId === post.id)

		const postComments = comments.map((comment) => {
			const user = userData.find((user) => user.id === comment.userId)
			return {
				...comment,
				commentAuthor: user.username,
				commentAuthorEmail: user.email
			}
		})

		return {
			...post,
			postAuthor: user.username,
			postAuthorEmail: user.email,
			postComments: postComments
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
									<div className="font-bold text-blue-400">
										{post.postAuthor}
									</div>
									<div>on</div>
									<div className="font-bold text-blue-400">
										{dayjs(post.date).format('ddd, M/D/YY @ h:mm A')}
									</div>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<Link href={`/posts/${post.id}`}>
									<Button
										label={<IoList />}
										btnStyle="icon"
										className="hover:text-orange-400"
									/>
								</Link>
								<AddCommentBtn postId={post.id} />
								<EditPostBtn
									postId={post.id}
									currPostContent={post.content}
									postEmail={post.postAuthorEmail}
								/>
								<DeletePostBtn id={post.id} email={post.postAuthorEmail} />
							</div>
						</div>
					</div>
					{post.postComments.map((comment) => (
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
											{comment.commentAuthor}
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
										commentEmail={comment.commentAuthorEmail}
									/>
									<DeleteCommentBtn
										id={comment.id}
										email={comment.commentAuthorEmail}
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
