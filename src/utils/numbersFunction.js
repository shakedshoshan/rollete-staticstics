import rolletteNumbers from '../assets/rolletteNumbers.json'

export const getUnchosenNumbers = (numbers) => {
  const allNumbers = Array.from({ length: 37 }, (_, i) => i)
  return allNumbers.filter(number => !numbers.includes(number))
}

export const getNumbersColors = (numbers) => {
    const colorOrder = ['red', 'black', 'green'];
    // Remove duplicates using Set
    const uniqueNumbers = [...new Set(numbers)];
    return uniqueNumbers.sort((a, b) => {
        const colorA = rolletteNumbers[a].color;
        const colorB = rolletteNumbers[b].color;
        // First sort by color
        const colorCompare = colorOrder.indexOf(colorA) - colorOrder.indexOf(colorB);
        // If same color, sort by number value
        if (colorCompare === 0) {
            return a - b;
        }
        return colorCompare;
    });
}

export const getThirds = (numbers) => {
    const thirds = {first: [], second: [], third: []}
    numbers.forEach((number, index) => {
        if (number < 13) thirds.first.push(number)
        else if (number < 25) thirds.second.push(number)
        else thirds.third.push(number)
    })
    return thirds
}

export const getThirdsColors = (third) => {
    const colors = {red: [], black: [], green: []}
    third.forEach((number) => {
        const color = rolletteNumbers[number].color
        colors[color]?.push(number)
    })
    return colors
}

export const getFinalNumbers = (allNumbers, numbers) => {
    const result = allNumbers.map((third, index) => {
        const redNumbers = third.red || [];
        const blackNumbers = third.black || [];
        const greenNumbers = third.green || [];
        const result = { red: [], black: [], green: [] };

        // Get 3 random numbers from each color if available
        if (redNumbers.length > 3) {
            const shuffledRed = [...redNumbers].sort(() => Math.random() - 0.5);
            result.red = shuffledRed.slice(0, 3);
        } else {
            result.red = redNumbers;
        }

        if (blackNumbers.length > 3) {
            const shuffledBlack = [...blackNumbers].sort(() => Math.random() - 0.5);
            result.black = shuffledBlack.slice(0, 3);
        } else {
            result.black = blackNumbers;
        }

        // Always include green numbers since there's only one (0)
        result.green = greenNumbers;

        // // If red has less than 3, borrow from black
        // if (result.red.length < 3 && blackNumbers.length > 3) {
        //     const needed = 3 - result.red.length;
        //     const remainingBlack = blackNumbers.filter(n => !result.black?.includes(n) && numbers?.includes(n));
        //     const shuffledRemaining = [...remainingBlack].sort(() => Math.random() - 0.5);
        //     result.red = result.red.concat(shuffledRemaining.slice(0, needed));
        // }

        // // If black has less than 3, borrow from red
        // if (result.black.length < 3 && redNumbers.length > 3) {
        //     const needed = 3 - result.black.length;
        //     const remainingRed = redNumbers.filter(n => !result.red?.includes(n) && numbers?.includes(n));
        //     const shuffledRemaining = [...remainingRed].sort(() => Math.random() - 0.5);
        //     result.black = result.black.concat(shuffledRemaining.slice(0, needed));
        // }

        // // Check if total numbers is less than 5 (excluding green)
        // const totalNumbers = result.red.length + result.black.length;
        // if (totalNumbers < 5) {
        //     // Get all numbers from other thirds that haven't been picked
        //     const otherThirdsNumbers = allNumbers.reduce((acc, curr, i) => {
        //         if (i !== index) {
        //             const redNums = curr.red || [];
        //             const blackNums = curr.black || [];
        //             return [...acc, ...redNums, ...blackNums];
        //         }
        //         return acc;
        //     }, []);

        //     // Filter out numbers that are already in result and ensure they're in numbers array
        //     const availableNumbers = otherThirdsNumbers.filter(n => 
        //         !result.red?.includes(n) && 
        //         !result.black?.includes(n) && 
        //         numbers?.includes(n)
        //     );

        //     // Randomly select needed numbers
        //     const needed = 5 - totalNumbers;
        //     const shuffledAvailable = [...availableNumbers].sort(() => Math.random() - 0.5);
        //     const borrowedNumbers = shuffledAvailable.slice(0, needed);

        //     // Add borrowed numbers to red or black based on their original color
        //     borrowedNumbers.forEach(num => {
        //         const color = rolletteNumbers[num].color;
        //         if (color === 'red') {
        //             result.red.push(num);
        //         } else if (color === 'black') {
        //             result.black.push(num);
        //         }
        //     });
        // }

        // Sort the arrays before returning
        result.red.sort((a, b) => a - b);
        result.black.sort((a, b) => a - b);
        result.green.sort((a, b) => a - b);

        return result;
    });

    return result;
}

export const getSeventeenNumbers = (finalNumbers, allNumbers) => {
    const result = {
        first: { red: [], black: [], green: [] },
        second: { red: [], black: [], green: [] }, 
        third: { red: [], black: [], green: [] }
    };

    // Helper function to get random numbers from array
    const getRandomNumbers = (arr, count) => {
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    // Process each third
    finalNumbers.forEach((third, index) => {
        const targetSection = index === 0 ? result.first : 
                            index === 1 ? result.second : result.third;

        // Copy numbers from finalNumbers
        targetSection.red = [...third.red];
        targetSection.black = [...third.black];
        targetSection.green = [...third.green];

        // Handle green number (only for first third)
        if (index === 0 && third.green.length > 0) {
            targetSection.green = [0];
        }

        // Count total numbers in this third
        const totalNumbers = targetSection.red.length + targetSection.black.length + targetSection.green.length;
        
        // If less than 5 numbers, add random numbers from numbers array
        if (totalNumbers < 5) {
            const needed = 5 - totalNumbers;
            
            // Get all numbers currently in result
            const usedNumbers = [
                ...result.first.red, ...result.first.black, ...result.first.green,
                ...result.second.red, ...result.second.black, ...result.second.green,
                ...result.third.red, ...result.third.black, ...result.third.green
            ];

            // Get numbers that are in numbers array but not used yet
            const availableNumbers = Array.from({length: 37}, (_, i) => i)
                .filter(n => !usedNumbers.includes(n));
            
            // Get random numbers from available numbers
            const additional = getRandomNumbers(availableNumbers, needed);
            
            // Add additional numbers based on their original color
            additional.forEach(num => {
                const color = rolletteNumbers[num].color;
                if (color === 'red') {
                    targetSection.red.push(num);
                } else if (color === 'black') {
                    targetSection.black.push(num);
                } else if (color === 'green') {
                    targetSection.green.push(num);
                }
            });
        }
    });

    return [result.first, result.second, result.third];
};
