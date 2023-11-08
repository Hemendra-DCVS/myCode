//create heading with react with javascript
// const heading = React.createElement(
//     "h1",{
//         id : "heading",
//         children: "heading"
//     }
// );
// ReactDOM.createRoot(document.getElementById("root")).render(heading);

//create image with react with javascript
// const myimage = React.createElement(
//     "img",{
//         src : "https://files.codingninjas.in/screenshot-2023-01-27-144924-24649.png"
//     }
// );
// ReactDOM.createRoot(document.getElementById("root")).render(myimage);

// react jsx create element
// const heading = <React.Fragment>
//                 <h1>jsx heading</h1>
//                 <p>this is a paragraph</p>
//                 </React.Fragment> 

// ReactDOM.createRoot(document.getElementById("root")).render(heading);

// create a react component using jsx function
// function App() { return (
//                 <>
//                 <h1>jsx heading</h1>
//                 <p>this is a paragraph</p>
//                 </> 
//                   )
//                 }
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);


// create the react component using jsx arrow function
// const App = () => (
//   <>
//   <h1>jsx heading</h1>
//   <p>this is a paragraph</p>
//   </> 

// )
// const App2 = () => (
//   <>
//   <h1>jsx heading</h1>
//   <p>this is a paragraph</p>
//   </> 

// )
// ReactDOM.createRoot(document.getElementById("root")).render(<><App /> <App2 /></>);


//learning the jsx
// function App() {
//   let name = "John"; // `name` is of type string.
//   let age = 30;      // `age` is of type number.
//   let isActive = "true";
//   let Active = true; // `isActive` is of type boolean.
//                 return (
//                 <>
//                 <h1>jsx heading</h1>
//                 <p>this is a paragraph {name} {age} {isActive}  {String(Active)} {Active}</p>
//                 </> 
//                   )
//                 }

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// sum function jsx
// function App() { 
//   var sum = 1 + 2;
//   var head = <h1>head jsx expression</h1>
//   function renderer(){
//     var a = 10;
//     return a;


//   }
// return (
//                 <>
//                 <h1>heading</h1>
//                 <p>this is a paragraph  {sum} {renderer()} </p>
//                 {head}

//                 </> 
//                   )
//                 }
// ReactDOM.createRoot(document.getElementById("root")).render(<App />);


//working with array and objects
function App() { 
  var sum = [1, 2, 3]
  var array = {key : "value"}
  var arr = ["car1", "car2", "car3", "car4", "car5"]
 
return (
                <>
                <h1>heading</h1>
                <p>this is a paragraph  {sum}  {array.key}</p>
                <ol>
                {arr.map((element) => <li> {element} </li>)}
                </ol>

                </> 
                  )
                }
ReactDOM.createRoot(document.getElementById("root")).render(<App />);



