import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/uiComponents'

export default async function App() {
	const session = await getServerSession()

	return (
		<div className="flex flex-col items-center gap-12">
			{session ? (
					<>
						<div className="text-6xl font-extrabold text-center text-blue-600 uppercase">
							Welcome {session.user.name}
						</div>
						<Image src={session.user.image} alt={session.user.name} width={200} height={200} className='w-1/4 rounded-full' />
						<Link href="/posts" className='flex justify-center w-1/5'>
							<Button label='View Posts' btnStyle='btn' />
						</Link>
					</>
			) : (
				<div className="text-xl italic font-light text-center text-red-600">
					Please sign in to start using the app!
				</div>
			)}
		</div>
	)
}
