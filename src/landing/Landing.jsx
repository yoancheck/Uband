import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Home from "../components/home/Home";
import NavbarComponent from "../components/navbar/NavbarComponent";
import PlayersList from "../components/players-list/PlayersList";
import { LikedPosts } from "../components/Posts/LikedPosts";
import Posts from "../components/Posts/Posts";
import Sales from "../components/Sale/Sales";
import Search from "../components/search/Search";
import { Login } from "../components/Sign-up/login";
import SignUp from "../components/Sign-up/SignUp";
import { Context } from "../store/Store";
export default function Landing(p) {
  const [, dispatch] = useContext(Context);
  useEffect(
    () =>
      onAuthStateChanged(getAuth(), (user) => {
        if (user) dispatch({ type: "SET_AUTH", payload: true });
        else dispatch({ type: "SET_AUTH", payload: false });
      }),
    []
  );
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/home" component={Home} />
        <Route path="/posts" component={Posts} />
        <Route path="/login" component={Login} />
        <Route path="/my-posts" component={LikedPosts} />
        <Route path="/Sale" component={Sales} />
      </Switch>
    </BrowserRouter>
  );
}
