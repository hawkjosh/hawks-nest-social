import { NextResponse } from 'next/server'
import prisma from '@/lib/client'

export async function GET(request) {
	const users = await prisma.user.findMany()
	return NextResponse.json(users, { status: 200 })
}

export async function POST(request) {
	const newUser = await request.json()
	await prisma.user.create({ data: newUser })
	return NextResponse.json(newUser, { status: 200 })
}
