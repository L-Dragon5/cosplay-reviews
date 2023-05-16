import prisma from '@/lib/prisma';

async function calculateAverages(reviewId) {
  const reviewee = await prisma.Review.findFirst({
    select: {
      reviewee: {
        select: {
          id: true,
        },
      },
    },
    where: {
      id: reviewId,
    },
  });

  const averages = await prisma.Review.aggregate({
    _avg: {
      quality: true,
      communication: true,
      cost: true,
      turnaround: true,
    },
    where: {
      isApproved: true,
      revieweeId: reviewee.reviewee.id,
    },
  });

  await prisma.ReviewablePeople.update({
    where: { id: reviewee.reviewee.id },
    data: {
      avgCost: averages._avg.cost,
      avgTurnaround: averages._avg.turnaround,
      avgQuality: averages._avg.quality,
      avgCommunication: averages._avg.communication,
    },
  });
}

// PUT /api/review/:id
export default async function handle(req, res) {
  const reviewId = req.query.id;
  const result = await prisma.Review.update({
    where: { id: reviewId },
    data: req.body,
  });
  await calculateAverages(reviewId);

  return res.status(200).json(result);
}
