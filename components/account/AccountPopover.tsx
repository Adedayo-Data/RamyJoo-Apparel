// "use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Heart,
  HelpCircle,
  ListOrdered,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User } from "@/types";

const AccountPopover = ({ user }: { user?: User | null }) => {
  const pathname = usePathname();

  const userLinks = [
    {
      link: "/my-account",
      label: "My Account",
      icon: <UserIcon />,
      isActive: pathname.includes("/my-account"),
    },
    {
      link: "/wishlist",
      label: "Wishlist",
      icon: <Heart />,
      isActive: pathname.includes("/wishlist"),
    },
    // {
    //   link: "/my-orders",
    //   label: "My Orders",
    //   icon: <ListOrdered />,
    //   isActive: pathname.includes("/my-orders"),
    // },
    {
      link: "/help",
      label: "Help",
      icon: <HelpCircle />,
      isActive: pathname.includes("/help"),
    },
  ];

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Or router.push("/sign-in") if you prefer
};


  return (
    <div className="hidden lg:block">
      <Popover>
        <PopoverTrigger className="flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 duration-200 p-2 rounded-md">
          <UserIcon size={25} />
        </PopoverTrigger>
        <PopoverContent className="rounded-2xl w-56">
          <ul className="space-y-1 text-center">
            {user ? (
              <>
                <UserAvatar user={user} />
                <Separator className="!my-2" />
                {userLinks.map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    className={cn(
                      "flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md",
                      link.isActive && "bg-gray-200  dark:bg-gray-800"
                    )}
                  >
                    {link.icon} {link.label}
                  </Link>
                ))}
                <Separator className="!my-2" />
                <button 
                onClick={handleLogout}
                className="flex items-start justify-start gap-2 p-2 bg-transparent hover:opacity-50">
                  <LogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccountPopover;
