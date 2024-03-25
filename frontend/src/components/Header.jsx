import React from "react";
import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-4">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-large font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-pink-500 via-blue-300 bg-indigo-600 rounded-lg text-white">
          Kiddos
        </span>
        Blog
      </Link>
      <form action="">
        <TextInput
          type="text"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-12 lg:hidden" color='gray' pill>
        <AiOutlineSearch />
      </Button>

      {/* nightmode and signin  */}
      <div className="flex gap-2  md:order-2 ">   {/* order-2 here states that on screens above medium size show this second  */}
        <Button className="w-12 h-10 hidden sm:inline" color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/signin'>
          <Button gradientDuoTone="purpleToPink" pill outline>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>

      {/* menu */}
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}> 
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
