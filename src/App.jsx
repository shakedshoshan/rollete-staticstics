import { useState } from 'react'
import './App.css'
import { saveNumbers, getNumbers } from './utils/localStorage'
import { getUnchosenNumbers } from './utils/numbersFunction'
import rolletteNumbers from './assets/rolletteNumbers.json'
import { getNumbersColors, getThirds, getThirdsColors, getFinalNumbers } from './utils/numbersFunction'

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

  const handleSubmit = () => {
    if (inputValue.trim() === '') return

    const newNumber = Number(inputValue)
    if (isNaN(newNumber)) return

    const updatedNumbers = [...numbers, newNumber]
    if (updatedNumbers.length > 20) {
      updatedNumbers.shift()
    }
    setNumbers(updatedNumbers)
    saveNumbers(updatedNumbers)
    setInputValue('')
    setUnchosenNumbers(getUnchosenNumbers(updatedNumbers))
    setNumbersColors(getNumbersColors(unchosenNumbers))
    setFirstThird(getThirdsColors(getThirds(numbersColors).first))
    setSecondThird(getThirdsColors(getThirds(numbersColors).second))
    setThirdThird(getThirdsColors(getThirds(numbersColors).third))
    setAllNumbers([firstThird, secondThird, thirdThird])
    setFinalNumbers(getFinalNumbers(allNumbers))
    console.log(finalNumbers)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#100d38] via-[#201981] to-[#201981] py-6 px-3 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-6 sm:mb-8 drop-shadow-lg">
          Roulette Statistics
        </h1>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-row sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <input 
            className=" w-2/3  px-3 py-2 border-2 border-indigo-400 rounded-full shadow-md focus:border-indigo-600 focus:ring-2 focus:ring-indigo-300 focus:outline-none transition-all duration-300"
            type="text"
            placeholder="Enter a number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          <button className="w-1/3 sm:w-auto px-3 py-2 bg-gradient-to-r from-[#6365e2] to-[#6365e2] hover:from-[#201981] hover:to-[#100d38] text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300">
            Enter
          </button>
        </div>
        </form>
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 text-center">
            The Numbers 
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
              {/* First Third */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-center text-indigo-600">1-12</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {finalNumbers[0]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
                      {number}
                    </span>
                  ))}
                  {finalNumbers[0]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
                      {number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Second Third */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-center text-indigo-600">13-24</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {finalNumbers[1]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
                      {number}
                    </span>
                  ))}
                  {finalNumbers[1]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
                      {number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Third Third */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg sm:text-xl font-semibold text-center text-indigo-600">25-36</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {finalNumbers[2]?.red.map((number) => (
                    <span key={number} className="p-2 bg-red-600 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
                      {number}
                    </span>
                  ))}
                  {finalNumbers[2]?.black.map((number) => (
                    <span key={number} className="p-2 bg-gray-800 text-white rounded-full shadow-md text-center w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm">
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
