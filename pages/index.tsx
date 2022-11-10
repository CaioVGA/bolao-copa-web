import Image from 'next/image';
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent) {
    event.preventDefault()
    try{
      const response = await api.post('pools', {
        title: poolTitle,
      });

      const { code } = response.data

      await navigator.clipboard.writeText(code)
      alert(`Bolão criado com sucesso. O seu código é: ${code} (seu código foi copiado para a área de tranferência)`)
      setPoolTitle('')
    } catch (err) {
        console.log(err)
        alert('Falha ao tentar criar o bolão, tente novamente!')
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={ logoImg } alt="Logo da aplicação" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da Copa do Mundo!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={ usersAvatarExampleImg } alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-softgreen-500">+{props.usersCount}</span> usuários fazendo suas apostas
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2 text-gray-100">
          <input 
            className="flex-1 px-6 py-4 rounded bg-gray-800 border-gray-600 text-sm"
            type="text" 
            required placeholder="Insira o nome do seu bolão"
            onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button type="submit" className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700 hover:underline">
            Criar o meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar o seu bolão, você receberá um código único que poderá usar para convidar seus amigos.
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={ iconCheckImg } alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={ iconCheckImg } alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>

      <Image 
        src={ appPreviewImg } 
        alt="Dois celulares exibindo a prévia da tela de aplicação móvel"
        quality={100}
      />
    </div>
  )
}
  
export const getServerSideProps = async () => {
  
  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    }
  }
}