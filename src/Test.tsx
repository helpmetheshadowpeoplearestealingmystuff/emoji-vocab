import { createTheme, Input, Spacer, useTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useState, createContext } from 'react';
import './App.css';
import Twemoji from './Twemoji';

// The top ten emoji used worldwide are 😂 ❤️ 🤣 👍 😭 🙏 😘 🥰 😍 😊
// https://home.unicode.org/emoji/emoji-frequency/
// TODO: implement bloom filter
const items: {emoji: string, synonyms: string[]}[] = [
  {emoji: '👋', synonyms: ['wave']},
  {emoji: '😂', synonyms: ['joy']},
  {emoji: '❤️', synonyms: ['heart']},
  {emoji: '🙏️', synonyms: ['pray']},
  {emoji: '😘️', synonyms: ['kiss']},
  {emoji: '🥰️', synonyms: ['hearts']},
  {emoji: '😍️', synonyms: ['hearteyes']},
  {emoji: '😊️', synonyms: ['smile']},
  {emoji: '👍️', synonyms: ['thumbsup']},
]

function Test({index, setIndex, answers, setAnswers, isEnded}: {index: number, setIndex: React.Dispatch<React.SetStateAction<number>>, answers: string[], setAnswers: React.Dispatch<React.SetStateAction<string[]>>, isEnded: React.Dispatch<React.SetStateAction<boolean>>}) {
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
          pattern="\w+"
          size="xl"
          style={{
            background: "$background",
            color: "$primary",
            fontSize: "$xl",
          }}
          onChange={(e) => {
            if (!e.target.value.match(/\W/)) {
              setAnswer(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
              submitAnswer();
            }
            if (!e.key.match(/[a-zA-Z]/)) {
              e.preventDefault();
            }
          }}
          labelPlaceholder="emoji name"
          color="default" />
        <Spacer y={4} />
      </div>
    </div>
  );
}

export default Test;
