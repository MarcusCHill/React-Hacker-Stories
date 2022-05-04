import * as React from "react";

const initialStories = [
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
  }
];


const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
 );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {

  const [searchTerm, setSearchTerm] = useStorageState("search","React");

  const [stories, setStories] = React.useState(initialStories)

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch} >
        <strong>Search:</strong>
      </InputWithLabel>
      <hr/>
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

const InputWithLabel = ({ id, value, type="text", onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  }, [isFocused]);

  return(
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        id={id}
        ref={inputRef}
        value={value}
        type={type}
        autoFocus
        onChange={onInputChange}
      />
    </>
  );
};

// function Search (props) {
//   return(
//     <>
//       <label htmlFor="search">Search: </label>
//       <input id="search" type="text" onChange={props.onSearch} value={props.search}/>
//       <p>Searching for <strong>{props.search}</strong></p>
//     </>
//   );
// };

function List ({ list, onRemoveItem }){
  return(
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span> {item.author}</span>
      <span> Comments: {item.num_comments}</span>
      <span> Points: {item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>X</button>
      </span>
    </li>
);

export default App;
