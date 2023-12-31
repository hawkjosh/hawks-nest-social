import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

import AddCommentBtn from '@/components/AddCommentBtn'
import DeletePostBtn from '@/components/DeletePostBtn'
import DeleteCommentBtn from '@/components/DeleteCommentBtn'
import EditPostBtn from '@/components/EditPostBtn'
import EditCommentBtn from '@/components/EditCommentBtn'

import { Button, Card } from '@/components/uiComponents'

import { IoList } from 'react-icons/io5'

export default async function PostsList() {
	const postData = await fetch('http://localhost:3000/api/posts', {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())
	const userData = await fetch('http://localhost:3000/api/users', {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())
	const commentData = await fetch('http://localhost:3000/api/comments', {
		method: 'GET',
		cache: 'no-store'
	}).then((res) => res.json())

	const posts = postData.map((post) => {
		const user = userData.find((user) => user.id === post.userId)
		const comments = commentData.filter((comment) => comment.postId === post.id)

		const postComments = comments.map((comment) => {
			const user = userData.find((user) => user.id === comment.userId)
			return {
				...comment,
				commentAuthor: user.username,
				commentAuthorEmail: user.email,
				commentAuthorImage: user.image
			}
		})

		return {
			...post,
			postAuthor: user.username,
			postAuthorEmail: user.email,
			postAuthorImage: user.image,
			postComments: postComments
		}
	})

	return (
		<div className="flex flex-col gap-4">
			{posts.map((post) => (
				<Card key={post.id} className="flex flex-col gap-3 bg-slate-300">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							{post.postAuthorImage ? (
								<Image
									src={post.postAuthorImage}
									alt={post.postAuthor}
									width={100}
									height={100}
									className="w-12 aspect-square"
								/>
							) : (
								<div className="flex items-center justify-center w-12 aspect-square font-extrabold text-white bg-blue-600 rounded-full">
									{post.postAuthor.slice(0, 2).toUpperCase()}
								</div>
							)}
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
						<Card key={comment.id} className="flex flex-col gap-3 bg-blue-500">
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-4">
									{comment.commentAuthorImage ? (
										<Image
											src={comment.commentAuthorImage}
											alt={comment.commentAuthor}
											width={100}
											height={100}
											className="w-8 aspect-square"
										/>
									) : (
										<div className="flex items-center justify-center w-8 aspect-square font-extrabold text-white bg-blue-600 rounded-full">
											{comment.commentAuthor.slice(0, 2).toUpperCase()}
										</div>
									)}
									<div className="flex flex-col flex-1 gap-1">
										<div className="text-base text-white">
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
							</div>
						</Card>
					))}
				</Card>
			))}
		</div>
	)
}
