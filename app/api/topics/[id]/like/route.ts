import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const like = await prisma.like.create({
      data: {
        userId: session.user.id,
        topicId: params.id,
      },
    })

    return NextResponse.json(like, { status: 201 })
  } catch (error) {
    console.error('Failed to like topic:', error)
    return NextResponse.json({ error: 'Failed to like topic' }, { status: 500 })
  }
}