import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

export async function GET(request, { params }) {
	const { id } = params
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	})
	return NextResponse.json(post, { status: 200 })
}

export async function PATCH(request, { params }) {
	const { id } = params
	const { content } = await request.json()
	const post = await prisma.post.update({
		where: {
			id
		},
		data: {
			content
		}
	})
	return NextResponse.json(post, { status: 200 })
}

export async function DELETE(request, { params }) {
	const { id } = params
	await prisma.post.delete({
		where: {
			id
		}
	})
	return NextResponse.json({ status: 200 })
}
