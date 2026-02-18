import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { FormField } from '../../components/formField';

const Admin = () => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [textColorInput, setTextColorInput] = useState('#f1f1f1');
  const [bgColorInput, setBgColorInput] = useState('#121212');

  useEffect(() => {
    document.title = 'Admin | ReactLinks';
  });

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl px-4">
        <FormField
          id="name"
          label="Nome"
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <FormField
          id="url"
          type="url"
          label="URL"
          placeholder="Digite a URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section>
          <div>
            <label htmlFor="fundo" className="text-white font-medium mt-2 mb-2">
              Fundo do Link
            </label>
            <input 
              type="color" 
              id="fundo" 
              value={textColorInput}
              onChange={e => setTextColorInput(e.target.value)}
            />
          </div>
        </section>
      </form>
    </div>
  );
};

export default Admin;
