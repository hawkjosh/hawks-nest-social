import fs from 'fs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed(modelName, jsonData) {
	for (const item of jsonData) {
		await prisma[modelName].create({
			data: item
		})
	}
	console.log(`${modelName} data seeded! 🌱`)
}

const userData = JSON.parse(
	fs.readFileSync(new URL('@/data/users.json', import.meta.url))
)

await seed('User', userData)

const postData = JSON.parse(
	fs.readFileSync(new URL('@/data/posts.json', import.meta.url))
)

await seed('Post', postData)

const commentData = JSON.parse(
	fs.readFileSync(new URL('@/data/comments.json', import.meta.url))
)

await seed('Comment', commentData)
