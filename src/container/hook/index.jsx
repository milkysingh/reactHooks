import React, { useState } from 'react';
import { Button, Input, Container } from 'reactstrap';
const SNIPPETS = [
  {
    id: 1,
    text:
      'He found himself sitting at his computer, typing whatever came to mind. He was on a website entitled 10 fast fingers.'
  },
  {
    id: 2,
    text:
      'The mystery barracks with the saxophone is in a friendly jewel-loving quiz? Hazy dark fog quietly covers Wizard Jon as my lab explodes?'
  }
];
export default function Hook() {
  const [inputVal, inputValSetter] = useState('');
  const [snippet, setSnippet] = useState('');
  const [gameStat, setGameStat] = useState({
    victory: false,
    startTime: null,
    endTime: null,
    start: false
  });
  const [color, setColor] = useState('grey');

  const valueChange = event => {
    let text = event.target.value;
    let position = text.length;
    inputValSetter(text);

    if (text.substring(0, position) === snippet.substring(0, position)) {
      setColor('green');
    } else {
      setColor('red');
    }
    if (text === snippet) {
      setGameStat({
        ...gameStat,
        victory: true,
        endTime: new Date().getTime() - gameStat.startTime
      });
    }
  };

  const setSnippets = snippetIndex => {
    setSnippet(SNIPPETS[snippetIndex].text);
    setGameStat({
      ...gameStat,
      startTime: new Date().getTime(),
      start: true,
      endTime: null,
      victory: false
    });
    inputValSetter('');
  };

  const renderList = SNIPPETS.map((snippet, index) => (
    <Button color='dark' key={snippet.id} onClick={() => setSnippets(index)}>
      {' '}
      {snippet.text.substring(0, 10) + '...'}
    </Button>
  ));

  return (
    <Container>
      <br />
      {gameStat.start ? (
        <>
          <div
            style={{
              border: '1px solid black',
              padding: '20px',
              fontSize: '23px'
            }}
          >
            {snippet}
          </div>
          <h2>Start writing here.</h2>

          <Input
            bsSize='lg'
            type='text'
            value={inputVal}
            onChange={event => valueChange(event)}
            style={{ color: color }}
          />
        </>
      ) : null}
      <br />
      <h4>
        {gameStat.victory
          ? `Done! 🎉 Time: ${gameStat.endTime / 1000}secs`
          : null}
      </h4>
      <hr />

      <h4>Please select one of the following topics to get started..</h4>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {renderList}
      </div>
    </Container>
  );
}
