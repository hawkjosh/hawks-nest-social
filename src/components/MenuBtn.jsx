import Button from '@/components/ui/Button'
import { signIn, useSession } from 'next-auth/react'

export default function MenuBtn({ closeMenu, toggleMenu }) {
	const { data: session } = useSession()

	const userIcon = session?.user?.image ? (
		<img
			src={session.user.image}
			alt={session.user.name}
			className="w-10 aspect-square rounded-full"
		/>
	) : (
		<div className="w-10 aspect-square rounded-full bg-red-600 text-blue-600 flex place-content-center place-items-center text-2xl font-bold">
			{session?.user?.name[0]}
		</div>
	)

	const handleSignIn = () => {
		signIn()
		closeMenu()
	}

	return (
		<>
			{session ? (
				<Button label={userIcon} btnStyle="icon" onClick={toggleMenu} />
			) : (
				<Button label="Sign In" btnStyle="btn" onClick={handleSignIn} />
			)}
		</>
	)
}
