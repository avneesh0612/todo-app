import "./App.css";

function App() {
  const isMale = true;

  function getGreeting(user) {
    if (user) {
      return <h1>Hello, {user}</h1>;
    } else {
      return <h1>Hello, Stranger</h1>;
    }
  }

  return (
    <div className="app">
      {getGreeting("Avneesh")}
      <h2>You are a {isMale ? "Male" : "Female"}</h2>
    </div>
  );
}

export default App;
