import { FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Social } from '../../components/social';
import { useEffect, useState } from 'react';

import { db } from '../../services/firebaseConnection';
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from 'firebase/firestore';
import { link } from 'fs';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SociaslLinks {
  linkdin: string;
  instagram: string;
  whatsapp: string;
}

const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SociaslLinks | null>(null);

  useEffect(() => {
    document.title = 'Home | ReactLinks';

    function loadLinks() {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('created', 'asc'));

      getDocs(queryRef).then((snapshot) => {
        let lista = [] as LinkProps[];

        snapshot.forEach((doc) => {
          const data = doc.data();
          lista.push({
            id: doc.id,
            name: data.name,
            url: data.url,
            bg: data.Bg,
            color: data.color,
          });
        });

        setLinks(lista);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, 'social', 'link');
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as SociaslLinks;
          setSocialLinks({
            linkdin: data.linkdin,
            instagram: data.instagram,
            whatsapp: data.whatsapp,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">
        pagina Home
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links &&
          links.map((link) => (
            <section
              className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform duration-300 hover:scale-105"
              key={link.id}
              style={{ backgroundColor: link.bg }}
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <p
                  className="text-base md:text-lg"
                  style={{ color: link.color }}
                >
                  {link.name}
                </p>
              </a>
            </section>
          ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url="https://www.linkedin.com/in/gabrielc-dev/">
              <FaLinkedin size={35} color="#0084ff" />
            </Social>

            <Social url="https://www.instagram.com/gabriel__cds/">
              <FaInstagram
                size={35}
                color="#E1306C
"
              />
            </Social>

            <Social url="https://wa.me/62994221836">
              <FaWhatsapp size={35} color="#03970f" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
};

export default Home;
