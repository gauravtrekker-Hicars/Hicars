import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { defaultTestimonials, type TestimonialItem } from '../../../src/data/testimonials';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'testimonials.json');

async function readTestimonialsFile() {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as TestimonialItem[];
    return Array.isArray(parsed) ? parsed : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export async function GET() {
  const testimonials = await readTestimonialsFile();
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const body = (await request.json()) as TestimonialItem[];

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid testimonial payload' }, { status: 400 });
  }

  await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(body, null, 2), 'utf8');

  return NextResponse.json(body);
}
