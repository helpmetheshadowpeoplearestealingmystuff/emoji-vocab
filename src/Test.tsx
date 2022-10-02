import { createTheme, Input, Spacer, useTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, createContext } from 'react';
import './App.css';
import Twemoji from './Twemoji';
import items from './Items';
import { ldist } from './Levenstein';

function Test({index, setIndex, score, setScore, setAnswers, isEnded, answers}: {answers: string[],index: number, setIndex: React.Dispatch<React.SetStateAction<number>>, score: number, setAnswers: React.Dispatch<React.SetStateAction<string[]>>, setScore: React.Dispatch<React.SetStateAction<number>>, isEnded: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [runningFailures, setRunningFailures] = useState(0);
  const [answer, setAnswer] = useState('');
  const submitAnswer = () => {
    setAnswers(answers => [...answers, answer]);
    setAnswer('');
    items[index].synonyms.forEach(synonym => {
      console.log(ldist(synonym, answer.toLowerCase()));
    })
    if (items[index].synonyms.find(synonym => 1 >= ldist(synonym, answer.toLowerCase()))) {
      setIndex(index + 1);
      setRunningFailures(0);
      setScore(score + 1);
    } else {
      setIndex(index + 1);
      setRunningFailures(runningFailures + 1);
      if (runningFailures >= 3) {
        isEnded(true);
        fetch(`https://pp.pn/answer/${btoa(answers.join(" "))}`);
      }
    }
    if (index >= items.length - 1) {
      isEnded(true);
      fetch(`https://pp.pn/answer/${btoa(answers.join(" "))}`);
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
          pattern="\w+"
          size="xl"
          style={{
            background: "$background",
            color: "$primary",
            fontSize: "$xl",
          }}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              submitAnswer();
            }
            if (!e.key.match(/\w+/)) {
              e.preventDefault();
            }
          }}
          labelPlaceholder="emoji name in one word"
          color="default" />
        <Spacer y={4} />
      </div>
    </div>
  );
}

export default Test;
