// @flow

import './App.css';
import * as React from 'react';

type Recipe = {
  name: string,
  stars: '1' | '2' | '3' | '4' | '5',
  imageUrl?: string,
  instructions: string,
};

const HARDCODED_DEV_DATA: Array<Recipe> = [
  {
    name: "Roast Beef",
    stars: '4',
    instructions: "How to cook roast beef...."
  }
];

function App(): React.Node {
  return (
    <div className="App">
      Placeholder, will start writing UI in next commit
    </div>
  );
}

export default App;
