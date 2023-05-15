import prisma from '@/lib/prisma';

// POST /api/review
export default async function handle(req, res) {
  const result = await prisma.Review.create({
    data: req.body,
  });
  res.json(result);
}
