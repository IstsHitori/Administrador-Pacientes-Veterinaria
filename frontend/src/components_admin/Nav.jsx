//NAV - ADMINISTRADOR
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav className="bg-black">
      <header className="border-b-[1.9px] border-zinc-800 py-6 px-[1rem] text-center">
        <span className="text-white text-[.9rem] font-semibold tracking-widest">
          APV
        </span>
      </header>
      <ul className="py-5 px-4 flex flex-col gap-8 md:gap-2 mt-2">
        <li>
          <Link className="flex items-center justify-center bg-blue-500 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-blue-600 transition">
            <ion-icon name="grid-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="briefcase-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="bag-add-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="person-add-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="copy-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[18px] text-white hover:bg-stone-950 transition">
            <ion-icon name="duplicate-outline"></ion-icon>
          </Link>
        </li>
      </ul>
      <div className="py-5 px-4 flex flex-col gap-2 mt-[10rem] md:mt-[4rem]">
        <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-white hover:bg-stone-950 transition">
          <ion-icon name="settings-outline"></ion-icon>
        </Link>

        <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-red-700 hover:bg-stone-950 transition">
          <ion-icon name="log-in-outline"></ion-icon>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
