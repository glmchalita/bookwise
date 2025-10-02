import Image from 'next/image'
import { redirect } from 'next/navigation'
import loginImage from '@/assets/login.png'
import { LoginForm } from '@/components/form/login-form'
import { auth } from '@/lib/auth'

export default async function Login() {
  const loggedUser = (await auth())?.user

  if (loggedUser) {
    redirect('/home')
  }

  return (
    <div className="m-auto flex h-screen min-w-screen items-center">
      <div className="ml-5 flex items-center justify-center">
        <Image src={loginImage} width={598} quality={100} priority alt="Login image" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div>
          <header>
            <h1 className="text-gray-100 text-title-lg">Boas vindas!</h1>
            <span className="text-body-md text-gray-200">
              Faça seu login ou acesse como visitante.
            </span>
          </header>

          <LoginForm withGuestOption={true} containerClassName="mt-10" />
        </div>
      </div>
    </div>
  )
}
