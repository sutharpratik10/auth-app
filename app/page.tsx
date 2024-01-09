import Image from 'next/image'
import { Aleo } from "next/font/google"

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button"
import { LoginButton } from '@/components/ui/auth/login-button';

const font = Aleo({
  subsets:["latin"],
  weight:["600"]
})

export default function Home() {
  return (
   <main className='flex h-full flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-950'>
    <div className='space-y-6 text-center'>
      <h1 className={cn('text-6xl font-semibold text-white drop-shadow-md', font.className )}>
        🔐Auth
      </h1>
      <p className='text-white text-lg'>Simple Authentication service</p>
      <div>
        <LoginButton>
          <Button variant="secondary" className='font-bold'>
            SignIn
          </Button>
        </LoginButton>
      </div>
    </div>
   </main>
  )
}
