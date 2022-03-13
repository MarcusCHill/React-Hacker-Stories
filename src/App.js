import * as React from "react";

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];


function App() {
  return (
    <div>

      <h1>My Hacker Stories</h1>

      <Search />

      <hr />

      <List />

    </div>
  );
}

function Search (){
  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

function List (){
  return(
    <ul>
      {/*Function creating a list elment for each object in list array*/}
      {list.map((item) =>
          <li key = {item.objectID}>
            <span>
              <a href={item.url} target = "_blank">{item.title}</a>
            </span>
            <span> {item.author} </span>
            <span>{item.num_comments} </span>
            <span>{item.points}</span>
          </li>
      )}
    </ul>
  );
}

export default App;
