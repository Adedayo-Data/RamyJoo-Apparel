import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";

const UserAvatar = ({ user } : { user : User }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={user.profileImage || "/default-avatar.png"} />
        <AvatarFallback>{user.fullName?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className=  "font-semibold text-lg">Welcome,</h2>
        <p className="-mt-1">{user.fullName?.split(" ")[0] || "User"}!</p>
      </div>
    </div>
  );
};

export default UserAvatar;


// const UserAvatar = () => {
//   return (
//     <div className="flex items-center gap-2">
//       <Avatar>
//         <AvatarImage src="https://github.com/shadcn.png" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       <div>
//         <h2 className="font-semibold text-lg">Welcome,</h2>
//         <p className="-mt-1">User!</p>
//       </div>
//     </div>
//   );
// };

// export default UserAvatar;
