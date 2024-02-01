
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProRate from './components/ProRate';
import RentCalculator from './components/RentCalculator';
import {useState} from "react";
function App() {

        const [activeTool, setActiveTool] = useState(<RentCalculator />);

        const handleToolChange = (e) => {
            if (e.target.value === "rentCalculator") {
                setActiveTool(<RentCalculator />);
            } else if (e.target.value === "proRate") {
                setActiveTool(<ProRate />);
            }
        }

  return (
    <div className="App">


            <Header props={{handleToolChange:handleToolChange}} />
            {activeTool}





    </div>
  );
}

export default App;
