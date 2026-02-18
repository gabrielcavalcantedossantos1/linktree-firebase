import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Social } from '../../components/social';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | ReactLinks';
  })

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">
        pagina Home
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform duration-300 hover:scale-105">
          <a href="#">
            <p className="text-base md:text-lg">canal do youtube</p>
          </a>
        </section>

        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://www.linkedin.com/in/gabrielc-dev/">
            <FaLinkedin size={35} color="#0084ff" />
          </Social>

          <Social url="https://www.instagram.com/gabriel__cds/">
            <FaInstagram size={35} color="#E1306C
" />
          </Social>

          <Social url="https://wa.me/62994221836">
            <FaWhatsapp size={35} color="#03970f" />
          </Social>
        </footer>
      </main>
    </div>
  );
};

export default Home;
