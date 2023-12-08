import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PostsList from '@/components/PostsList'

export default async function Dashboard() {
	const session = await getServerSession()
	if (!session || !session.user) {
		redirect('/api/auth/signin')
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="text-xl font-extrabold uppercase">Posts</div>
			<PostsList />
		</div>
	)
}