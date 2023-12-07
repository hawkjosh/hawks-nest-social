import PostsList from '@/app/components/PostsList'

export default function Dashboard() {
	return (
		<>
			<div className='mb-4 text-xl font-extrabold uppercase'>Posts</div>
			<PostsList />
		</>
	)
}
