import { mobileMenuNavbar, sidebarLinks } from '@/public/db';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

function MobileMenuContent() {
    const pathname = usePathname();
    const isUserPanel = pathname.includes("/p-user");
  return (
    <div className="my-5 border-b-2 border-b-gray-600 pb-5">
          <ul className="text-white space-y-6">
            {isUserPanel
              ? sidebarLinks.map((menu) => (
                  <MobileMenu {...menu} key={menu.id}/>
                ))
              : mobileMenuNavbar.map((menu) => (
                   <MobileMenu {...menu} key={menu.id}/>
                ))}
          </ul>
        </div>
  )
}

export default MobileMenuContent