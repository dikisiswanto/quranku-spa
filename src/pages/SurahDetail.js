import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import App from '../App';
import Card from '../components/Card';
import Loading from '../components/Loading';
import CONSTANTS from '../data/constants';
import ApiService from '../services/api';

const SurahDetail = () => {
  const [surah, setSurah] = useState({});
  const [previousSurah, setPreviousSurah] = useState({});
  const [nextSurah, setNextSurah] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isBackTop, setIsBackTop] = useState(false);
  const { surahNumber } = useParams();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearState = () => {
    setIsLoading(true);
    setPreviousSurah(false);
    setNextSurah(false);
    setSurah({});
  };

  const scrollToVerse = (event) => {
    const { value } = event.target;
    const refElement = `verse-${value}`;
    const element = document.getElementById(refElement);

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? 'smooth' : 'auto',
        top: element ? element.offsetTop : 0,
      });
    }, 100);
  };

  useEffect(() => {
    clearState();
    const surahIndex = parseInt(surahNumber, 10);
    (async function getDetailSurah() {
      const current = await ApiService.getSurah(surahIndex);
      if (current.data) {
        setSurah(current.data);
      } else {
        setIsError(true);
      }
      const previous = await ApiService.getSurah(surahIndex - 1);
      if (previous.data) {
        setPreviousSurah(previous.data);
      }
      const next = await ApiService.getSurah(surahIndex + 1);
      if (next.data) {
        setNextSurah(next.data);
      }
      setIsLoading(false);
    }());
    return () => clearState();
  }, [surahNumber]);

  useEffect(() => {
    const handleScroll = (event) => {
      const fromTop = event.target.documentElement.scrollTop;
      if (fromTop > 450) {
        setIsBackTop(true);
      } else {
        setIsBackTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <App>
      {!isLoading && !isError && (
        <>
          <div className="bg-white py-3 rounded px-3 fixed left-0 right-0 top-0 z-20 text-center">
            <div className="container grid grid-cols-2 items-center">
              <Link to="/surah" className="col-start-auto col-end-1">
                <svg viewBox="0 0 512 512" width="24px" height="24px"><path d="M427 234.625H167.296l119.702-119.702L256 85 85 256l171 171 29.922-29.924-118.626-119.701H427v-42.75z" /></svg>
              </Link>
              <span className="text-xl text-gray-700 font-semibold col-start-1 col-end-3">
                {surah.number}
                {' : '}
                {surah.name.transliteration.id}
              </span>
            </div>
          </div>
          <div className="flex flex-col text-center mt-5 mb-1">
            <span className="text-arabic text-2xl text-gray-900 font-semibold" dir="rtl" lang="ar">{surah.name.long}</span>
            <span className="my-2 text-gray-800">
              {'( '}
              {surah.name.transliteration.id}
              {' - '}
              {surah.name.translation.id}
              {' )'}
            </span>
            <span className="text-gray-800">
              {surah.numberOfVerses}
              {' ayat '}
            </span>
          </div>
          <Card>
            <span className="text-gray-800">{surah.tafsir.id}</span>
          </Card>

          <section className="mb-10">
            {surah.verses.map((verse) => (
              <Card key={verse.number.inSurah}>
                <div className="w-full flex" id={`verse-${verse.number.inSurah}`}>
                  <span className="text-gray-800 inline-block py-1 px-2 mr-2">{verse.number.inSurah}</span>
                  <div className="mt-3 w-full">
                    <span className="block text-arabic text-black text-2xl py-1 px-2" dir="rtl" lang="ar">{verse.text.arab}</span>
                    <span className="block text-gray-700 py-1 px-2 text-left">{verse.translation.id}</span>
                  </div>
                </div>
              </Card>
            ))}

            <div className="sticky bottom-5 grid grid-cols-3 bg-teal-700 rounded-lg py-2 text-white my-3 mx-4 place-items-center justify-items-stretch shadow-md">
              {previousSurah.number && (
                <Link to={`/surah/${previousSurah.number}`} className="text-left py-1 px-2 flex items-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  <span className="hidden md:inline md:ml-2">{previousSurah.name.transliteration.id}</span>
                </Link>
              )}

              <select className="col-start-2 text-center text-center text-gray-700 inline-block w-auto bg-gray-200" onChange={scrollToVerse}>
                {surah.verses.map(({ number: verseNumber }) => (
                  <option value={verseNumber.inSurah} key={verseNumber.inSurah}>
                    {verseNumber.inSurah}
                  </option>
                ))}
              </select>

              {nextSurah.number && (
                <Link to={`/surah/${nextSurah.number}`} className="col-start-4 text-right py-1 px-2 flex justify-end items-center">
                  <span className="hidden md:inline md:mr-2">{nextSurah.name.transliteration.id}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              )}
            </div>
          </section>

          <button type="button" className={`fixed bottom-0 right-0 mr-6 mb-16 rounded-full shadow-lg bg-teal-500 text-white cursor-pointer p-2 transition duration-300 ${!isBackTop && 'invisible opacity-0'}`} onClick={handleScrollToTop} aria-label="Scroll to top">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </>
      )}
      {isError && (
        <span className="text-center block my-3">{CONSTANTS.ERROR_MESSAGE}</span>
      )}
      {isLoading && <Loading />}
    </App>
  );
};

export default SurahDetail;
