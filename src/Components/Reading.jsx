import { useEffect, useState } from "react";
import kanji from "./Kanji.json";
import "../App.css";
import HealthBar from "./Healthbar";
import { useKanjiContext } from "./Context";

function Reading() {
  const [currentWord, setCurrentWord] = useState();
  const [falseWords, setFalseWords] = useState([]);
  const [shuffledReadingWords, setShuffledReadingWords] = useState([]);
  const [shuffledMeaningWords, setShuffledMeaningWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [mode, setMode] = useState(true);
  const { currentHealth, setCurrentHealth } = useKanjiContext(); 

  const getRandomWord = () => {
    let words = availableWords;

    if (words.length === 0) {
      words = [...kanji]; 
      setAvailableWords(words);
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex];

    setAvailableWords((prevWords) => prevWords.filter((_, index) => index !== randomIndex));
    setCurrentWord(newWord);

    setTimeout(() => generateFalseWords(newWord), 0);
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const generateFalseWords = (selectedWord) => {
    let wordArrK = [selectedWord.Kanji];
    let wordArrR = [selectedWord.Meaning];

    let falseWordOne, falseWordTwo, falseWordThree;

    do {
      falseWordOne = kanji[Math.floor(Math.random() * kanji.length)];
    } while (falseWordOne.Reading === selectedWord.Reading || falseWordOne.Reading === "");

    do {
      falseWordTwo = kanji[Math.floor(Math.random() * kanji.length)];
    } while (
      falseWordTwo.Reading === selectedWord.Reading || falseWordTwo.Reading === "" ||
      falseWordTwo.Reading === falseWordOne.Reading
    );

    do {
      falseWordThree = kanji[Math.floor(Math.random() * kanji.length)];
    } while (
      falseWordThree.Reading === selectedWord.Reading || falseWordThree.Reading === "" ||
      falseWordThree.Reading === falseWordOne.Reading ||
      falseWordThree.Reading === falseWordTwo.Reading
    );

    wordArrK.push(falseWordOne.Kanji, falseWordTwo.Kanji, falseWordThree.Kanji);
    wordArrR.push(falseWordOne.Meaning, falseWordTwo.Meaning, falseWordThree.Meaning);
    setFalseWords([falseWordOne, falseWordTwo, falseWordThree]);
    shuffle(wordArrK);
    setShuffledReadingWords(wordArrK);
    shuffle(wordArrR);
    setShuffledMeaningWords(wordArrR);
  };

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  const checkCorrectAnswer = (word) => {
    if (!currentWord) return;

    if (mode) {
      if (word === currentWord.Kanji) {
        setMode(false);
      }
    } else {
      if (word === currentWord.Meaning) {
        setMode(true);
        getRandomWord();
        setCurrentHealth((prev) => Math.min(prev + 1, kanji.length * 3)); 
      } else {
        setCelebration("Incorrect! Try again.");
      }
    }
  };

  return (
    <>
      {currentWord && <h2 className="main-word">{currentWord.Reading}</h2>}

      {mode && shuffledReadingWords.length > 0 ? (
        <div className="choices-wrapper">
          {shuffledReadingWords.map((word, index) => (
            <button className="choice" onClick={() => checkCorrectAnswer(word)} key={index}>{word}</button>
          ))}
        </div>
      ) : (
        <div className="choices-wrapper">
          {shuffledMeaningWords.map((word, index) => (
            <button className="choice" onClick={() => checkCorrectAnswer(word)} key={index}>{word}</button>
          ))}
        </div>
      )}
    </>
  );
}

export default Reading;
