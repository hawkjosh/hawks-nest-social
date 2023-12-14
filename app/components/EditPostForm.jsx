'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Posts } from '../api/routes'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'

import { useSession } from 'next-auth/react'

const EditPostForm = ({ postId, closeModal }) => {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState(existingPostContent)

	const handleInputChange = (e) => setPostContent(e.target.value)

	const existingPostContent = async () => {
		const existingPostData = await Posts.getOne(postId)
		return existingPostData[0].content
	}

	const handleEditPost = async () => {
		// const existingUserData = await Users.getOne('email', session.user.email)
		await Posts.edit(postId, postContent)
		
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
			<Button label="Post It!" btnStyle="btn" onClick={handleEditPost} />
		</form>
	)
}

export default EditPostForm
