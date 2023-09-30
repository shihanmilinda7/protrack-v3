import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function WithRole({ roles, children }) {
    const { data: session, status } = useSession();

  const router = useRouter();
  const tmpUser = session?.user;
  if (!session || !roles.some(role => tmpUser?.role.includes(role))) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
