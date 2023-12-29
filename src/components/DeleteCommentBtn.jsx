'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/uiComponents'

import { IoTrash } from 'react-icons/io5'

export default function DeleteCommentBtn({ id, email }) {
	const { data: session } = useSession()
	const router = useRouter()

	async function deleteComment() {
		await fetch(`http://localhost:3000/api/comments/${id}`, {
			method: 'DELETE',
			cache: 'no-store'
		})
		router.refresh()
	}

	return (
		<>
			{session.user.email !== email ? null : (
				<Button
					label={<IoTrash />}
					btnStyle="icon"
					onClick={deleteComment}
					className="text-xl text-white hover:text-red-500"
				/>
			)}
		</>
	)
}
