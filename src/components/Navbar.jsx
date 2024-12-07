import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router'

import { useAuth } from "@/hooks/useAuth"

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="bg-background">
      <div className="flex h-16 items-center px-8">
        <div className="font-bold text-2xl mr-8">WAOW</div>

        <div className="flex gap-6 mr-6">
          <a href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Home
          </a>
          <a href="/profile" className="text-sm font-medium text-primary border-b-2 border-primary transition-colors">
            Profile
          </a>
          <a href="/category" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Category
          </a>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 bg-card border-0" />
          </div>

          <Avatar className="h-8 w-8" onClick={() => {
            logout()
            navigate('/login')
          }}>
            <AvatarImage src={user ? user.avatarUrl : ""} />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>

        </div>
      </div>
    </nav>
  );
}
