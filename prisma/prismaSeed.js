const { PrismaClient } = require('@prisma/client')
const dbData = require('../src/data/db.json')
const prisma = new PrismaClient()

async function seed(modelName, jsonData) {
	// Delete existing data
	await prisma[modelName].deleteMany({})
	
	// Seed new data
	for (const item of jsonData) {
		await prisma[modelName].create({
			data: item
		})
	}
	console.log(`Existing ${modelName} data removed and new data seeded! 🌱`)
}

async function main() {
	const userSeeds = dbData.users
	await seed('User', userSeeds)
	const postSeeds = dbData.posts
	await seed('Post', postSeeds)
	const commentSeeds = dbData.comments
	await seed('Comment', commentSeeds)
}

main()
	.catch((e) => {
		console.error(e.message)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
