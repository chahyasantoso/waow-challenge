import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Navbar } from '../components/Navbar';

import { useNavigate } from 'react-router'
import { useAuth } from "@/hooks/useAuth"
import { getOneByEmail } from '../data/user_registration';
import { useState, useEffect } from 'react';


function Profile() {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      if (user) {
        const _userProfile = await getOneByEmail(user.email)
        if (_userProfile) {
          setUserProfile({
            ..._userProfile,
            username: `${_userProfile.firstName} ${_userProfile.lastName}`
          })
        }
      }
    })()
  }, [user])


  if (!userProfile) {
    return (
      <div className="container w-full min-h-screen">
        <Navbar />
        <main className="container w-full flex flex-col items-center justify-center mx-auto min-h-screen">
          Loading...
        </main>
      </div>
    )
  }

  const { username, email, phone, location, avatarUrl } = userProfile
  const handleSave = (e) => {
    e.preventDefault()
    alert('not functional')

  }

  return (
    <div className="container w-full min-h-screen">
      <Navbar />
      <main className="px-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center ">
          <Card className="bg-card">
            <h1 className="flex text-4xl font-bold bg-background rounded-r-sm relative w-1/4 p-5">Profile</h1>

            <CardContent className="p-12">
              <form onSubmit={handleSave} >

                <div className="flex justify-between">
                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Username</div>
                      <Input
                        readOnly={true}
                        defaultValue={username}
                        className="bg-card border-0 text-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">E - Mail</div>
                      <Input
                        readOnly={true}
                        type="email"
                        defaultValue={email}
                        className="bg-card border-0 text-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <Input
                        type="tel"
                        defaultValue={phone}
                        className="bg-card border-0 text-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Location</div>
                      <Input
                        defaultValue={location}
                        className="bg-card border-0 text-primary"
                      />
                    </div>
                  </div>

                  <div className="ml-24 flex flex-col items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-48 w-48">
                        <AvatarImage src={avatarUrl} />
                        <AvatarFallback>UN</AvatarFallback>
                      </Avatar>
                      <Button
                        size="icon"
                        className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100"
                      >
                        <Camera className="h-4 w-4 text-background" />
                      </Button>
                    </div>
                    <Button className="w-40 bg-background hover:bg-secondary/90 text-primary h-12">
                      Save
                    </Button>
                  </div>
                </div>
              </form>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default Profile;

