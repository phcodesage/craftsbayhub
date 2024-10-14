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
    const dislike = await prisma.dislike.create({
      data: {
        userId: session.user.id,
        topicId: params.id,
      },
    })

    return NextResponse.json(dislike, { status: 201 })
  } catch (error) {
    console.error('Failed to dislike topic:', error)
    return NextResponse.json({ error: 'Failed to dislike topic' }, { status: 500 })
  }
}