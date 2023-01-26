import React, {useState, useEffect} from 'react';
import axios from 'axios'


let url = 'http://localhost:5000/'; 


const App = () => {
        let url = 'http://localhost:5000/'; 
        const [data, setData] = useState("");
      
        const subscribeMe = async (event) => {
          const res = await fetch(url);    
          const data = await res.json();
          console.log(data);
          const outputData = data;
          setData(outputData);
        };
        
        return (
          <div className="App">
            <h1>Welcome to EasyByte</h1>
            <h2>Click the Button Below to Retrive Data from a MySQL Database!</h2>
            <button onClick={subscribeMe}>Get Data</button>
            <br />
            <span>
            {" "}
            <div>
                {data === "" ? <h1> </h1> : 
                <div><h3>Here is a list of Students in the Student Table</h3>
                <ol>
                {data.map(name => (
                    <li key={name}>{name['name']}</li>
                ))}
            </ol></div>}
            </div>
            </span>
          </div>
        );

}

export default App;
