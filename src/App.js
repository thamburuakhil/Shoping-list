import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

   const [toBuy, setToBuy] = useState('');
   const [toBuys, setToBuys] = useState(() => {
      // getting stored toDos data from localStorage
      const saved = localStorage.getItem("Storage");
      const initialValue = JSON.parse(saved);
      return (initialValue || "");
   });

   //Program to removing correspondend toDos data from localStorage of browser
   const index = toBuys && toBuys.findIndex(obj => obj.statusRemove === true);
   // console.log(index);
   if (index > -1) toBuys && toBuys.splice((index), 1);


   const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const date = new Date();
   const day = dayNames[date.getDay()];

   const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   const currDate = new Date();
   const hours = currDate.getHours();
   const AMorPM = hours >= 12 ? 'PM' : 'AM';
   var hour = hours % 12;
   const hour12 = () => {
      if (hour === 0) hour = 12;
      return hour;
   };
   const toBuyDate = currDate.getDate() + '.' + (currDate.getMonth() + 1) + '.' + currDate.getFullYear();
   const toBuyDay = dayNamesShort[currDate.getDay()];
   const toBuyTime = hour12() + ':' + currDate.getMinutes() + ':' + currDate.getSeconds() + ' ' + AMorPM;
   const toBuyTimeDateDay = toBuyTime + ' ' + toBuyDay + ' ' + toBuyDate;

   const handleUserInput = (e) => {
      setToBuy(e.target.value);
   };

   const handleInputSubmit = (e) => {
      e.preventDefault();
      if (toBuy) {
         setToBuys([...toBuys, {
            id: Date.now(),
            text: toBuy,
            toBuyTime: toBuyTimeDateDay,
            statusErase: false,
            statusDone: false,
            statusDrop: false,
            statusRetrieve: false,
            statusRemove: false
         }]);
         setToBuy('');
      }
   };
   const resetInputField = () => {
      setToBuy('');
   };

   useEffect(() => {
      // storing toDos data to localStorage of browser
      localStorage.setItem("Storage", JSON.stringify(toBuys));
   }, [toBuys]);

   return (
      <div className="app">
         <div className="headings">
            <div className="mainHeading">
               <h1 className="gradient-text">Let's Shop </h1>
            </div>
            <div className="subHeading">
               <h2 className="gradient-text2">Hey, it's {day}</h2>
            </div>
         </div>

         <form onSubmit={handleInputSubmit}>
            <div className="toBuyInput">
               <div className="left">
                  <input value={toBuy} onChange={handleUserInput} type="text" placeholder= " Don't Forget . . ." />
               </div>
               <div className="right erase">
                  <i onClick={resetInputField} className="fas fa-eraser" title="Clear"></i>
               </div>
               <div className="rightEnd  add">
                  <button style={{ border: 'none', outline: 'none', backgroundColor: '#fff' }} type="submit"><i className="fas fa-plus" title="Add"></i></button>
               </div>
            </div>
         </form>

         

         <div className ="container forShoping">
            <h3>BUY</h3>
            {
               toBuys && toBuys.map((obj) => {
                  if (!obj.statusDone && !obj.statusDrop) {
                     return (
                        <div key={obj.id} className="toBuy">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToBuys(toBuys.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toBuyTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToBuys(toBuys.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
                     );
                  } else if (obj.statusRetrieve && !obj.statusDone) {
                     return (
                        <div key={obj.id} className="toDo">
                           <div className="left tick">
                              <i onClick={(e) => {
                                 e.target.value = true;
                                 setToBuys(toBuys.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDone = e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDone} className="fas fa-check" title="Done"></i>
                           </div>
                           <div className="top">
                              <p>{obj.text}</p>
                           </div>
                           <div className="bottom">
                              <p>{obj.toBuyTime}</p>
                           </div>
                           <div className="right close">
                              <i onClick={(e) => {

                                 e.target.value = true;
                                 setToBuys(toBuys.filter((obj2) => {
                                    if (obj2.id === obj.id) {
                                       obj2.statusDrop = e.target.value;
                                       obj.statusRetrieve = !e.target.value;
                                    }
                                    return obj2;
                                 }));
                              }} value={obj.statusDrop} className="fas fa-times" title="Drop"></i>
                           </div>
                        </div>
                     );
                  }
               })
            }
         </div>

        
      </div>
   );

}

export default App;