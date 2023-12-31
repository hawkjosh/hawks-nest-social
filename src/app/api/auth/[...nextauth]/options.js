import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import EmailProvider from 'next-auth/providers/email'

// import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/lib/client'

import { v4 as uuidv4 } from 'uuid'

async function checkExistingUser({ email }) {
	const user = await prisma.user.findUnique({
		where: {
			email
		}
	})
	return user
}

async function updateExistingUser(user) {
	await prisma.user.update({
		where: {
			id: user.id
		},
		data: user
	})
}

async function createNewUser(user) {
	await prisma.user.create({ data: user })
}

export const options = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		})
		// CredentialsProvider({
		// 	name: 'Credentials',
		// 	credentials: {
		// 		username: {
		// 			label: 'Username',
		// 			type: 'text',
		// 			placeholder: 'Enter your username...'
		// 		},
		// 		password: {
		// 			label: 'Password',
		// 			type: 'password',
		// 			placeholder: 'Enter your password...'
		// 		}
		// 	},
		// 	async authorize(credentials) {
		// 		// Docs at https://next-auth.js.org/configuration/providers/credentials
		// 		const user = { name: 'admin', password: 'password' }
		// 		if (
		// 			credentials.username === user.name &&
		// 			credentials.password === user.password
		// 		) {
		// 			return user
		// 		} else {
		// 			return null
		// 		}
		// 	}
		// }),
		// 		// Docs at https://next-auth.js.org/configuration/providers/email
		// EmailProvider({
		// 	server: {
		// 		host: process.env.EMAIL_SERVER_HOST,
		// 		port: process.env.EMAIL_SERVER_PORT,
		// 		secure: process.env.EMAIL_SERVER_SECURE === 'true',
		// 		auth: {
		// 			user: process.env.EMAIL_SERVER_USER,
		// 			pass: process.env.EMAIL_SERVER_PASSWORD
		// 		}
		// 	},
		// 	from: process.env.EMAIL_FROM
		// }),
	],
	callbacks: {
		async signIn({ user, account }) {
			const isOAuth = account?.type === 'oauth' ? true : false

			const existingUser = await checkExistingUser({ email: user.email })

			if (existingUser) {
				if (!isOAuth) {
					return true
				} else {
					const updateUser = {
						...existingUser,
						providerIds: [
							...new Set([
								...existingUser.providerIds,
								account.providerAccountId
							])
						]
					}
					await updateExistingUser(updateUser)
					return true
				}
			} else {
				const newUser = {
					id: uuidv4(),
					username: user.name,
					email: user.email,
					image: user.image,
					providerIds: [account.providerAccountId]
				}
				const newUserCreated = await createNewUser(newUser)
				return newUserCreated ? true : false
			}
		},
		// async session({ session, user }) {

		// 	const { id, username, email, image } = await prisma.user.findUnique({
		// 		where: {
		// 			email: user.email
		// 		},
		// 		select: {
		// 			id: true,
		// 			username: true,
		// 			email: true,
		// 			image: true
		// 		}
		// 	})

		// 	session.user.id = id
		// 	session.user.username = username
		// 	session.user.email = email
		// 	session.user.image = image

		// 	return session
		// }
	},
	session: {
		strategy: 'jwt'
	}
}
