import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

export async function GET(request, { params }) {
	const { id } = params
	const comment = await prisma.comment.findUnique({
		where: {
			id
		}
	})
	return NextResponse.json(comment, { status: 200 })
}

export async function PATCH(request, { params }) {
	const { id } = params
	const { content } = await request.json()
	const comment = await prisma.comment.update({
		where: {
			id
		},
		data: {
			content
		}
	})
	return NextResponse.json(comment, { status: 200 })
}

export async function DELETE(request, { params }) {
	const { id } = params
	await prisma.comment.delete({
		where: {
			id
		}
	})
	return NextResponse.json({ status: 200 })
}
