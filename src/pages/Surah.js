import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Card from '../components/Card';
import Hero from '../components/Hero';
import Loading from '../components/Loading';
import CONSTANTS from '../data/constants';
import ApiService from '../services/api';

const Surah = () => {
  const [allSurah, setAllSurah] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filteredSurah, setFilteredSurah] = useState(allSurah);
  const [query, setQuery] = useState('');

  useEffect(() => {
    (async function getAllSurah() {
      const response = await ApiService.getAllSurahs();
      if (response.data) {
        setAllSurah(response.data);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    }());
  }, []);

  useEffect(() => {
    const filter = allSurah.filter(
      (surah) => surah.name.transliteration.id.toLowerCase().replace(/[\W_]+/g, '').includes(query.toLowerCase().replace(/[\W_]+/g, '')),
    );
    setFilteredSurah(filter);
  }, [allSurah, query]);

  const handleFilter = (event) => {
    const userInput = event.target.value;
    setQuery(userInput);
  };

  return (
    <App>
      <Hero>
        <h2 className="text-lg font-bold text-white">Daftar Surat Dalam Al-Quran</h2>
      </Hero>
      <div className="my-4">
        <input type="text" onInput={handleFilter} className="border-gray-500 border-2 h-10 rounded-md px-3 py-1 bg-white w-full  transition duration-300 focus:border-teal-700 focus:outline-none" placeholder="Surat apa yang ingin Anda baca hari ini?" />
      </div>
      {!isLoading && (
        <>
          {filteredSurah.map((surah) => (
            <Card key={surah.number}>
              <Link to={`./surah/${surah.number}`} className="w-full flex justify-between items-start">
                <span className="bg-teal-700 text-white inline-block py-1 px-2 rounded-lg mr-3 text-sm">{surah.number}</span>
                <div className="text-right">
                  <span className="block text-arabic text-black text-2xl" dir="rtl" lang="ar">{surah.name.short}</span>
                  <span className="block">{surah.name.transliteration.id}</span>
                  <span className="block text-gray-700 text-sm">
                    {surah.name.translation.id}
                    {' - '}
                    {surah.numberOfVerses}
                    {' ayat '}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
          {!filteredSurah.length && !isError && (
            <span className="my-3 block text-center">Surat tidak ditemukan...</span>
          )}
          {isError && (
            <span className="text-center block my-5">{CONSTANTS.ERROR_MESSAGE}</span>
          )}
        </>
      )}
      {isLoading && <Loading />}
    </App>
  );
};

export default Surah;
