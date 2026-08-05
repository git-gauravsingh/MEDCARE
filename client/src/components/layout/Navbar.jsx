import { useState } from "react";
import {
  HiOutlineBars3,
  HiOutlineXMark,
} from "react-icons/hi2";
import { motion } from "framer-motion";
import Logo from "../common/Logo";

const links = [
  "Home",
  "AI",
  "Doctors",
  "Hospitals",
  "Medicine",
  "Blogs",
  "Contact",
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <li
              key={item}
              className="cursor-pointer text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-xl px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-100">
            Login
          </button>

          <button className="rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 px-5 py-2 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105">
            Sign Up
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl lg:hidden"
        >
          {open ? <HiOutlineXMark /> : <HiOutlineBars3 />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t bg-white lg:hidden"
        >
          <div className="flex flex-col p-6">

            {links.map((item) => (
              <button
                key={item}
                className="border-b py-4 text-left font-semibold text-slate-700"
              >
                {item}
              </button>
            ))}

            <button className="mt-6 rounded-xl border py-3 font-semibold">
              Login
            </button>

            <button className="mt-3 rounded-xl bg-blue-600 py-3 font-semibold text-white">
              Sign Up
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;