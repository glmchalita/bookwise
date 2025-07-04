import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { PiRocketLaunch } from 'react-icons/pi'
import loginImage from '@/assets/login.png'
import { Button } from './(components)/button'

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

        <section className="mt-10 flex flex-col gap-4">
          <Button href={''}>
            <FcGoogle size={32} />
            Entrar com Google
          </Button>

          <Button href={''}>
            <FaGithub size={32} />
            Entrar com Github
          </Button>

          <Button href={'/home'}>
            <PiRocketLaunch size={32} className="text-purple-100" />
            Acessar como visitante
          </Button>
        </section>
      </div>
    </div>
  )
}
