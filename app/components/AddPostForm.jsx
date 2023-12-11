'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addUser, getUserByEmail, addPost } from '../api/routes'
import { randUuid } from '@ngneat/falso'
import Button from '@/components/ui/Button'

import { useSession } from 'next-auth/react'

const AddPostForm = ({ closeModal }) => {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		const existingUserData = await getUserByEmail(session.user.email)
		if (existingUserData.length) {
			await addPost({
				id: randUuid(),
				date: new Date().toISOString(),
				content: postContent,
				userId: existingUserData[0].id
			})
		} else {
			const newUser = {
				id: randUuid(),
				username: session?.user?.name,
				email: session?.user?.email
			}
			const { id: newUserId } = await addUser(newUser)
			await addPost({
				id: randUuid(),
				date: new Date().toISOString(),
				content: postContent,
				userId: newUserId
			})
		}
		router.refresh()
		setPostContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col gap-4">
			<div className="text-4xl text-center text-white">Make a Post!!</div>
			<textarea
				name="content"
				id="content"
				value={postContent}
				onChange={handleInputChange}
				placeholder={`What's on your mind?`}
				className="rounded-lg placeholder:text-gray-400 focus:placeholder:text-gray-300"
			/>
			<Button label="Add Post" btnStyle="btn" onClick={handleAddPost} />
		</form>
	)
}

export default AddPostForm
