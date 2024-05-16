import React, { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const imagesData = [
  {
    src: '1.webp',
    title: 'Anna, 21 ani',
    description: 'Studentă, nimfomană, iubește călătoriile și discuțiile lungi'
  },
  {
    src: '2.webp',
    title: 'Maria, 22 ani',
    description: 'Artistă, iubitoare de animale, pasionată de pictură'
  },
  {
    src: '3.webp',
    title: 'Ioana, 28 ani',
    description: 'Asistentă, îi place să ajute și este pasionată de medicină'
  },  
  {
    src: '4.webp',
    title: 'Mariana, 20 ani',
    description: 'Naturistă, îi plac toate animalele, iubește oamenii'
  },    
  // Adaugă mai multe imagini după nevoie
];

const Home = () => {
  const words = [
    'amantă',
    'colegă',
    'șefă',
    'prietenă',
    'concubină',
    'soție',
    'amantă',
    'necunoscută',
    'psiholoagă'
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');

  const handleNextClick = () => {
    setSlideDirection('left');
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((currentImageIndex + 1) % imagesData.length);
      setIsSliding(false);
    }, 500);
  };

  const handlePrevClick = () => {
    setSlideDirection('right');
    setIsSliding(true);
    setTimeout(() => {
      setCurrentImageIndex((currentImageIndex - 1 + imagesData.length) % imagesData.length);
      setIsSliding(false);
    }, 500);
  };

  useEffect(() => {
    if (isScrolling) return;

    if (currentLetterIndex < words[currentWordIndex].length) {
      const timeoutId = setTimeout(() => {
        setCurrentLetterIndex(currentLetterIndex + 1);
      }, 100); // Interval pentru scrierea fiecărei litere
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        setIsScrolling(true);
      }, 3000); // Pauză de 3 secunde după ce cuvântul este scris
      return () => clearTimeout(timeoutId);
    }
  }, [currentLetterIndex, currentWordIndex, isScrolling]);

  useEffect(() => {
    if (isScrolling) {
      const timeoutId = setTimeout(() => {
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
        setCurrentLetterIndex(0);
        setIsScrolling(false);
      }, 1000); // Durata pentru scroll up
      return () => clearTimeout(timeoutId);
    }
  }, [isScrolling]);

  return (
    <>
      <div className="container max-w-screen-xl flex justify-between items-center p-0 md:p-7 m-0 md:mx-auto h-auto lg:h-600">
        <div className="w-full p-4 md:p-0 md:w-1/2 text-center md:text-left overflow-hidden md:overflow-visible">
          <h2 className="font-black text-2xl md:text-4xl">Voi fi pentru tine o</h2>
          <div style={{ height: '110px' }}>
            <h1 className={`p-4 md:p-0 font-black text-6xl md:text-8xl pb-2.5 ${isScrolling ? 'scroll-up' : ''}`}>
              {words[currentWordIndex].slice(0, currentLetterIndex)}
            </h1>
          </div>
          <h3>
            Personalizează-ți propria relație virtuală! Creează-ți o parteneră unică, adaptată perfect dorințelor tale.
            Experimentează conexiuni autentice și interacțiuni realiste pe platforma noastră de fete virtuale personalizabile.
          </h3>
          <button className="bg-red-500 rounded p-1.5 px-2.5 mt-5 hover:bg-red-800">
            Creează-mă acum! <ExpandMoreIcon />
          </button>
        </div>

        <div className="w-1/2 relative hidden md:block">
          <div className="container-girl-front absolute w-full justify-center font-bold z-10 text-center">
            <div className="flex items-center justify-center w-full mt-auto">
              <div className="border rounded p-3 m-2 cursor-pointer" onClick={handlePrevClick}>
                <ArrowBackIosIcon />
              </div>
              <div className="border rounded p-3 bg-black">
                {imagesData[currentImageIndex].title}
              </div>
              <div className="border rounded p-3 m-2 cursor-pointer" onClick={handleNextClick}>
                <ArrowForwardIosIcon />
              </div>
            </div>
            <p className="font-thin w-1/2 m-auto">{imagesData[currentImageIndex].description}</p>
          </div>
          <div className="min-w-60 h-96 rounded">
            <img
              style={{ mixBlendMode: 'lighten' }}
              className={`girl-front ${isSliding ? (slideDirection === 'left' ? 'slide-out-left' : 'slide-out-right') : (slideDirection === 'left' ? 'slide-in-right' : 'slide-in-left')}`}
              src={imagesData[currentImageIndex].src}
              alt={imagesData[currentImageIndex].title}
            />
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '600px', background: 'black', position: 'relative' }}></div>
    </>
  );
};

export default Home;