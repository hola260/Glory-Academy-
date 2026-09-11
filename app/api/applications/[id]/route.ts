import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    const validStatuses = ['pending', 'reviewing', 'accepted', 'rejected'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.notes !== undefined && { notes: body.notes }),
      },
      include: { documents: true },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error('Failed to update application:', error);
    return NextResponse.json(
      { error: 'Application not found or update failed' },
      { status: 404 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const application = await prisma.application.findUnique({
      where: { id },
      include: { documents: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('Failed to fetch application:', error);
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    );
  }
}
