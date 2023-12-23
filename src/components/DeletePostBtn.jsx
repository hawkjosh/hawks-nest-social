'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { IoTrash } from 'react-icons/io5'

export default function DeletePostBtn({ id, email }) {
	const { data: session } = useSession()
	const router = useRouter()

	async function deletePost() {
		await fetch(`http://localhost:4000/posts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'no-cache'
		})
		router.refresh()
	}

	return (
		<>
			{session.user.email !== email ? null : (
				<Button
					label={<IoTrash />}
					btnStyle="icon"
					onClick={deletePost}
					className="hover:text-red-500"
				/>
			)}
		</>
	)
}
