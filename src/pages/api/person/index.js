import prisma from '@/lib/prisma';

// POST /api/person
export default async function handle(req, res) {
  const result = await prisma.ReviewablePeople.create({
    data: req.body,
  });
  res.json(result);
}
