import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content } = await request.json()

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  try {
    const topic = await prisma.topic.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    })

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    console.error('Failed to create topic:', error)
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 })
  }
}