import Link from 'next/link'
import dayjs from 'dayjs'
import { getSinglePost } from '@/api/routes'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default async function SinglePost({ params }) {
	const post = await getSinglePost(params.id)

	return (
		<Card>
			<div className='pb-6 text-2xl font-bold text-center underline'>
				Post Details
			</div>
			<div className='flex flex-col gap-4'>
				<div className='flex items-center gap-3'>
					<div className='font-semibold uppercase'>Date:</div>
					<div className='text-blue-600'>
						{dayjs(post.date).format('ddd, M/D/YY')}
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<div className='font-semibold uppercase'>Author Username:</div>
					<div className='text-blue-600'>{post.username}</div>
				</div>
				<div className='flex items-center gap-3'>
					<div className='font-semibold uppercase'>Author Email:</div>
					<div className='text-blue-600'>{post.email}</div>
				</div>
				<div className='flex items-center gap-3'>
					<div className='font-semibold uppercase'>Content:</div>
					<div className='text-blue-600'>{post.content}</div>
				</div>
				<Link
					href='/'
					className='mt-6 place-self-center'>
					<Button
						label='Back to Posts'
						btnStyle='text'
					/>
				</Link>
			</div>
		</Card>
	)
}
