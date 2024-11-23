import Logo from "./Logo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LogOut } from "lucide-react";

const supabase = createClient(
  import.meta.env.VITE_SUPA_URL,
  import.meta.env.VITE_SUPA_ANON,
);

export default function Header() {
  const [userStatus, setUserStatus] = useState("loading");

  const buttonTypes = {
    loading: (
      <Button variant="secondary" disabled>
        <Loader2 className="animate-spin" />
      </Button>
    ),
    "logged-out": (
      <Link to="log-in">
        <Button variant="secondary">Log In</Button>
      </Link>
    ),
    management: (
      <div className="flex flex-row text-white space-x-2">
        <Link to="employee-home">
          <Button variant="secondary">Employee Dashboard</Button>
        </Link>
        <div onClick={() => signOut()}>
          <Button variant="destructive">
            <LogOut />
          </Button>
        </div>
      </div>
    ),
    customer: (
      <div className="flex flex-row text-white space-x-2">
        <Link to="customer-home">
          <Button variant="secondary">Customer Dashboard</Button>
        </Link>
        <div onClick={() => signOut()}>
          <Button variant="destructive">
            <LogOut />
          </Button>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    isLoggedIn();

    const timer = setInterval(isLoggedIn, 1 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  //function to determine if a user is logged in and currently has a valid sesssion
  async function isLoggedIn() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error);
        setUserStatus("logged-out");
        return;
      }

      if (!data?.session?.user) {
        setUserStatus("logged-out");
        return;
      }

      const accountType = data.session.user.user_metadata.account_type;

      switch (accountType) {
        case "Manager":
        case "Employee":
          setUserStatus("management");
          break;

        case "Customer":
          setUserStatus("customer");
          break;

        default:
          setUserStatus("logged-out");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      }
      setUserStatus("logged-out");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-row justify-between pt-10 sm:pt-6 font-poppins">
      <div className="flex flex-row justify-center items-center gap-2 text-white text-xl">
        <Logo />
        <div>SmartQ</div>
      </div>
      {buttonTypes[userStatus]}
    </div>
  );
}
