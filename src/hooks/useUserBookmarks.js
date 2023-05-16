import { useSession } from 'next-auth/react';
import useSWR from 'swr';

export const useUserBookmarks = () => {
  const { data: session } = useSession();

  const { data: userBookmarks, mutate: updateUserBookmarks } = useSWR(
    session?.user?.id ? `/api/user/bookmarks/${session?.user?.id}` : null,
    async (input, init) => {
      const res = await fetch(input, init);
      return res.json();
    },
  );

  return {
    userBookmarks,
    updateUserBookmarks,
  };
};
