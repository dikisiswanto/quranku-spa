import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import App from '../App';
import Hero from '../components/Hero';
import ApiService from '../services/api';
import CONSTANTS from '../data/constants';
import Card from '../components/Card';
import Loading from '../components/Loading';

const Home = () => {
  const [topSurahs, setTopSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const filteredSurah = ['Yasin', 'Al-Kahf', 'Al-Mulk', 'Ar-Rahman', 'Al-Waqi\'ah', 'Yusuf'];

  useEffect(() => {
    (async function getTopSurahs() {
      const response = await ApiService.getAllSurahs();
      if (response.data) {
        setTopSurahs(response.data.filter(
          (surah) => filteredSurah.includes(surah.name.transliteration.id),
        ));
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }());
  }, []);

  return (
    <App>
      <Hero>
        <img src={`${process.env.PUBLIC_URL}/Quran-reading.svg`} alt="Reading quran illustration" className="md:w-5/12 md:h-auto h-40 mx-auto" />
      </Hero>

      {!isLoading && (
      <>
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-700 font-bold tracking-wide">Surat Pilihan</h2>
          <Link to="/surah" className="underline text-gray-800">Semua Surat</Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-3 mb-8">
          {topSurahs.map((surah) => (
            <Card key={surah.number}>
              <Link to={`/surah/${surah.number}`} className="text-right w-full">
                <span className="block text-arabic text-black text-2xl" dir="rtl" lang="ar">{surah.name.short}</span>
                <span className="block">{surah.name.transliteration.id}</span>
                <span className="block text-gray-700 text-sm">
                  {surah.name.translation.id}
                  {' - '}
                  {surah.numberOfVerses}
                  {' ayat '}
                </span>
              </Link>
            </Card>
          ))}
        </section>
        {isError && (
        <span className="block text-center">{CONSTANTS.ERROR_MESSAGE}</span>
        )}
      </>
      )}
      {isLoading && (
        <Loading>
          <div className="flex justify-between">
            <Skeleton width={200} height={20} className="rounded-full" />
            <Skeleton width={100} height={20} className="rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-3 mt-2">
            {filteredSurah.map(() => (
              <Skeleton height={135} width="100%" className="mt-4 bg-white rounded" />
            ))}
          </div>
        </Loading>
      )}
    </App>
  );
};

export default Home;
