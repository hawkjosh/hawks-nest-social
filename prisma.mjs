import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
	// const user = await prisma.user.create({
	// 	data: {
	// 		username: 'hawkj',
	// 		email: 'hawkj@email.com'
	// 	}
	// })

	// console.log(`Created user with id: ${user.id}`)

	const user = await prisma.user.delete({
		where: {
			email: 'jwildeh@email.com'
		}
	})

	console.log(`deleted user with id: ${user.id}`)

	const users = await prisma.user.findMany()

	if (users.length) {
		console.log(JSON.stringify(users, null, 2))
	} else {
		console.log('No users found')
	}
}

main()
	.catch((e) => {
		console.error(e.message)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
