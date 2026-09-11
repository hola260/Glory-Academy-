import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function generateReferenceNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `GLA${year}${month}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { referenceNumber: { contains: search } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      include: { documents: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Failed to fetch applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'gender',
      'program',
      'guardianName',
      'guardianPhone',
      'address',
    ];

    for (const field of requiredFields) {
      if (
        !body[field] ||
        (typeof body[field] === 'string' && !body[field].trim())
      ) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate unique reference number
    let referenceNumber = generateReferenceNumber();
    let exists = await prisma.application.findUnique({
      where: { referenceNumber },
    });
    while (exists) {
      referenceNumber = generateReferenceNumber();
      exists = await prisma.application.findUnique({
        where: { referenceNumber },
      });
    }

    // Create application with documents
    const application = await prisma.application.create({
      data: {
        referenceNumber,
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        program: body.program,
        previousSchool: body.previousSchool?.trim() || null,
        guardianName: body.guardianName.trim(),
        guardianPhone: body.guardianPhone.trim(),
        guardianEmail:
          body.guardianEmail?.trim()?.toLowerCase() || null,
        address: body.address.trim(),
        documents: {
          create:
            body.documents?.map(
              (doc: {
                type: string;
                fileName: string;
                filePath: string;
                fileSize: number;
                mimeType: string;
              }) => ({
                type: doc.type,
                fileName: doc.fileName,
                filePath: doc.filePath,
                fileSize: doc.fileSize,
                mimeType: doc.mimeType,
              })
            ) || [],
        },
      },
      include: { documents: true },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error('Failed to create application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
