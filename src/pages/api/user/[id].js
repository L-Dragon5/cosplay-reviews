import prisma from '@/lib/prisma';

// GET /api/user/:id
export default async function handle(req, res) {
  const userId = req.query.id;

  if (req.method === 'PUT') {
    const result = await prisma.User.update({
      where: { id: userId },
      data: {
        bookmarks: {
          create: [
            {
              person: {
                connect: {
                  id: req.body.personId,
                },
              },
            },
          ],
        },
      },
    });
    return res.status(200).json(result);
  }
}
