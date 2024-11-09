import { useState } from "react";
import './EnterScreen.css'

function EnterScreen(props : any) {

    const [inputId, setInputId] = useState("");
    const handleChange = (e:any) => setInputId(e.target.value);

    return (
        <>
            <div id="enterScreenComponentDiv">
                {props.screen == "startOrJoinGame" &&
                    <div id="startOrJoinGameDiv">
                        <button onClick={() => props.createGameIdAndChangeScreen()} >Start new game</button>
                        <br /><br />
                        <input type="text" placeholder="ID for game to join" onChange={handleChange}/>
                        <button onClick={()=> props.joinGame(inputId)}>Join game</button>
                    </div>
                }

                {props.screen == "waitingForPlayer" &&
                    <div id="waitingForPlayerDiv">
                        <p>Skicka din vän detta ID för spelet och vänta tills den joinar, spelet börjar automatiskt när den joinat...</p>
                        <p>ID : {props.idForGame.current}</p>
                        
                    </div>
                }

            </div>

        </>
    );
  }

  export default EnterScreen