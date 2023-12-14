import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? ''
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID ?? '',
			clientSecret: process.env.GOOGLE_SECRET ?? ''
		})
		// FacebookProvider({
		// 	clientId: process.env.FACEBOOK_ID ?? '',
		// 	clientSecret: process.env.FACEBOOK_SECRET ?? ''
		// })
	],
	session: {
		strategy: 'jwt'
	}
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
