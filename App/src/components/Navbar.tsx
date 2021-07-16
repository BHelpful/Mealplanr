import React from "react";
import { logOut } from "../reducers/isLoggedIn";
import "./Navbar.scss"
//import { user } from "path/to/user";    // TODO: Create and import user object 
const user = {
  firstname: "Lars",
  lastname: "larsen",
  image: "path/to/image.jpg"
}

const navbarlist = [
  {
    title: "Plan meals",
    url: "/plan"
  },
  {
    title: "Browse recepies",
    url: "/browse"
  },
  {
    title: "My collection",
    url: "/collection"
  },
  {
    title: "Shopping list",
    url: "/list"
  },
  {
    title: "Settings",
    url: "/settings"
  }
]

export default function Navbar({
  menuCurrent,
  menuOpen,
  setMenuCurrent,
  setMenuOpen,
} : {
  menuCurrent: number,
  menuOpen: boolean,
  setMenuCurrent: React.Dispatch<React.SetStateAction<number>>,
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const toggleNav = (old: boolean) => {
    console.log(!old);
    setMenuOpen(!old);
  };

  const clickBar = (index: number, url: string) => {
    console.log(index, url);
    setMenuCurrent(index);
  };

  return (
    <div id="navbar" className={menuOpen?'wide':'thin'}>
      <div className="top">
        <div className="logo icon"></div>
        <p>MealPlanr</p>
        <div className="burger icon" onClick={() => toggleNav((menuOpen))}>x</div>
      </div>
      <div className="items">
        {navbarlist.map(((data: any, index: number) => (
          <div className={"bar" + (menuCurrent===index?" selected":"")} onClick={() => clickBar((index), (data.url))} >
            <div className={"icon " + index}></div>
            <p>{data.title}</p>
          </div>
        )))}
      </div>
      <div className="bottom">
        <div className="profile image" data-img={user.image}></div>
        <p>{user.firstname} {user.lastname}</p>
        <div className="logout icon" onClick={() => logOut()}></div>
      </div>
    </div>
  )
};