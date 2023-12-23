import { getServerSession } from 'next-auth'

export default async function App() {
	const session = await getServerSession()

	return (
		<div className="flex flex-col gap-6">
			{session ? (
				<div className="text-3xl font-extrabold text-center text-blue-600 uppercase">
					Welcome {session?.user?.name}
				</div>
			) : (
				<div className="text-xl italic font-light text-center text-red-600">
					Please sign in to start using the app!
				</div>
			)}
		</div>
	)
}
