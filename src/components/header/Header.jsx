import HamburgerIcon from "./icons/HamburgerIcon.jsx";
import BellIcon from "./icons/BellIcon.jsx";
import UserIcon from "./icons/UserIcon.jsx";

const Header = () => {
  return (
    <div className="flex h-[125px] w-full border-0 border-violet-700">
      <div className="mx-4 flex w-full items-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-custom-gray-100">
          <HamburgerIcon />
        </span>
        <div className="ml-6 flex h-[75px] w-[450px] items-center justify-center gap-4 rounded-full bg-custom-gray-100">
          <div className="h-[75px] w-[75px]">
            <img
              className="inset-0 h-full w-full rounded-full object-cover"
              src="/assets/images/website-logo.jpg"
              alt=""
            />
          </div>
          <h2 className="text-2xl font-bold">DWIE strony TĘCZY</h2>
        </div>
        <div className="ml-auto flex h-[125px] w-[600px] -translate-y-0.5 translate-x-5 items-center justify-center bg-header-background">
          <div className="flex h-[50px] w-[550px] translate-x-4 items-center justify-center rounded-full bg-custom-gray-100">
            <ul className="flex gap-10">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                O nas
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                Kontakt
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-custom-gray-400"></span>
                Sklep
              </li>
            </ul>
            <div className="ml-8 flex gap-4">
              <span className="rounded-full bg-white p-1">
                <BellIcon />
              </span>
              <span className="rounded-full bg-white p-1">
                <UserIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
