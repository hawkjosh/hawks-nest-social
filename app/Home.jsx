import { getServerSession } from 'next-auth'

export default async function Home() {
	const session = await getServerSession()
	return (
		<div className="flex flex-col gap-6">
			{session ? (
				<div className="text-3xl font-extrabold uppercase text-center text-blue-600">
					Welcome {session?.user?.name}
				</div>
			) : (
				<div className="text-xl font-light italic text-red-600">
					Login to start posting!
				</div>
			)}
		</div>
	)
}
