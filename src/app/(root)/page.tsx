'use client'

import Image from 'next/image'
import loginImage from '@/assets/login.png'
import LoginActions from './login-actions.component'

export default function Login() {
  return (
    <div className="m-auto flex h-screen min-w-screen items-center">
      <div className="ml-5 flex items-center justify-center">
        <Image src={loginImage} width={598} quality={100} priority alt="Login image" className="" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <header>
          <h1 className="text-gray-100 text-title-lg">Boas vindas!</h1>
          <span className="text-body-md text-gray-200">
            Faça seu login ou acesse como visitante.
          </span>
        </header>

        <LoginActions />
      </div>
    </div>
  )
}
