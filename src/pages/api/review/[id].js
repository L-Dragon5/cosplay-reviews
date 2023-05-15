import prisma from '@/lib/prisma';

// PUT /api/review/:id
export default async function handle(req, res) {
  const reviewId = req.query.id;
  const result = await prisma.Review.update({
    where: { id: reviewId },
    data: req.body,
  });

  res.json(result);
}
