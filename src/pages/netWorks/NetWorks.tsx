import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { db } from '../../services/firebaseConnection';

import { setDoc, doc, getDoc } from 'firebase/firestore';

const NetWorks = () => {
  const [whatsApp, setWhatsApp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (whatsApp === '' || instagram === '' || linkedin === '') {
      alert('Preencha todos os campos!');
      return;
    }

    setDoc(doc(db, 'social', 'link'), {
      whatsapp: whatsApp,
      instagram: instagram,
      linkedin: linkedin,
    })
      .then(() => {
        console.log('Redes sociais salvas com sucesso!');
      })
      .catch((error) => {
        console.log('Erro ao salvar redes sociais: ' + error);
      });
  }

  useEffect(() => {
    document.title = 'NetWorks | ReactLinks';
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl mt-8 font-medium mb-4">
        Minhas Redes Sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label htmlFor="whatsApp" className="text-white font-medium mt-2 mb-2">
          Link do WhatsApp
        </label>
        <Input
          placeholder="Digite a url do whatsApp..."
          type="url"
          id="whatsApp"
          value={whatsApp}
          onChange={(e) => setWhatsApp(e.target.value)}
        />

        <label htmlFor="linkdIn" className="text-white font-medium mt-2 mb-2">
          Link do LinkdIn
        </label>
        <Input
          placeholder="Digite a url do LinkdIn..."
          type="url"
          id="linkdIn"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <label htmlFor="instagran" className="text-white font-medium mt-2 mb-2">
          Link do instagran
        </label>
        <Input
          placeholder="Digite a url do instagran..."
          type="url"
          id="instagran"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium mt-4"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
};

export default NetWorks;
