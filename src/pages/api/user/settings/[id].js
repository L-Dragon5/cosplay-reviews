import prisma from '@/lib/prisma';

// GET /api/user/settings/:id
export default async function handle(req, res) {
  const userId = req.query.id;

  if (req.method === 'PUT') {
    const newDisplayName = req?.body?.displayName;
    if (newDisplayName !== null) {
      const displayNameExists = await prisma.User.findFirst({
        where: {
          AND: {
            displayName: newDisplayName?.trim(),
          },
          NOT: {
            id: userId,
          },
        },
        select: {
          id: true,
        },
      }).then(Boolean);

      if (displayNameExists) {
        return res.status(409).json({
          errors: {
            displayName: 'Display name is already being used.',
          },
        });
      }

      const result = await prisma.User.update({
        where: { id: userId },
        data: {
          displayName: newDisplayName?.trim(),
        },
      });
      return res.status(200).json(result);
    }

    const result = await prisma.User.update({
      where: { id: userId },
      data: {
        displayName: null,
      },
    });
    return res.status(200).json(result);
  }
}
