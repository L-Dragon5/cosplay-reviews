import prisma from '@/lib/prisma';

export default async function handle(req, res) {
  // POST /api/person
  // GET /api/person
  if (req.method === 'POST') {
    const result = await prisma.ReviewablePeople.create({
      data: req.body,
    });
    return res.status(200).json(result);
  } else if (req.method === 'GET') {
    const data = await prisma.ReviewablePeople.findMany({
      where: { deletedAt: null },
      orderBy: [{ isApproved: 'asc' }, { createdAt: 'asc' }],
    });
    return res.status(200).json(JSON.parse(JSON.stringify(data)));
  }
}
