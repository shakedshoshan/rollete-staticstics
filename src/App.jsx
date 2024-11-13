import { useState } from 'react'
import './App.css'
import { saveNumbers, getNumbers } from './utils/localStorage'
import { getUnchosenNumbers } from './utils/numbersFunction'
import rolletteNumbers from './assets/rolletteNumbers.json'
import { toast } from 'react-toastify'
import { getNumbersColors, getThirds, getThirdsColors, getFinalNumbers, getSeventeenNumbers } from './utils/numbersFunction'

function App() {
  const [numbers, setNumbers] = useState(getNumbers())
  const [unchosenNumbers, setUnchosenNumbers] = useState(getUnchosenNumbers(numbers))
  // const [numbersColors, setNumbersColors] = useState(getNumbersColors(unchosenNumbers))
  // const [firstThird, setFirstThird] = useState(getThirdsColors(getThirds(numbersColors).first))
  // const [secondThird, setSecondThird] = useState(getThirdsColors(getThirds(numbersColors).second))
  // const [thirdThird, setThirdThird] = useState(getThirdsColors(getThirds(numbersColors).third))
  const [inputValue, setInputValue] = useState('')
  // const [allNumbers, setAllNumbers] = useState([firstThird, secondThird, thirdThird])
  // const [finalNumbers, setFinalNumbers] = useState(getFinalNumbers(allNumbers))
  // const [seventeenNumbers, setSeventeenNumbers] = useState(getSeventeenNumbers(finalNumbers, allNumbers))

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="number"]');
    if (inputValue.trim() === '') return;

    const newNumber = Number(inputValue);
    if (isNaN(newNumber)) {
      toast.error('Please enter a valid number');
      return;
    }
    if (newNumber < 0 || newNumber > 36) {
      toast.error('Number must be between 0 and 36');
      return;
    }

    const updatedNumbers = [...numbers, newNumber]
    if (updatedNumbers.length > 20) {
      updatedNumbers.shift()
    }
    
    const newUnchosenNumbers = getUnchosenNumbers(updatedNumbers)
    console.log(updatedNumbers)
    // const newNumbersColors = getNumbersColors(newUnchosenNumbers)
    // const newThirds = getThirds(newNumbersColors)
    // const newFirstThird = getThirdsColors(newThirds.first)
    // const newSecondThird = getThirdsColors(newThirds.second)
    // const newThirdThird = getThirdsColors(newThirds.third)
    // const newAllNumbers = [newFirstThird, newSecondThird, newThirdThird]
    // const newFinalNumbers = getFinalNumbers(newAllNumbers, newUnchosenNumbers)
    // const newSeventeenNumbers = getSeventeenNumbers(newFinalNumbers, newAllNumbers)

    setNumbers(updatedNumbers)
    saveNumbers(updatedNumbers)
    setInputValue('')
    setUnchosenNumbers(newUnchosenNumbers)
      // setNumbersColors(newNumbersColors)
      // setFirstThird(newFirstThird)
      // setSecondThird(newSecondThird)
      // setThirdThird(newThirdThird)
      // setAllNumbers(newAllNumbers)
      // setFinalNumbers(newFinalNumbers)
      // setSeventeenNumbers(newSeventeenNumbers)
    setTimeout(() => {
      input.focus();
    }, 0);
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-[#004d00] via-[#006600] to-[#008000] py-6 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6 sm:mb-8 drop-shadow-lg">
          Roulette Statistics
        </h1>
        <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-row sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <input 
            className="w-2/3 px-3 py-2 bg-[#ffffff] text-black border-2 border-[#ffffff] rounded-md shadow-inner focus:border-[#4d4d4d] focus:outline-none transition-all duration-300"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="0"
            max="36"
            placeholder="Enter a number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={(e) => e.target.focus()}
            autoFocus
          />
          <button 
            type="submit"
            className="w-1/3 sm:w-auto px-6 py-2 bg-[#175217] hover:bg-[#2c773f] text-white font-bold rounded-lg border-2 border-[#ffffff] shadow-[0_0_10px_rgba(184,134,11,0.5)] transform hover:scale-105 transition-all duration-300"
          >
            Enter
          </button>
        </div>
        </form>
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 mt-6"> 
          <div className="flex flex-wrap max-w-4xl mx-auto gap-3 justify-center">
            {unchosenNumbers.map((number) => {
              const color = rolletteNumbers[number].color;
              const bgColor = 
                color === 'red' ? 'bg-red-600' : 
                color === 'black' ? 'bg-gray-800' : 
                'bg-green-600';
              
              return (
                <span 
                  key={number} 
                  className={`p-2 ${bgColor} text-white rounded-full shadow-md text-center w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-lg sm:text-xl font-semibold`}
                >
                  {number}
                </span>
              );
            })}
          </div>
      </div>
    </div>
    </div>
  )
}

export default App
