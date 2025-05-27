import patternMobile from './assets/images/pattern-divider-mobile.svg';
import patternDesktop from './assets/images/pattern-divider-desktop.svg';
import dice from './assets/images/icon-dice.svg';
import React, { useState } from 'react';

function Card(){

    const [advice, setAdvice] = useState("It is easy to sit up and take notice, what's difficult is getting up and taking action.");
    const [adviceId, setAdviceId] = useState(117);

    async function fetchAdvice(){

        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            if(!response.ok){
                throw new Error("Error retrieving advice");
            }

            const data = await response.json();
            setAdvice(data.slip.advice);
            setAdviceId(data.slip.id);

        }
        catch(error){
            console.error("Failed to fetch advice:", error);
        }
    }
    
    return(
        <div className='flex flex-col items-center w-full max-w-[500px] text-center p-8 bg-blue-900 rounded-xl relative'>
            <h2 className='text-xs tracking-[4px] text-green-300 m-3 font-semibold'>ADVICE #{adviceId}</h2>
            <p className='font-extrabold text-[28px] text-blue-200'>"{advice}"</p>
            <picture>
                <source media="(min-width: 1440px)" srcSet={patternDesktop} />
                <source media="(min-width: 375px)" srcSet={patternMobile} />
                <img className='my-10' src={patternMobile} alt="Pattern Divider" />
            </picture>
            <button onClick={fetchAdvice} className='bg-green-300 p-6 rounded-full absolute bottom-[-30px] hover:shadow-xl shadow-green-300/50'>
                <img src={dice} alt='Dice to roll for advice' />
            </button>
        </div>
    );
}

export default Card;