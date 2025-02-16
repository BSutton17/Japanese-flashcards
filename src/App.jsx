import { useEffect, useState } from "react";
import "./App.css";
import kanji from "./Components/kanji.json";
import HealthBar from "./Components/Healthbar";
import Kanji from "./Components/Kanji";
import Reading from "./Components/Reading";
import Meaning from "./Components/Meaning";
import { useKanjiContext } from "./Components/Context";

function App() {
  const { currentHealth, setCurrentHealth } = useKanjiContext(); 
  const maxHealth = (kanji.length * 3) - 3; 
  const oneThird = maxHealth / 3; 
  if(currentHealth > maxHealth){
    setCurrentHealth(0);
  }

  return (
    <>
      <HealthBar currentHealth={currentHealth} maxHealth={maxHealth} />

      {currentHealth <= oneThird ? (
        <Kanji /> 
      ) : currentHealth > oneThird && currentHealth <= 2 * oneThird ? (
        <Reading /> 
      ) : (
        <Meaning /> 
      )}
    </>
  );
}

export default App;
