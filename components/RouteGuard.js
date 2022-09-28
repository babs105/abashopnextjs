import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function RouteGuard({ children }) {
  const router = useRouter();

  const user = useSelector((state) => state.user.currentUser);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log("IN ROUTE GARD");
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  function authCheck(url) {
    if (user) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
  }
  return authorized && children;
}
