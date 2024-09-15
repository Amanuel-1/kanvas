
import { logOut } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export interface UserType {
    id:string;
    username: string;
    email: string;
    image: string;
}

export default function AvatarDropdown({user}: {user: UserType}) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src={user?.image}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
            
            
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent  className=" min-h-full min-w-full z-[100] bg-black p-6 font-sans lowercase flex flex-col items-center " align="end">
          <DropdownMenuLabel><small>loged in as <b>{user.email}</b></small></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full hover:outline-none p-1 hover:bg-background cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuItem className="w-full hover:outline-none p-1 hover:bg-background cursor-pointer">Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="w-full hover:outline-none p-1 hover:bg-background cursor-pointer" onClick={()=>logOut()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}