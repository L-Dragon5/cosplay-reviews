import prisma from '@/lib/prisma';

// GET /api/user/:id
export default async function handle(req, res) {
  const userId = req.query.id;
  if (req.method === 'GET') {
    const result = await prisma.User.findFirst({
      select: {
        bookmarks: true,
      },
      where: { id: userId },
    });
    return res.status(200).json(result);
  } else if (req.body.method === 'DELETE') {
    const result = await prisma.BookmarkPeople.delete({
      where: {
        userId_personId: { userId: userId, personId: req.body.personId },
      },
    });
    return res.status(200).json(result);
  }
}
