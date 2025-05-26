import React, { useState , useEffect, useRef } from 'react';

//Creates an array of random numbers following certain restrictions
//Length = amount of numbers
//Target = special number in experiment
//Sparcity = amount of numbers minimum in sequence before the target can appear again in sequence
function SequenceCreator(length = 66, target = 3, sparcity = 4){

    //Setup counter to countdown until allowing target number to show up
    let counter = sparcity;
    //Setup previous number holder, starts at 0
    let previous = 0;
    //Setup sequence holder
    const sequence = [];

    //Start for loop to get random nums generated
    for(let i = 0; i < length; i++) {
        //Generate random num for loop
        const number = Math.floor(Math.random() * 9) + 1;

        //Verify conditions
        //If the same two numbers are consecutively generated
        if(previous === number){
            i--;
            continue;
        }

        //If the number is equal to the target but the counter is not at 0 or lower
        if(number === target && counter > 0){
            i--;
            continue;
        //Else if the number is equal to the target
        } else if(number === target){
            counter = sparcity;
        //Else the counter goes down
        } else {
            counter--;
        }

        //Update previous number
        previous = number;

        //add number to array
        sequence.push(number);
    }
    return sequence;
}

function Sequencer({ initTime, middleTime, endTime, target, length, sparcity, onComplete }) {
    const sequence = useRef(SequenceCreator(length, target, sparcity));
    const [display, setDisplay] = useState('');
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState(0);
    const [score, setScore] = useState([]);
    const [responseTimes, setResponseTimes] = useState([]);
    const [clicked, setClicked] = useState(false);
    const startTime = useRef(null);
  
    useEffect(() => {
      if (index >= sequence.current.length) return;
      let timeout;
  
      if (phase === 0) {
        setDisplay(sequence.current[index]);
        setClicked(false);
        startTime.current = null;
        timeout = setTimeout(() => setPhase(1), initTime);
      } else if (phase === 1) {
        setDisplay('*');
        timeout = setTimeout(() => {
          setPhase(2);
          startTime.current = Date.now();
        }, middleTime);
      } else if (phase === 2) {
        setDisplay(<strong>*</strong>);
        timeout = setTimeout(() => {
          if (!clicked) {
            const wasTarget = sequence.current[index] === target;
            setScore(prev => [...prev, wasTarget ? 1 : 0]);
            setResponseTimes(prev => [...prev, -1]);
            setDisplay('×');
          }
          setIndex(prev => prev + 1);
          setPhase(0);
        }, endTime);
      }
  
      return () => clearTimeout(timeout);
    }, [index, phase]);
  
    const handleClick = () => {
        if (clicked) return;
      
        const current = sequence.current[index];
        const wasTarget = current === target;
        let reactionTime = -1;
      
        setClicked(true);
      
        if (phase === 2 && startTime.current != null) {
          reactionTime = Date.now() - startTime.current;
          setScore(prev => [...prev, wasTarget ? 0 : 1]);
        } else {
          setScore(prev => [...prev, 0]);
        }
      
        setResponseTimes(prev => [...prev, reactionTime]);
        setDisplay(current);
        setIndex(prev => prev + 1);
        setPhase(0);
      };
  
      useEffect(() => {
        if (index >= sequence.current.length && typeof onComplete === 'function') {
          onComplete(score, responseTimes, sequence.current);
        }
      }, [index, onComplete, score]);
  
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '8rem' }}>{display}</div>
        <button onClick={handleClick} className="goButton">GO</button>
      </div>
    );
  }
  
    

export default Sequencer;
