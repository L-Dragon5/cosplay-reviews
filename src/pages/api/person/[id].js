import prisma from '@/lib/prisma';

// PUT /api/person/:id
export default async function handle(req, res) {
  const personId = req.query.id;
  const result = await prisma.ReviewablePeople.update({
    where: { id: personId },
    data: req.body,
  });
  res.json(result);
}
