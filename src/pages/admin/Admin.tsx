import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { FormField } from '../../components/formField';

import { FiTrash } from 'react-icons/fi';

import { db } from '../../services/firebaseConnection';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from 'firebase/firestore';

import { FormEvent } from 'react';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  Bg: string;
  color: string;
}

const Admin = () => {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [textColorInput, setTextColorInput] = useState('#f1f1f1');
  const [bgColorInput, setBgColorInput] = useState('#121212');

  const [links, setLinks] = useState<LinkProps[]>([]);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === '' || urlInput === '') {
      alert('Preencha todos os campos!');
      return;
    }

    addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      Bg: bgColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput('');
        setUrlInput('');
        setTextColorInput('#f1f1f1');
        setBgColorInput('#121212');
      })
      .catch((error) => {
        console.log('ERRO AO CADASTRAR' + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, 'links', id);
    await deleteDoc(docRef);
  }

  useEffect(() => {
    document.title = 'Admin | ReactLinks';

    const linksRef = collection(db, 'links');
    const queryRef = query(linksRef, orderBy('created', 'asc'));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          Bg: doc.data().Bg,
          color: doc.data().color,
        });
      });
      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-8 mb-3 w-full max-w-xl px-4"
      >
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

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label htmlFor="fundo" className="text-white font-medium mt-2 mb-2">
              Cor do Link
            </label>
            <input
              className="h-10 w-10"
              type="color"
              id="fundo"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label
              htmlFor="linkBg"
              className="text-white font-medium mt-2 mb-2"
            >
              Fundo do Link
            </label>
            <input
              className="h-10 w-10"
              type="color"
              id="linkBg"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3">
              Veja como está ficando
            </label>
            <article
              className="w-11/12 max-w-xl flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: bgColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      {links.length > 0 && (
        <h2 className=" text-white mb-4 text-2xl">Meus links</h2>
      )}

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-x-xl rounded py-3 px-2 mb-2 select-none mt-3"
          style={{ backgroundColor: link.Bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div>
            <button
              className="p-2 rounded-md bg-black/40 hover:bg-red-500/20 
             transition-all transform hover:scale-110 cursor-pointer"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash
                size={18}
                className="text-red-400 hover:text-red-500 transition-colors"
              />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Admin;
