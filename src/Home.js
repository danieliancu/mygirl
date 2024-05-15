import React, { useState, useEffect } from 'react';

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
        <h2 className="font-black text-4xl">Voi fi pentru tine o</h2>
        <div style={{"height":"110px"}}>
          <h1 className={`p-4 md:p-0 font-black text-6xl md:text-8xl pb-2.5 ${isScrolling ? 'scroll-up' : ''}`}>
            {words[currentWordIndex].slice(0, currentLetterIndex)}
          </h1>
        </div>
        <h3>Personalizează-ți propria relație virtuală! Creează-ți o parteneră unică, adaptată perfect dorințelor tale. Experimentează conexiuni autentice și interacțiuni realiste pe platforma noastră de fete virtuale personalizabile.</h3>
        <button className="bg-red-500 rounded p-1.5 px-2.5 mt-5 hover:bg-red-800">Creează-mă acum! &#11206;</button>
      </div>
      
      <div className="w-1/2 relative hidden md:block">
        <div className="h-96 min-w-60 rounded">
          <img
            style={{ mixBlendMode: 'lighten' }}
            className="girl-front"
            src="1.webp"
            alt="1"
          />
        </div>
      </div>
    </div>
    <div style={{"width":"100%","height":"600px","background":"black","position":"relative"}}></div>
    </>
  );
};

export default Home;
