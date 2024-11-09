// import { useDroppable } from '@dnd-kit/core';
// import { useState } from 'react';
// import './Droppable.css'

// function Droppable(props :any) {
//     const {isOver, setNodeRef} = useDroppable({
//       id: 'droppable',
//     });
//     const style = {
//       color: isOver ? 'green' : undefined,
//     };
    
    
//     return (
//       <div ref={setNodeRef} style={style}>
//         {props.children}
//       </div>
//     );
//   }

// function MultipleDroppables() {
//     const [playingField, setPlayingField] = useState([
//         { id: "A1" }, { id: "B1" }, { id: "C1" }, { id: "D1" }, { id: "E1" }, { id: "F1" }, { id: "G1" }, { id: "H1" }, { id: "I1" }, { id: "J1" },
//         { id: "A2" }, { id: "B2" }, { id: "C2" }, { id: "D2" }, { id: "E2" }, { id: "F2" }, { id: "G2" }, { id: "H2" }, { id: "I2" }, { id: "J2" },
//         { id: "A3" }, { id: "B3" }, { id: "C3" }, { id: "D3" }, { id: "E3" }, { id: "F3" }, { id: "G3" }, { id: "H3" }, { id: "I3" }, { id: "J3" },
//         { id: "A4" }, { id: "B4" }, { id: "C4" }, { id: "D4" }, { id: "E4" }, { id: "F4" }, { id: "G4" }, { id: "H4" }, { id: "I4" }, { id: "J4" },
//         { id: "A5" }, { id: "B5" }, { id: "C5" }, { id: "D5" }, { id: "E5" }, { id: "F5" }, { id: "G5" }, { id: "H5" }, { id: "I5" }, { id: "J5" },
//         { id: "A6" }, { id: "B6" }, { id: "C6" }, { id: "D6" }, { id: "E6" }, { id: "F6" }, { id: "G6" }, { id: "H6" }, { id: "I6" }, { id: "J6" },
//         { id: "A7" }, { id: "B7" }, { id: "C7" }, { id: "D7" }, { id: "E7" }, { id: "F7" }, { id: "G7" }, { id: "H7" }, { id: "I7" }, { id: "J7" },
//         { id: "A8" }, { id: "B8" }, { id: "C8" }, { id: "D8" }, { id: "E8" }, { id: "F8" }, { id: "G8" }, { id: "H8" }, { id: "I8" }, { id: "J8" },
//         { id: "A9" }, { id: "B9" }, { id: "C9" }, { id: "D9" }, { id: "E9" }, { id: "F9" }, { id: "G9" }, { id: "H9" }, { id: "I9" }, { id: "J9" },
//         { id: "A10" }, { id: "B10" }, { id: "C10" }, { id: "D10" }, { id: "E10" }, { id: "F10" }, { id: "G10" }, { id: "H10" }, { id: "I10" }, { id: "J10" }
//     ])

//     return (
//         <section>
//             <div id='playingField'>
//                 {playingField.map((square: any) => (
//                     <div id='square'>
//                         <Droppable id={square.id} key={square.id}>

//                             Droppable container id: ${square.id}

//                         </Droppable>
//                     </div>
//                 ))}</div>
//         </section>
//     );
// }


// import React from 'react';
// import {useDroppable} from '@dnd-kit/core';

// function Droppable(props :any) {
//     const {setNodeRef} = useDroppable({
//       id: props.id,
//     });
    
    
//     return (
//       <div ref={setNodeRef}>
//         {props.children}
//       </div>
//     );
//   }

// export default Droppable