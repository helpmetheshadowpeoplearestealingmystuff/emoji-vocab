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


export default items;
