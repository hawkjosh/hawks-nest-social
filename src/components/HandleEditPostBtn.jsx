import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function editPost({ id, content }) {
	await prisma.post.update({
		where: { id },
		data: { content }
	})
}
