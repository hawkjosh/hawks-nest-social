import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
// // import EmailProvider from 'next-auth/providers/email'

// // import { PrismaAdapter } from '@next-auth/prisma-adapter'
// // import { PrismaClient } from '@prisma/client'

// // const prisma = new PrismaClient()

export const options = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Enter your username...'
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password...'
				}
			},
			async authorize(credentials) {
				// Docs at https://next-auth.js.org/configuration/providers/credentials
				const user = { id: '1', name: 'admin', password: 'password' }
				if (
					credentials.username === user.name &&
					credentials.password === user.password
				) {
					return user
				} else {
					return null
				}
			}
		})
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
	// 	// adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt'
	}
}
