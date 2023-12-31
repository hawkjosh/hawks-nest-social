import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PostsList from '@/components/PostsList'

export default async function Posts() {
	const session = await getServerSession()
	if (!session || !session.user) {
		redirect('/')
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="text-xl font-extrabold uppercase">Posts</div>
			<PostsList />
		</div>
	)
}
