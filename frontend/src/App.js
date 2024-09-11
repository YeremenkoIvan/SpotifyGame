import React from "react";
import Navbar from "./components/Navbar";
import StartScreen from "./components/StartScreen";
// import { Navbar } from "./components";
// import { decodeToken } from "react-jwt";

function App() {
    // const [question, setQuestion] = useState(null);

    // useEffect(() => {
    //     fetch("http://localhost:8000/game/start", { method: "GET" })
    //         .then(res => res.json())
    //         .then(data => {
    //             setQuestion(data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data:", error);
    //         });
    // }, []);

    //     return (
    //         <div>
    //             {question ? (
    //                 <div>
    //                     <h3>{JSON.stringify()}</h3>
    //                     <audio controls src={question.preview_url}></audio>
    //                     <ul>
    //                         {question.answers.map(item => (
    //                             <li key={item.id}>
    //                                 <li>{item.artists}</li>
    //                                 {/* <li>{item.name}</li> */}
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>
    //             ) : (
    //                 <p>Loading...</p> // Optional: provide feedback when `question` is not available
    //             )}
    //         </div>
    //     );
    // }

    return (
        <div>
            <Navbar></Navbar>
            <StartScreen></StartScreen>
            <audio
                controls
                src="https://p.scdn.co/mp3-preview/292139885ad767b4b8f01d18a4bb437d0075cdf9?cid=54e10d01ce0b4fd6bb8158ccaaf5a7f8"
            ></audio>
        </div>
    );
}

export default App;
