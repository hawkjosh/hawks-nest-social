import { signIn, useSession } from 'next-auth/react'

import { Button } from '@/components/uiComponents'

import Image from 'next/image'

export default function MenuBtn({ closeMenu, toggleMenu }) {
	const { data: session } = useSession()

	const UserIcon = () => {
		if (session.user.image) {
			return (
				<Image
					src={session.user.image}
					alt={session.user.name}
					width={100}
					height={100}
					className="w-10 aspect-square rounded-full"
				/>
			)
		} else {
			return (
				<div className="w-10 aspect-square rounded-full bg-red-600 text-blue-600 flex place-content-center place-items-center text-2xl font-bold">
					{session.user.name[0]}
				</div>
			)
		}
	}

	const handleSignIn = () => {
		signIn()
		closeMenu()
	}

	return (
		<>
			{session ? (
				<Button label={<UserIcon />} btnStyle="icon" onClick={toggleMenu} />
			) : (
				<Button label="Sign In" btnStyle="btn" onClick={handleSignIn} />
			)}
		</>
	)
}
