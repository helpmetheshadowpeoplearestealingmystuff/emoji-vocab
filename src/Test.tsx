import { createTheme, Input, Spacer, useTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, createContext } from 'react';
import './App.css';
import Twemoji from './Twemoji';
import items from './Items'

function Test({index, setIndex, score, setScore, setAnswers, isEnded}: {index: number, setIndex: React.Dispatch<React.SetStateAction<number>>, score: number, setAnswers: React.Dispatch<React.SetStateAction<string[]>>, setScore: React.Dispatch<React.SetStateAction<number>>, isEnded: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [runningFailures, setRunningFailures] = useState(0);
  const [answer, setAnswer] = useState('');
  /* const handleChange = (e) => {
   *   setAnswer(value);
   * }; */
  const submitAnswer = () => {
    setAnswers(answers => [...answers, answer]);
    setAnswer('');
    if (items[index].synonyms.find(synonym => synonym === answer.toLowerCase())) {
      setIndex(index + 1);
      setRunningFailures(0);
      setScore(score + 1);
    } else {
      setIndex(index + 1);
      setRunningFailures(runningFailures + 1);
      if (runningFailures >= 3) {
        isEnded(true);
      }
    }
    if (index >= items.length - 1) {
      isEnded(true);
    }
  };
  return (
    <div className="App"
         style={{
           background: "$background",
         }}
    >
      <div className="App-content">
        <Twemoji emoji={items[index].emoji} />
        <Spacer y={4} />
        <Input
          value={answer}
          clearable
          bordered
          pattern="[ a-zA-Z]+"
          size="xl"
          style={{
            background: "$background",
            color: "$primary",
            fontSize: "$xl",
          }}
          onChange={(e) => {
            if (e.target.value.match(/[a-bA-Z_]/)) {
              setAnswer(e.target.value);
            } else {
              e.target.classList.add('invalid')
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              submitAnswer();
            }
            if (!e.key.match(/[a-zA-Z_]/)) {
              e.preventDefault();
            }
          }}
          labelPlaceholder="describe emoji in one word"
          color="default" />
        <Spacer y={4} />
      </div>
    </div>
  );
}

export default Test;
