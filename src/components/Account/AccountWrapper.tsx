'use client';
import { signOut, useSession } from 'next-auth/react';
import AccountInfo from './AccountInfo';
import AccountSidebar from './AccountSidebar';
import { useEffect, useState } from 'react';
import AccountOrder from './AccountOrder';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function AccountWrapper() {
  const [clickBtn, setClickBtn] = useState(1);
  const session = useSession();
  const router = useRouter();

  const handleClick = (id: number) => {
    setClickBtn(id);
    if (id === 3) {
      signOut({ callbackUrl: '/' });
    }
  };
  useEffect(() => {
    const handleIsLogin = async () => {
      console.log(session);

      if (session.status === 'unauthenticated') {
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bạn phải đăng nhập để sử dụng dịch vụ của chúng tôi!',
        });
        router.push('/');
      }
    };
    handleIsLogin();
  }, [router, session]);
  return (
    <div className="flex mb-14 flex-col sm:flex-row">
      <div className="basis-4/12">
        <AccountSidebar clickBtn={clickBtn} handleClick={handleClick} />
      </div>
      <div className="basis-8/12">
        {clickBtn === 1 ? <AccountInfo /> : clickBtn === 2 && <AccountOrder />}
      </div>
    </div>
  );
}

export default AccountWrapper;
