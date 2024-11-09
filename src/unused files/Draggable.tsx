// // import React from 'react';
// // import { useDraggable } from "@dnd-kit/core";
// import './Draggable.css'

// // function Draggable(props:any) {
// //     const {attributes, listeners, setNodeRef, transform} = useDraggable({
// //       id: 'draggable',
// //     });
// //     const style = transform ? {
// //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
// //     } : undefined;
  
    
// //     return (
// //       <button id='ship' ref={setNodeRef} style={style} {...listeners} {...attributes}>
// //         {props.children}
// //       </button>
// //     );
// //   }


// import React from 'react';
// import {useDraggable} from '@dnd-kit/core';
// import {CSS} from '@dnd-kit/utilities';

// function Draggable(props :any) {
//     const {attributes, listeners, setNodeRef, transform} = useDraggable({
//       id: props.id,
//     });
//     const style = transform ? {
//       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       width: '100px',
//       height: '50px'
//     } : undefined;
    
    
//     return (
//       <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//         {props.children}
//       </button>
//     );
//   }

//   export default Draggable