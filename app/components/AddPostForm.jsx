'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Posts } from '../api/routes'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

import { useSession } from 'next-auth/react'

const AddPostForm = ({ closeModal }) => {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		const existingUserData = await Users.getOne('email', session.user.email)
		if (existingUserData.length) {
			await Posts.add(postContent, existingUserData[0].id)
		} else {
		await Users.add(session.user.name, session.user.email)
		const newUserData = await Users.getOne('email', session.user.email)
		await Posts.add(postContent, newUserData[0].id)
		}
		router.refresh()
		setPostContent('')
		closeModal()
	}

	return (
		<form className="flex flex-col w-3/4 gap-4 h-1/2">
			<Textarea
				postContent={postContent}
				handleInputChange={handleInputChange}
				label={`What's on your mind?`}
			/>
			<Button label="Post It!" btnStyle="btn" onClick={handleAddPost} />
		</form>
	)
}

export default AddPostForm
