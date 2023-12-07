import dayjs from 'dayjs'
import { getPosts } from '../api/routes'
import DeletePostBtn from './DeletePostBtn'
import Card from '@/app/components/ui/Card'

export default async function PostsList() {
	const posts = await getPosts()

	return (
		<div className='flex flex-col gap-4'>
			{posts.map((post) => (
				<Card
					key={post.id}
					title={`${post.username} said...`}
					className='bg-slate-300 bg-opacity-70'>
					<div className='flex flex-col gap-2 mt-3'>
						<div className='w-[90%]'>{post.content}</div>
						<div className='text-sm font-light'>
							Posted on {dayjs(post.date).format('ddd, M/D/YY')} by {post.email}
						</div>
					</div>
					<div className='absolute transform -translate-y-1/2 right-2 top-1/2'>
						<DeletePostBtn postId={post.id} />
					</div>
				</Card>
			))}
		</div>
	)
}
