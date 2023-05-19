import prisma from '@/lib/prisma';

export default async function handle(req, res) {
  // POST /api/review
  // GET /api/review
  if (req.method === 'POST') {
    const result = await prisma.Review.create({
      data: req.body,
    });
    return res.status(200).json(result);
  } else if (req.method === 'GET') {
    const data = await prisma.Review.findMany({
      where: { deletedAt: null },
      include: {
        reviewee: true,
      },
      orderBy: [{ isApproved: 'asc' }, { createdAt: 'asc' }],
    });
    return res.status(200).json(JSON.parse(JSON.stringify(data)));
  }
}
