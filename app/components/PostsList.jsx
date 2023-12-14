import Link from 'next/link'
import dayjs from 'dayjs'
import { Users, Posts } from '@/api/routes'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DeletePostBtn from '@/components/DeletePostBtn'
import EditPostBtn from '@/components/EditPostBtn'
import { IoList } from 'react-icons/io5'

export default async function PostsList() {
	const postsData = await Posts.getAll()
	const usersData = await Users.getAll()

	const posts = postsData.map((post) => {
		const user = usersData.find((user) => user.id === post.userId)
		return {
			...post,
			username: user.username,
			email: user.email
		}
	})

	return (
		<div className="flex flex-col gap-4">
			{posts.map((post) => (
				<Card key={post.id} className="bg-opacity-50 bg-slate-300">
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-4">
							<div className="flex flex-col flex-1 gap-2">
								<div className="text-lg text-blue-600">{post.content}</div>
								<div className="flex items-center gap-1 text-sm">
									<div>Posted by</div>
									<div className="font-bold text-blue-300">{post.username}</div>
									<div>on</div>
									<div>Posted on</div>
									<div className="font-bold text-blue-300">
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
								<EditPostBtn
									postId={post.id}
									currPostContent={post.content}
									postEmail={post.email}
								/>
								<DeletePostBtn postId={post.id} postEmail={post.email} />
							</div>
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}
