'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addPost } from '../api/routes'
import { randUuid } from '@ngneat/falso'
import Button from '@/components/ui/Button'

const initialFormState = {
	date: new Date(),
	content: '',
	user: {
		username: '',
		email: ''
	}
}

const AddPostForm = ({ closeModal }) => {
	const router = useRouter()
	const [postContent, setPostContent] = useState(initialFormState)

	const resetForm = () => {
		setPostContent(initialFormState)
	}

	// const handleInputChange = (e) => {
	// 	const { name, value } = e.target
	// 	setPostContent({ ...postContent, [name]: value })
	// }

	const handleInputChange = (e) => {
		const { name, value } = e.target
		if (name === 'username' || name === 'email') {
			setPostContent({
				...postContent,
				user: {
					...postContent.user,
					[name]: value
				}
			})
		} else setPostContent({ ...postContent, [name]: value })
	}

	const handleAddPost = async () => {
		const newPost = {
			id: randUuid(),
			date: postContent.date,
			content: postContent.content,
			user: {
				id: randUuid(),
				username: postContent.user.username,
				email: postContent.user.email
			}
		}
		console.log(newPost)

		await addPost(newPost)
		router.refresh()
		closeModal()
		resetForm()
	}

	return (
		<form className="flex flex-col gap-4">
			<div className="text-4xl text-center text-white">Make a Post!!</div>
			<textarea
				name="content"
				id="content"
				value={postContent.content}
				onChange={handleInputChange}
				placeholder={`What's on your mind?`}
				className="rounded-lg placeholder:text-gray-400 focus:placeholder:text-gray-300"
			/>
			<div className="flex items-center justify-center gap-3">
				<input
					type="text"
					name="username"
					id="username"
					value={postContent.user.username}
					onChange={handleInputChange}
					placeholder="Enter your username..."
					className="rounded-lg placeholder:text-gray-400 focus:placeholder:text-gray-300"
				/>
				<input
					type="text"
					name="email"
					id="email"
					value={postContent.user.email}
					onChange={handleInputChange}
					placeholder="Enter your email..."
					className="rounded-lg placeholder:text-gray-400 focus:placeholder:text-gray-300"
				/>
			</div>
			<Button label="Add Post" btnStyle="text" onClick={handleAddPost} />
		</form>
	)
}

export default AddPostForm
