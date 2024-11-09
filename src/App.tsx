import { useEffect, useRef, useState } from 'react'
import './App.css'
import hitGif from './explo.gif';
import warningGif from './warning.webp'
import EnterScreen from './EnterScreen';

import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
function App() {

  // const [playingField, setPlayingField] = useState([
  //   { id: "A1", number : 1, ship:false, canBeUsed:true}, { id: "B1" }, { id: "C1" }, { id: "D1" }, { id: "E1" }, { id: "F1" }, { id: "G1" }, { id: "H1" }, { id: "I1" }, { id: "J1" },
  //   { id: "A2" }, { id: "B2" }, { id: "C2" }, { id: "D2" }, { id: "E2" }, { id: "F2" }, { id: "G2" }, { id: "H2" }, { id: "I2" }, { id: "J2" },
  //   { id: "A3" }, { id: "B3" }, { id: "C3" }, { id: "D3" }, { id: "E3" }, { id: "F3" }, { id: "G3" }, { id: "H3" }, { id: "I3" }, { id: "J3" },
  //   { id: "A4" }, { id: "B4" }, { id: "C4" }, { id: "D4" }, { id: "E4" }, { id: "F4" }, { id: "G4" }, { id: "H4" }, { id: "I4" }, { id: "J4" },
  //   { id: "A5" }, { id: "B5" }, { id: "C5" }, { id: "D5" }, { id: "E5" }, { id: "F5" }, { id: "G5" }, { id: "H5" }, { id: "I5" }, { id: "J5" },
  //   { id: "A6" }, { id: "B6" }, { id: "C6" }, { id: "D6" }, { id: "E6" }, { id: "F6" }, { id: "G6" }, { id: "H6" }, { id: "I6" }, { id: "J6" },
  //   { id: "A7" }, { id: "B7" }, { id: "C7" }, { id: "D7" }, { id: "E7" }, { id: "F7" }, { id: "G7" }, { id: "H7" }, { id: "I7" }, { id: "J7" },
  //   { id: "A8" }, { id: "B8" }, { id: "C8" }, { id: "D8" }, { id: "E8" }, { id: "F8" }, { id: "G8" }, { id: "H8" }, { id: "I8" }, { id: "J8" },
  //   { id: "A9" }, { id: "B9" }, { id: "C9" }, { id: "D9" }, { id: "E9" }, { id: "F9" }, { id: "G9" }, { id: "H9" }, { id: "I9" }, { id: "J9" },
  //   { id: "A10" }, { id: "B10" }, { id: "C10" }, { id: "D10" }, { id: "E10" }, { id: "F10" }, { id: "G10" }, { id: "H10" }, { id: "I10" }, { id: "J10" }
  // ])

  // const shipsArray = Array.from(ships)
  // function dragStart (event:any) {

  // }

  // const [parent, setParent] = useState(null);
  // const draggableMarkup = (
  //   <div id='shipStyle1'>
  //     <Draggable id="ship1" >D</Draggable>
  //     <Draggable id="ship2" >D</Draggable>
  //   </div>

  // );



  const [playingField, setPlayingField] = useState([
    { id: "A1", number: 1, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B1", number: 2, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C1", number: 3, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D1", number: 4, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E1", number: 5, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F1", number: 6, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G1", number: 7, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H1", number: 8, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I1", number: 9, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J1", number: 10, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A2", number: 11, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B2", number: 12, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C2", number: 13, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D2", number: 14, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E2", number: 15, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F2", number: 16, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G2", number: 17, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H2", number: 18, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I2", number: 19, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J2", number: 20, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A3", number: 21, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B3", number: 22, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C3", number: 23, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D3", number: 24, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E3", number: 25, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F3", number: 26, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G3", number: 27, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H3", number: 28, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I3", number: 29, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J3", number: 30, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A4", number: 31, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B4", number: 32, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C4", number: 33, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D4", number: 34, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E4", number: 35, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F4", number: 36, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G4", number: 37, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H4", number: 38, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I4", number: 39, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J4", number: 40, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A5", number: 41, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B5", number: 42, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C5", number: 43, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D5", number: 44, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E5", number: 45, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F5", number: 46, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G5", number: 47, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H5", number: 48, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I5", number: 49, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J5", number: 50, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A6", number: 51, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B6", number: 52, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C6", number: 53, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D6", number: 54, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E6", number: 55, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F6", number: 56, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G6", number: 57, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H6", number: 58, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I6", number: 59, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J6", number: 60, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A7", number: 61, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B7", number: 62, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C7", number: 63, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D7", number: 64, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E7", number: 65, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F7", number: 66, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G7", number: 67, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H7", number: 68, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I7", number: 69, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J7", number: 70, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A8", number: 71, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B8", number: 72, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C8", number: 73, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D8", number: 74, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E8", number: 75, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F8", number: 76, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G8", number: 77, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H8", number: 78, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I8", number: 79, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J8", number: 80, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A9", number: 81, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "B9", number: 82, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C9", number: 83, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D9", number: 84, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E9", number: 85, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F9", number: 86, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G9", number: 87, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H9", number: 88, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I9", number: 89, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J9", number: 90, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A10", number: 91, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "B10", number: 92, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "C10", number: 93, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D10", number: 94, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E10", number: 95, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F10", number: 96, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G10", number: 97, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H10", number: 98, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I10", number: 99, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J10", number: 100, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false}
  ])


  const [theirPlayingField, setTheirPlayingField] = useState([
    { id: "A1", number: 1, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B1", number: 2, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C1", number: 3, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D1", number: 4, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E1", number: 5, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F1", number: 6, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G1", number: 7, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H1", number: 8, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I1", number: 9, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J1", number: 10, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A2", number: 11, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B2", number: 12, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C2", number: 13, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D2", number: 14, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E2", number: 15, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F2", number: 16, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G2", number: 17, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H2", number: 18, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I2", number: 19, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J2", number: 20, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A3", number: 21, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B3", number: 22, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C3", number: 23, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D3", number: 24, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E3", number: 25, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F3", number: 26, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G3", number: 27, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H3", number: 28, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I3", number: 29, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J3", number: 30, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A4", number: 31, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B4", number: 32, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C4", number: 33, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D4", number: 34, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E4", number: 35, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F4", number: 36, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G4", number: 37, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H4", number: 38, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I4", number: 39, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J4", number: 40, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A5", number: 41, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B5", number: 42, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C5", number: 43, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D5", number: 44, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E5", number: 45, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F5", number: 46, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G5", number: 47, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H5", number: 48, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I5", number: 49, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J5", number: 50, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A6", number: 51, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B6", number: 52, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C6", number: 53, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D6", number: 54, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E6", number: 55, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F6", number: 56, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G6", number: 57, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H6", number: 58, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I6", number: 59, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J6", number: 60, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A7", number: 61, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B7", number: 62, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C7", number: 63, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "D7", number: 64, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "E7", number: 65, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "F7", number: 66, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "G7", number: 67, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "H7", number: 68, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "I7", number: 69, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "J7", number: 70, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "A8", number: 71, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "B8", number: 72, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C8", number: 73, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D8", number: 74, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E8", number: 75, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F8", number: 76, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G8", number: 77, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H8", number: 78, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I8", number: 79, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J8", number: 80, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A9", number: 81, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "B9", number: 82, ship: false, canBeUsed: true , style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false},
    { id: "C9", number: 83, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D9", number: 84, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E9", number: 85, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F9", number: 86, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G9", number: 87, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H9", number: 88, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I9", number: 89, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J9", number: 90, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "A10", number: 91, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "B10", number: 92, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "C10", number: 93, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "D10", number: 94, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "E10", number: 95, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "F10", number: 96, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "G10", number: 97, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "H10", number: 98, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "I10", number: 99, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false },
    { id: "J10", number: 100, ship: false, canBeUsed: true, style: {backgroundColor: 'rgb(54, 202, 239, 0.4)' }, hit: false, miss: false}
  ])

  const [screen, setScreen] = useState("startOrJoinGame");
  const amReady = useRef<null | boolean>(null);
  const idForGame = useRef(0);
  const myTurn = useRef<null | boolean>(null)
  const [gameStarted, setGameStarted] = useState(false);
  const canShoot = useRef(false);
  const totalShipParts = useRef(17);
  // const gameOver = useRef(false);

  const ship1: Ship = {
    id: "Carrier",
    length: 5,
    style: { backgroundColor: 'rgb(134, 124, 111)', border: '2px solid black', transform: 'rotate(0deg)' },
    isHorizontal: true,
  }

  const ship2: Ship = {
    id: "Battleship",
    length: 4,
    style: { backgroundColor: 'rgb(101, 77, 45)', border: '2px solid black', transform: 'rotate(0deg)' },
    isHorizontal: true,
  }

  const ship3: Ship = {
    id: "Destroyer",
    length: 3,
    style: { backgroundColor: 'rgb(218, 152, 67)', border: '2px solid black', transform: 'rotate(0deg)' },
    isHorizontal: true,
  }

  const ship4: Ship = {
    id: "Submariner",
    length: 3,
    style: { backgroundColor: 'rgb(35, 45, 158)', border: '2px solid black', transform: 'rotate(0deg)' },
    isHorizontal: true,
  }

  const ship5: Ship = {
    id: "PatrolBoat",
    length: 2,
    style: { backgroundColor: 'rgb(149, 26, 180)', border: '2px solid black', transform: 'rotate(0deg)' },
    isHorizontal: true,
  }

  const [ships, setShips] = useState([ship1, ship2, ship3, ship4, ship5]);



  interface Ship {
    id: string,
    length: number,
    style: { backgroundColor: string, border: string, transform: string },
    isHorizontal: boolean,
  }



  const [chosenShip, setChosenShip] = useState("");

  function changePlayingField(squareNumber: number) {
    if (chosenShip != "") {

      playingField.forEach(square => {
        if (square.number == squareNumber) {
          if (validSquare(squareNumber, chosenShip)) {

            let shipToBePlacedAndRemoved: Ship;

            const newShips = [...ships]
            for (let index = 0; index < newShips.length; index++) {
              if (newShips[index].id == chosenShip) {
                shipToBePlacedAndRemoved = newShips[index];
                newShips.splice(index, 1);
                setShips(newShips);
              }
            }

            if (shipToBePlacedAndRemoved!.isHorizontal == true) {
              for (let index = 0; index < playingField.length; index++) {
                if (playingField[index].number >= squareNumber && playingField[index].number < squareNumber + shipToBePlacedAndRemoved!.length) {
                  playingField[index].style = shipToBePlacedAndRemoved!.style
                  playingField[index].ship = true;
                  playingField[index].canBeUsed = false;
                }
              }
              deactivateSquaresAroundHorizontalShip(squareNumber, shipToBePlacedAndRemoved!)
            }

            if (shipToBePlacedAndRemoved!.isHorizontal == false) {
              const setOfTheSquareNumbersThatWillBeUsed = new Set([squareNumber]);
              
              let indexThatWillCheckAllSquaresThatWillBeUsed = squareNumber;


              for (let index = 1; index < shipToBePlacedAndRemoved!.length; index++) {
                indexThatWillCheckAllSquaresThatWillBeUsed = indexThatWillCheckAllSquaresThatWillBeUsed + 10;
                setOfTheSquareNumbersThatWillBeUsed.add(indexThatWillCheckAllSquaresThatWillBeUsed);
              }

              setOfTheSquareNumbersThatWillBeUsed.forEach((number)=> {
                playingField[number-1].style = shipToBePlacedAndRemoved!.style
                playingField[number-1].ship = true;
                playingField[number-1].canBeUsed = false;
                
              })
              
              switch (shipToBePlacedAndRemoved!.length) {
                case 2: deactivateSquaresAroundVerticalShipWithLength2(squareNumber) ; break;
                case 3: deactivateSquaresAroundVerticalShipWithLength3(squareNumber); break;
                case 4: deactivateSquaresAroundVerticalShipWithLength4(squareNumber); break;
                case 5: deactivateSquaresAroundVerticalShipWithLength5(squareNumber); break;
                default: break;
              }

            }


            const newPlayingField = [...playingField]
            setPlayingField(newPlayingField);

            setChosenShip("");

          } else {

            setInstructions("Du kan inte lägga skeppet där")

          }
        }
      });

    }
  }

  function deactivateSquaresAroundVerticalShipWithLength2(chosenSquareNumber: number) {

    const newPlayingField = [...playingField];

    const setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated = new Set([1, 11, 21, 31, 41, 51, 61, 71, 81, 91])
    const setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

    if (setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-10, -9, 1, 11, 20, 21])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else if (setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-11, -10, -1, 9, 19, 20])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else {
      const indexForSquaresThatWillBeDeactivated = new Set([-11, -10, -9, -1, 1, 9, 11, 19, 20, 21])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });
    }
  }

  function deactivateSquaresAroundVerticalShipWithLength3(chosenSquareNumber: number) {
    const newPlayingField = [...playingField];

    const setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated = new Set([1, 11, 21, 31, 41, 51, 61, 71, 81, 91])
    const setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

    if (setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-10, -9, 1, 11, 21, 30, 31])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else if (setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-11, -10, -1, 9, 19, 29, 30])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else {
      const indexForSquaresThatWillBeDeactivated = new Set([-11,-10,-9,-1,1,9,11,19,21,29,30,31])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });
    }
    
  }

  function deactivateSquaresAroundVerticalShipWithLength4(chosenSquareNumber: number) {
    const newPlayingField = [...playingField];

    const setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated = new Set([1, 11, 21, 31, 41, 51, 61, 71, 81, 91])
    const setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

    if (setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-10, -9, 1, 11, 21, 31, 40, 41])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else if (setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-11, -10, -1, 9, 19, 29, 39, 40])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else {
      const indexForSquaresThatWillBeDeactivated = new Set([-11,-10,-9,-1,1,9,11,19,21,29,31,39,40,41])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });
    }
    
  }

  function deactivateSquaresAroundVerticalShipWithLength5(chosenSquareNumber: number) {
    const newPlayingField = [...playingField];

    const setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated = new Set([1, 11, 21, 31, 41, 51, 61, 71, 81, 91])
    const setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated = new Set([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])

    if (setOfSquaresWhereTheSquareBeforeChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-10, -9, 1, 11, 21, 31, 41, 50, 51])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else if (setOfSquaresWhereTheSquareAfterChosenSquareWillNotBeDeactivated.has(chosenSquareNumber)) {
      const indexForSquaresThatWillBeDeactivated = new Set([-11, -10, -1, 9, 19, 29, 39, 49 , 50])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });

    } else {
      const indexForSquaresThatWillBeDeactivated = new Set([-11,-10,-9,-1,1,9,11,19,21,29,31,39,41,49,50,51])
      indexForSquaresThatWillBeDeactivated.forEach(index => {
        if (newPlayingField[(chosenSquareNumber - 1) + (index)]) {
          newPlayingField[(chosenSquareNumber - 1) + (index)].canBeUsed = false
        }
      });
    }
  }



  function deactivateSquaresAroundHorizontalShip(chosenSquareNumber:number, ship :Ship) {
    const newPlayingField = [...playingField]
    
    if (ship.length == 2) {

      const chosenSquareNumbersThatForFirstIf = new Set([11, 21, 31, 41, 51, 61, 71, 81, 91])
      const chosenSquareNumbersThatForSecondIf = new Set([9, 19, 29, 39, 49, 59, 69, 79, 89, 99])

      newPlayingField.map((square) => {

        if (chosenSquareNumbersThatForFirstIf.has(chosenSquareNumber)) {

          if (
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber + 2 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12
          ) {
            square.canBeUsed = false;

          }

        } else if (chosenSquareNumbersThatForSecondIf.has(chosenSquareNumber)) {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 
          ) {
            square.canBeUsed = false;

          }
        } else {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 2 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12
          ) {
            square.canBeUsed = false;
          }
        }

      })
    }

    if (ship.length == 3) {

      const chosenSquareNumbersThatForFirstIf = new Set([11, 21, 31, 41, 51, 61, 71, 81, 91])
      const chosenSquareNumbersThatForSecondIf = new Set([8, 18, 28, 38, 48, 58, 68, 78, 88, 98])

      newPlayingField.map((square) => {
        if (chosenSquareNumbersThatForFirstIf.has(chosenSquareNumber)) {

          if (
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber + 3 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13
          ) {
            square.canBeUsed = false;
          }

        } else if (chosenSquareNumbersThatForSecondIf.has(chosenSquareNumber)) {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 
          ) {
            square.canBeUsed = false;
          }

        } else {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 3 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13
          ) {
            square.canBeUsed = false;
          }

        }

      })
    }

    if (ship.length == 4) {

      const chosenSquareNumbersThatForFirstIf = new Set([11, 21, 31, 41, 51, 61, 71, 81, 91])
      const chosenSquareNumbersThatForSecondIf = new Set([7, 17, 27, 37, 47, 57, 67, 77, 87, 97])

      newPlayingField.map((square) => {
        if (chosenSquareNumbersThatForFirstIf.has(chosenSquareNumber)) {
          if (
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 6 ||
            square.number == chosenSquareNumber + 4 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 ||
            square.number == chosenSquareNumber + 14
          ) {
            square.canBeUsed = false;
          }
        } else if (chosenSquareNumbersThatForSecondIf.has(chosenSquareNumber)) {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 
          ) {
            square.canBeUsed = false;
          }
        } else {

          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 6 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 4 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 ||
            square.number == chosenSquareNumber + 14
          ) {
            square.canBeUsed = false;
          }
        }
      })
    }

    if (ship.length == 5) {

      const chosenSquareNumbersThatForFirstIf = new Set([11, 21, 31, 41, 51, 61, 71, 81, 91])
      const chosenSquareNumbersThatForSecondIf = new Set([6, 16, 26, 36, 46, 56, 66, 76, 86, 96])

      newPlayingField.map((square) => {
        if (chosenSquareNumbersThatForFirstIf.has(chosenSquareNumber)) {
          if (
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 6 ||
            square.number == chosenSquareNumber - 5 ||
            square.number == chosenSquareNumber + 5 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 ||
            square.number == chosenSquareNumber + 14 ||
            square.number == chosenSquareNumber + 15
          ) {
            square.canBeUsed = false;
          }
        } else if (chosenSquareNumbersThatForSecondIf.has(chosenSquareNumber)) {
          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 6 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 ||
            square.number == chosenSquareNumber + 14 
          ) {
            square.canBeUsed = false;
          }
        } else {

          if (square.number == chosenSquareNumber - 11 ||
            square.number == chosenSquareNumber - 10 ||
            square.number == chosenSquareNumber - 9 ||
            square.number == chosenSquareNumber - 8 ||
            square.number == chosenSquareNumber - 7 ||
            square.number == chosenSquareNumber - 6 ||
            square.number == chosenSquareNumber - 5 ||
            square.number == chosenSquareNumber - 1 ||
            square.number == chosenSquareNumber + 5 ||
            square.number == chosenSquareNumber + 9 ||
            square.number == chosenSquareNumber + 10 ||
            square.number == chosenSquareNumber + 11 ||
            square.number == chosenSquareNumber + 12 ||
            square.number == chosenSquareNumber + 13 ||
            square.number == chosenSquareNumber + 14 ||
            square.number == chosenSquareNumber + 15
          ) {
            square.canBeUsed = false;
          }
        }
      })
    }

    setPlayingField(newPlayingField)
  }

  function validSquare(squareNumber: number, chosenShip: string) {

    let shipToBePlaced: Ship;

    ships.map((ship) => {
      if (ship.id == chosenShip) {
        shipToBePlaced = ship;
      }
    })

    if (shipToBePlaced!.isHorizontal == true) {
      let numberThatLastBitOfShipWillBePlacedOn = squareNumber + shipToBePlaced!.length - 1;

      let numberThatLastBitOfShipCannotExceed = (Math.trunc((squareNumber - 1) / 10) + 1) * 10;

      for (let index = 0; index < shipToBePlaced!.length; index++) {
        if (playingField[squareNumber - 1 + index].canBeUsed == false ||
          playingField[squareNumber - 1 + index].ship == true ||
          numberThatLastBitOfShipWillBePlacedOn > numberThatLastBitOfShipCannotExceed) {
          setInstructions("Du kan inte lägga skeppet där, välj en annan ruta")
          return false;
        }
      }
      return true;
    }

    if (shipToBePlaced!.isHorizontal == false) {
      let numberThatLastBitOfShipWillBePlacedOn = squareNumber;

      for (let i = 1; i < shipToBePlaced!.length; i++) {
        numberThatLastBitOfShipWillBePlacedOn = numberThatLastBitOfShipWillBePlacedOn + 10;
      }



      let numberThatLastBitOfShipCannotExceed = 100;

      let indexThatWillCheckEveryTenthSquare = 0;
      for (let index = 0; index < shipToBePlaced!.length; index++) {

        if (playingField[squareNumber - 1 + indexThatWillCheckEveryTenthSquare].canBeUsed == false ||
          playingField[squareNumber - 1 + indexThatWillCheckEveryTenthSquare].ship == true ||
          numberThatLastBitOfShipWillBePlacedOn > numberThatLastBitOfShipCannotExceed) {
          setInstructions("Du kan inte lägga skeppet där, välj en annan ruta")
          return false;
        }

        indexThatWillCheckEveryTenthSquare = indexThatWillCheckEveryTenthSquare + 10;
      }
      return true;
    }

  }

  const [instructions, setInstructions] = useState("Välj ett skepp")

  useEffect(() => {
    if (chosenShip != "") {
      setInstructions("Tryck på en ruta för att lägga skeppet, skeppet kommer att lägga sig från och med den rutan och till höger/neråt så många rutor som skepplängden är.")
    } else if (chosenShip == "" && ships.length != 0) {
      setInstructions("Välj ett skepp")
    } else {
      setInstructions("Ready up!")
    }
  }, [chosenShip])

  function changeDirectionOfShips() {
    const newShips = [...ships]
    newShips.map((ship) => {
      if (ship.isHorizontal == true) {

        ship.style = { ...ship.style, transform: 'rotate(90deg)' }
        ship.isHorizontal = false;
      } else {
        ship.style = { ...ship.style, transform: 'rotate(0deg)' }
        ship.isHorizontal = true;
      }

    })
    setShips(newShips)
  }


 
  const stompClient = useRef(Stomp.over(() => SockJS("https://shark-app-lj5po.ondigitalocean.app/websocket")));


  function handleReadySignal () {
    if(amReady.current == true && myTurn.current != null) {
      setGameStarted(true);
      if(myTurn.current == true) {
        setInstructions("Din tur, skjut!");
        canShoot.current = true;
      } else {
        setInstructions("Deras tur, invänta attack...");
      }
    }

    if(myTurn.current==null) {
      if(amReady.current == true) {
        myTurn.current = true;
      } else {
        myTurn.current = false;
      }
    }
    
  }

  const latestSquareShotAt = useRef(0);

  function handleShotSignal (squareNumber : string) {
    const squareNumberInt = parseInt(squareNumber);
    latestSquareShotAt.current = squareNumberInt;

    if(myTurn.current == false) {
      if(playingField[squareNumberInt-1].ship == true) {
        stompClient.current.send("/app/hitOrMiss/"+idForGame.current, {}, JSON.stringify({signalString : "hit"}));
      } else {
        stompClient.current.send("/app/hitOrMiss/"+idForGame.current, {}, JSON.stringify({signalString : "miss"}));
      }
    }
  }

  function handleHitOrMissSignal(signal : string) {
    
    if(myTurn.current == true) {
      const newTheirPlayingField = [...theirPlayingField];

      if(signal == "hit") {
        newTheirPlayingField[latestSquareShotAt.current-1].hit = true;
      } else {
        newTheirPlayingField[latestSquareShotAt.current-1].miss = true;
      }

      setTheirPlayingField(newTheirPlayingField);
      myTurn.current = false;
      setInstructions("Deras tur, invänta attack...");

    } else {
      const newPlayingField = [...playingField];

      if(signal == "hit") {
        if(playingField[latestSquareShotAt.current-1].hit ==false) {
          playingField[latestSquareShotAt.current-1].hit = true;
          totalShipParts.current = totalShipParts.current - 1;
        }
        if(totalShipParts.current == 0) {
          stompClient.current.send("/app/gameOver/"+idForGame.current, {}, JSON.stringify({signalString : "gameOver"}));
        }
      } else {
        playingField[latestSquareShotAt.current-1].miss = true;
      }
      setPlayingField(newPlayingField);
      myTurn.current = true;
      canShoot.current = true;
      setInstructions("Din tur, skjut!");
    }
  }

  function handleGameOverSignal() {
    if(totalShipParts.current == 0) {
      setInstructions("Du har förlorat... Ladda om sidan att spela igen.")
    }else {
      setInstructions("Du vann! Ladda om sidan att spela igen.")
    }
    setScreen("gameOver")
  }

  function startGame(gameId:number) {
    
    
    stompClient.current.subscribe("/topic/readyUp/" + gameId, (message) => {
      const signal = JSON.parse(message.body);
      if (signal.signalString != undefined && signal.signalString == "ready") {
        handleReadySignal();
      }
    })
    
    stompClient.current.subscribe("/topic/shot/" + gameId, (message) => {
      const signal = JSON.parse(message.body);
      
      if (signal.signalInt != undefined) {
        handleShotSignal(signal.signalInt);
      }
    })
    
    stompClient.current.subscribe("/topic/hitOrMiss/" + gameId, (message) => {
      const signal = JSON.parse(message.body);
      
      if (signal.signalString != undefined) {
        handleHitOrMissSignal(signal.signalString);
      }
    })

    stompClient.current.subscribe("/topic/gameOver/" + gameId, (message) => {
      const signal = JSON.parse(message.body);
      if (signal.signalString != undefined) {
        handleGameOverSignal();
      }
    })

    setScreen("gameOn")
  }

  
  
  function createGameIdAndChangeScreen() {
    const randomGameId = Math.floor(Math.random() * 10000000000) + 1;
    idForGame.current = randomGameId;

    if (!stompClient.current.connected) {
      stompClient.current.connect({}, function () {
        stompClient.current.subscribe("/topic/connected/" + randomGameId, (message) => {
          const signal = JSON.parse(message.body);
          if (signal.signalString != undefined && signal.signalString == "connected") {
            startGame(randomGameId);
          }
        })

      })

    } else {
      stompClient.current.subscribe("/topic/connected/" + randomGameId, (message) => {
        const signal = JSON.parse(message.body);
        if (signal.signalString != undefined && signal.signalString == "connected") {
          startGame(randomGameId);
        }
      })

    }

    setScreen("waitingForPlayer")
  }

  function readyUp () {
   
    amReady.current = true;

    if (!stompClient.current.connected) {
      stompClient.current.connect({}, function () {
        stompClient.current.send("/app/readyUp/"+idForGame, {}, JSON.stringify({signalString : "ready"}));
        })
      }
    stompClient.current.send("/app/readyUp/"+idForGame.current, {}, JSON.stringify({signalString : "ready"}));
    (document.getElementById('readyUpBtn') as any)!.disabled = true;
    setInstructions("Väntar på den andra spelaren...")
  }

  

  function joinGame (gameId:number) {

    idForGame.current = gameId;

    if (!stompClient.current.connected) {
      stompClient.current.connect({}, function () {
        stompClient.current.subscribe("/topic/connected/" + gameId, (message) => {
          const signal = JSON.parse(message.body);
          if (signal.signalString != undefined && signal.signalString == "connected") {
            startGame(gameId);
          }
        })

        stompClient.current.send("/app/connected/"+gameId, {}, JSON.stringify({signalString : "connected"}))
      })

    } else {
      stompClient.current.subscribe("/topic/connected/" + gameId, (message) => {
        const signal = JSON.parse(message.body);
        if (signal.signalString != undefined && signal.signalString == "connected") {
          startGame(gameId);
        }
      })
      stompClient.current.send("/app/connected/"+gameId, {}, JSON.stringify({signalString : "connected"}))
    }
  }

  function handleShotOnTheirPlayingField(squareNumber : number) { 
    if(myTurn.current == true && canShoot.current == true) {
      canShoot.current = false;
      stompClient.current.send("/app/shot/"+idForGame.current, {}, JSON.stringify({signalInt : squareNumber.toString()}));
    }
  }

  return (
    <>

      {screen == "startOrJoinGame" &&
        <EnterScreen joinGame={joinGame} createGameIdAndChangeScreen={createGameIdAndChangeScreen} screen={screen}></EnterScreen>
      }

      {screen == "waitingForPlayer" &&
        <EnterScreen idForGame={idForGame} screen={screen} ></EnterScreen>
      }


      {screen == "gameOn" &&

        <div id='AppComponentDiv'>
      
          <h3 id='instructionsHeader'>{instructions}</h3>
          <div id='playingFieldDiv'>
            <h3>Mitt fält</h3>
            <div id='playingField'>
              {playingField.map((square) => (
                <div onClick={() => changePlayingField(square.number)} key={square.number} className='square' style={square.style}>
                  {square.hit == true &&
                    <img src={hitGif} alt="no" className='imgExplosion' />}
                  {square.miss == true &&
                    <img src={warningGif} alt="no" className='imgWarning' />}
                </div>
              ))}
            </div>
          </div>
          <br /><br />
          {gameStarted == false &&
            <div id='shipContainer'>
              {ships.map((ship) => (

                <div key={ship.id} onClick={() => setChosenShip(ship.id)} id={ship.id} style={ship.style}>

                  {[...Array(ship.length)].map(() => {
                    return <div id={ship.id + 'Part'} ></div>
                  })}
                </div>
              ))}
              {ships.length != 0 &&
                <button id="changeDirectionBtn" onClick={() => changeDirectionOfShips()}>Byt håll på skepp</button>
              }


              {ships.length == 0 &&
                <button id='readyUpBtn' onClick={() => readyUp()}>Ready up!</button>
              }
            </div>
          }
          {gameStarted == true &&
            <div id='theirPlayingFieldDiv'>

              <h3>Deras fält</h3>
              <div id='theirPlayingField'>
                {theirPlayingField.map((square) => (
                  <div onClick={() => handleShotOnTheirPlayingField(square.number)} key={square.number} className='square' style={square.style}>
                    {square.hit == true &&
                      <img src={hitGif} alt="no" className='imgExplosion' />}
                    {square.miss == true &&
                      <img src={warningGif} alt="no" className='imgWarning' />}
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      }

      {screen == "gameOver" &&
                <div id='gameOverDiv'>
                  <h4>{instructions}</h4>
                </div>
              }

    </>
  )

}



{/* <DndContext onDragEnd={handleDragEnd}>
  {parent === null ? draggableMarkup : null}
  <div id='playingField'>

    {playingField.map((id) => (
      

        <Droppable key={id} id={id} style={style}>
          {parent === id ? draggableMarkup : 'Drop '}
        </Droppable>
     
    ))}
  </div>
</DndContext> */}


// function handleDragEnd(event :any) {
//   const {over} = event;


//   setParent(over ? over.id : null);
// }
export default App
