import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';
import Router from './components/Router';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Localbase from 'localbase';
import { useIndexedDB } from 'react-indexed-db';

// let db = new Localbase('db');
let apiUrl = 'http://localhost:3002/api';
let setWordCategories = async () => {
  if (!sessionStorage.getItem('wordCategories')) {
    let response = await axios.get('/data/wordsbytopics.json');
    sessionStorage.setItem('wordCategories', JSON.stringify(response.data));
  }
};

let setphrasesCategories = async () => {
  if (!sessionStorage.getItem('phrasesCategories')) {
    let response = await axios.get('/data/phrasesbytopics.json');
    sessionStorage.setItem('phrasesCategories', JSON.stringify(response.data));
  }
};

let setGrammar = async () => {
  if (!sessionStorage.getItem('grammarCategories')) {
    let response = await axios.get('/data/grammarCategories.json');
    sessionStorage.setItem('grammarCategories', JSON.stringify(response.data));
  }
};
let setFavWords = async () => {
  // let apiUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let response = await axios(apiUrl + '/users/me');
  sessionStorage.setItem('fav_words', JSON.stringify(response.data.fav_words));
};
const App = () => {
  const [status, setStatus] = useState(false);
  const { add: add1, getAll: getAll1 } = useIndexedDB('en2fa');
  const { add: add2, getAll: getAll2 } = useIndexedDB('fa2en');
  const { add: add3, getAll: getAll3 } = useIndexedDB('en2faAllWords');
  const { add: add4, getAll: getAll4 } = useIndexedDB('fa2enAllWords');

  let setEn2faWords = async () => {
    let wordsindb = await getAll1();
    if (!wordsindb.length) {
      await axios('/data/en2fa.json').then(async function (response) {
        await add1({ en2fa: response.data })
          .then((d) => {
            console.log('added', d);
          })
          .catch((ex) => {
            console.log(ex);
          });
        await add3({
          en2faAllWords: response.data
            .map((en2faWord) => en2faWord.English.trim())
            .filter((word, index, self) => word.length > 0 && self.indexOf(word) === index)
            .sort((a, b) => a.localeCompare(b)),
        })
          .then((d) => {
            console.log('added', d);
          })
          .catch((ex) => {
            console.log(ex);
          });
        setStatus(true);
      });
      // let wordsindb = await db.collection('en2fa').get();
      // if (!wordsindb.length) {
      //   await axios('/data/en2fa.json').then(function (response) {
      //     db.collection('en2fa').set([
      //       {
      //         en2fa: response.data,
      //         en2faAll: response.data
      //           .map((en2faWord) => en2faWord.English.trim())
      //           .filter((word, index, self) => word.length > 0 && self.indexOf(word) === index)
      //           .sort((a, b) => a.localeCompare(b)),
      //       },
      //     ]);
      //     setStatus(true);
      //   });
    } else {
      setStatus(true);
    }
    // .then(() => {
    // if ('storage' in navigator && 'estimate' in navigator.storage) {
    //   navigator.storage.estimate().then(({ usage, quota }) => {
    //     console.log(`Using ${usage} out of ${quota} bytes.`);
    //   });
    // }
    // });
  };

  let setFa2enWords = async () => {
    let wordsindb = await getAll2();

    if (!wordsindb.length) {
      await axios('/data/fa2en.json').then(async function (response) {
        await add2({ fa2en: response.data })
          .then((d) => {
            console.log('added', d);
          })
          .catch((ex) => {
            console.log(ex);
          });
        await add4({
          fa2enAllWords: response.data
            .map((fa2enWord) => fa2enWord.English.trim())
            .filter((word, index, self) => word.length > 0 && self.indexOf(word) === index)
            .sort((a, b) => a.localeCompare(b)),
        })
          .then((d) => {
            console.log('added', d);
          })
          .catch((ex) => {
            console.log(ex);
          });
        setStatus(true);
      });
      // let wordsindb = await db.collection('fa2en').get();
      // if (!wordsindb.length) {
      //   await axios('/data/fa2en.json').then(function (response) {
      //     db.collection('fa2en').set([
      //       {
      //         fa2en: response.data,
      //         fa2enAll: response.data
      //           .map((fa2enWord) => fa2enWord.Lang.trim())
      //           .filter((word, index, self) => word.length > 0 && self.indexOf(word) === index)
      //           .sort((a, b) => a.localeCompare(b)),
      //       },
      //     ]);
      //     setStatus(true);
      //   });
      // .then(() => {
      // });
    } else {
      setStatus(true);
    }
  };

  useEffect(() => {
    setWordCategories();
    setphrasesCategories();
    setGrammar();
    setEn2faWords();
    setFa2enWords();
    setFavWords();
  }, []);

  return status ? (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </div>
  ) : (
    <div className="loading">
      <div className="container">
        <div className="spinner">
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
