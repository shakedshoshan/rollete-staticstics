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
  const [numbersColors, setNumbersColors] = useState(getNumbersColors(unchosenNumbers))
  const [firstThird, setFirstThird] = useState(getThirdsColors(getThirds(numbersColors).first))
  const [secondThird, setSecondThird] = useState(getThirdsColors(getThirds(numbersColors).second))
  const [thirdThird, setThirdThird] = useState(getThirdsColors(getThirds(numbersColors).third))
  const [inputValue, setInputValue] = useState('')
  const [allNumbers, setAllNumbers] = useState([firstThird, secondThird, thirdThird])
  const [finalNumbers, setFinalNumbers] = useState(getFinalNumbers(allNumbers))
  const [seventeenNumbers, setSeventeenNumbers] = useState(getSeventeenNumbers(finalNumbers, allNumbers))
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return

    const newNumber = Number(inputValue)
    if (isNaN(newNumber)) {
      toast.error('Please enter a valid number')
      return
    }
    if (newNumber < 0 || newNumber > 36) {
      toast.error('Number must be between 0 and 36')
      return
    }

    const updatedNumbers = [...numbers, newNumber]
    if (updatedNumbers.length > 20) {
      updatedNumbers.shift()
    }
    setNumbers(updatedNumbers)
    saveNumbers(updatedNumbers)
    setInputValue('')
    setUnchosenNumbers(getUnchosenNumbers(updatedNumbers))
    console.log("unchosenNumbers", unchosenNumbers)
    setNumbersColors(getNumbersColors(unchosenNumbers))
    setFirstThird(getThirdsColors(getThirds(numbersColors).first))
    setSecondThird(getThirdsColors(getThirds(numbersColors).second))
    setThirdThird(getThirdsColors(getThirds(numbersColors).third))
    setAllNumbers([firstThird, secondThird, thirdThird])
    console.log("allNumbers", allNumbers)
    setFinalNumbers(getFinalNumbers(allNumbers, unchosenNumbers))
    console.log("finalNumbers", finalNumbers)
    setSeventeenNumbers(getSeventeenNumbers(finalNumbers, allNumbers))
    console.log("seventeenNumbers", seventeenNumbers)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#004d00] via-[#006600] to-[#008000] py-6 px-0 sm:px-4 lg:px-6">
      <div className="w-full sm:max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-none sm:rounded-2xl shadow-xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6 sm:mb-8 drop-shadow-lg">
          Roulette Statistics
        </h1>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <input 
            className="w-2/3 px-3 py-2 bg-[#e9e9e9] text-black border-2 border-[#ffffff] rounded-md shadow-inner focus:border-[#4d4d4d] focus:outline-none transition-all duration-300"
            type="number"
            placeholder="Enter a number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e)
              }
            }}
          />
          <button className="w-1/3 sm:w-auto px-6 py-2 bg-[#175217] hover:bg-[#2c773f] text-white font-bold rounded-lg border-2 border-[#ffffff] shadow-[0_0_10px_rgba(184,134,11,0.5)] transform hover:scale-105 transition-all duration-300">
            Enter
          </button>
        </div>
        </form>
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#175217] mb-6 text-center border-b-2 border-[#175217] pb-2">
            Predicted Numbers
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              {/* First Third */}
              <div className="flex flex-col gap-3 bg-[#f8f9fa] p-4 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-center text-[#000000] border-b border-[#000000] pb-2">
                  First (0-12)
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {seventeenNumbers[0]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                  {seventeenNumbers[0]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                  {seventeenNumbers[0]?.green.map((number) => (
                    <span key={number} className="p-2 bg-green-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Second Third */}
              <div className="flex flex-col gap-3 bg-[#f8f9fa] p-4 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-center text-[#000000] border-b border-[#000000] pb-2">
                  Second (13-24)
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {seventeenNumbers[1]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                  {seventeenNumbers[1]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Third Third */}
              <div className="flex flex-col gap-3 bg-[#f8f9fa] p-4 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-bold text-center text-[#000000] border-b border-[#000000] pb-2">
                  Third (25-36)
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {seventeenNumbers[2]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                  {seventeenNumbers[2]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm font-semibold">
                      {number}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
