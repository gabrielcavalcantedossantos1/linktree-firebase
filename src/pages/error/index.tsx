import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div className='flex flex-col w-full justify-center items-center text-white min-h-screen'>
      <h1 className='font-bold text-4xl mb-4 text-red-500'>Error 404</h1>
      <h2 className='font-bold text-4xl mb-4'>Página nao encontrada</h2>
      <p className='italic text-xl mb-4'>Você caiu em uma página inexistente.</p>

      <Link className='bg-gray-50/20 py-1 px-4 rounded-md' to="/">Voltar para Home</Link>
    </div>
  );
}
