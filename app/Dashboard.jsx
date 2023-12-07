import PostsList from '@/components/PostsList'

export default function Dashboard() {
	return (
		<div className='flex flex-col gap-6'>
			<div className='text-xl font-extrabold uppercase'>Posts</div>
			<PostsList />
		</div>
	)
}
