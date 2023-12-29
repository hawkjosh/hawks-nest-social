'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { Button, Textarea } from '@/components/uiComponents'

export default function AddPostForm({ closeModal }) {
	const { data: session } = useSession()
	const router = useRouter()
	const [postContent, setPostContent] = useState('')

	const handleInputChange = (e) => setPostContent(e.target.value)

	const handleAddPost = async () => {
		closeModal()
		setPostContent('')
		// const { id: existingUser } = await fetch(
		// 	`http://localhost:3000/api/users/${session.user.email}`,
		// 	{
		// 		method: 'GET',
		// 		cache: 'no-store'
		// 	}
		// ).then((res) => res.json())

		const res = await fetch(
			`http://localhost:3000/api/users/${session.user.email}`,
			{
				method: 'GET',
				cache: 'no-store'
			}
		)
		const userData = await res.json()

		console.log(userData)

		// if (!existingUser) {
		if (!userData) {
			await fetch('http://localhost:3000/api/users', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					username: session.user.username,
					email: session.user.email,
					image: session.user.image
				}),
				cache: 'no-store'
			})
			// const { id: newUser } = await fetch(
			// 	`http://localhost:3000/api/users/${session.user.email}`,
			// 	{
			// 		method: 'GET',
			// 		cache: 'no-store'
			// 	}
			// ).then((res) => res.json())
			
			const res = await fetch(
				`http://localhost:3000/api/users/${session.user.email}`,
				{
					method: 'GET',
					cache: 'no-store'
				}
			)
			const newUserData = await res.json()

			console.log(newUserData)

			await fetch('http://localhost:3000/api/posts', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					date: new Date().toISOString(),
					content: postContent,
					// userId: newUser
					userId: newUserData.id
				}),
				cache: 'no-store'
			})
		} else {
			await fetch('http://localhost:3000/api/posts', {
				method: 'POST',
				body: JSON.stringify({
					id: uuidv4(),
					date: new Date().toISOString(),
					content: postContent,
					// userId: existingUser
					userId: userData.id
				}),
				cache: 'no-store'
			})
		}


	// 	try {
	// 		let response = await fetch(`http://localhost:3000/api/users/${session.user.email}`, {
	// 				method: 'GET',
	// 				cache: 'no-store'
	// 		});
	// 		let userData = await response.json();
	// 		let userId = userData.id;

	// 		if (!userId) {
	// 				let newUserResponse = await fetch('http://localhost:3000/api/users', {
	// 						method: 'POST',
	// 						headers: {
	// 								'Content-Type': 'application/json'
	// 						},
	// 						body: JSON.stringify({
	// 								id: uuidv4(),
	// 								username: session.user.username,
	// 								email: session.user.email,
	// 								image: session.user.image
	// 						}),
	// 						cache: 'no-store'
	// 				});
	// 				let newUser = await newUserResponse.json();
	// 				userId = newUser.id;
	// 		}

	// 		await fetch('http://localhost:3000/api/posts', {
	// 				method: 'POST',
	// 				headers: {
	// 						'Content-Type': 'application/json'
	// 				},
	// 				body: JSON.stringify({
	// 						id: uuidv4(),
	// 						date: new Date().toISOString(),
	// 						content: postContent,
	// 						userId: userId
	// 				}),
	// 				cache: 'no-store'
	// 		});

	// 		router.refresh();
	// } catch (error) {
	// 		console.error('Error during fetch operation:', error);
	// 		// Handle the error appropriately
	// }




		router.refresh()
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
