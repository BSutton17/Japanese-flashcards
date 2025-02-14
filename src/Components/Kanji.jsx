import { useEffect, useState } from "react";
import kanji from './Kanji.json';
import "../App.css";
import HealthBar from "./Healthbar";
import { useKanjiContext } from "./Context";

function Kanji() {
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
      words = [...kanji]; // Reset availableWords if empty
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
    let wordArrR = [selectedWord.Reading];
    let wordArrM = [selectedWord.Meaning];

    let falseWordOne, falseWordTwo, falseWordThree;

    do {
      falseWordOne = kanji[Math.floor(Math.random() * kanji.length)];
    } while (falseWordOne.Kanji === selectedWord.Kanji || falseWordOne.Kanji === "");

    do {
      falseWordTwo = kanji[Math.floor(Math.random() * kanji.length)];
    } while (
      falseWordTwo.Kanji === selectedWord.Kanji || falseWordTwo.Kanji === "" ||
      falseWordTwo.Kanji === falseWordOne.Kanji
    );

    do {
      falseWordThree = kanji[Math.floor(Math.random() * kanji.length)];
    } while (
      falseWordThree.Kanji === selectedWord.Kanji || falseWordThree.Kanji === "" ||
      falseWordThree.Kanji === falseWordOne.Kanji ||
      falseWordThree.Kanji === falseWordTwo.Kanji
    );

    wordArrR.push(falseWordOne.Reading, falseWordTwo.Reading, falseWordThree.Reading);
    wordArrM.push(falseWordOne.Meaning, falseWordTwo.Meaning, falseWordThree.Meaning);
    setFalseWords([falseWordOne, falseWordTwo, falseWordThree]);
    shuffle(wordArrR);
    setShuffledReadingWords(wordArrR);
    shuffle(wordArrM);
    setShuffledMeaningWords(wordArrM);
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
      if (word === currentWord.Reading) {
        setMode(false);
      }
    } else {
      if (word === currentWord.Meaning) {
        setMode(true);
        getRandomWord();
        setCurrentHealth((prev) => Math.min(prev + 1, kanji.length * 3)); // Increment health, ensuring it doesn't exceed max health
      } else {
        setCelebration("Incorrect! Try again.");
      }
    }
  };

  return (
    <>
      {currentWord && <h2 className="main-word">{currentWord.Kanji}</h2>}

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

export default Kanji;
