import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

export async function GET(request) {
	const comments = await prisma.comment.findMany()
	return NextResponse.json(comments, { status: 200 })
}

export async function POST(request) {
	const newComment = await request.json()
	await prisma.comment.create({ data: newComment })
	return NextResponse.json(newComment, { status: 200 })
}
