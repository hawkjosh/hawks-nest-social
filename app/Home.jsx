import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default async function Home() {
	const session = await getServerSession()
	if (!session || !session.user) {
		redirect('/api/auth/signin')
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="text-xl font-extrabold uppercase">Home Page</div>
			{session?.user?.name && (
				<>
					<div className="text-blue-600">{session.user.name} is logged in</div>
					<Link href="/posts">
						<Button label="View Posts" btnStyle="text" />
					</Link>
				</>
			)}
		</div>
	)
}
