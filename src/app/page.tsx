import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { PiRocketLaunch } from 'react-icons/pi'
import homeImage from '@/assets/home.png'

export default function Home() {
  return (
    <div className="flex h-screen max-w-[calc(100vw-(100vw-1196px)/2))] items-center gap-56">
      <div className="pl-5">
        <Image src={homeImage} quality={100} priority alt="Home image" className="" />
      </div>

      <div>
        <header>
          <h1 className="text-gray-100 text-title-lg">Boas vindas!</h1>
          <span className="text-body-md text-gray-200">
            Faça seu login ou acesse como visitante.
          </span>
        </header>

        <section className="mt-10 flex flex-col items-start gap-4">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 py-5 pl-6 text-button-lg"
          >
            <FcGoogle size={32} /> Entrar com Google
          </button>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 py-5 pl-6 text-button-lg"
          >
            <FaGithub size={32} /> Entrar com Github
          </button>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 py-5 pl-6 text-button-lg"
          >
            <PiRocketLaunch size={32} className="text-purple-100" /> Acessar como visitante
          </button>
        </section>
      </div>
    </div>
  )
}
