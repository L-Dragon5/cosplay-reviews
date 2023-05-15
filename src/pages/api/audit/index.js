import prisma from '@/lib/prisma';

// POST /api/audit
export default async function handle(req, res) {
  const result = await prisma.Audit.create({
    data: req.body,
  });
  res.json(result);
}
