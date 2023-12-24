import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

export async function GET(request) {
	const posts = await prisma.post.findMany({
		orderBy: {
			date: 'desc'
		}
	})
	return NextResponse.json(posts, { status: 200 })
}

export async function POST(request) {
	const newPost = await request.json()
	await prisma.post.create({ data: newPost })
	return NextResponse.json(newPost, { status: 200 })
}
