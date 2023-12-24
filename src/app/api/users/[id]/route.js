import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

// export async function GET(request, { params }) {
// 	const { id } = params
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			id
// 		}
// 	})
// 	return NextResponse.json(user, { status: 200 })
// }

export async function GET(request, { params }) {
	const { id } = params
	const user = await prisma.user.findUnique({
		where: {
			email: id
		}
	})
	return NextResponse.json(user, { status: 200 })
}
