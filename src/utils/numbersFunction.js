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
    const colors = {red: [], black: []  }
    third.forEach((number) => {
        const color = rolletteNumbers[number].color
        colors[color]?.push(number)
    })
    return colors
}

export const getFinalNumbers = (allNumbers) => {
    const result = allNumbers.map((third, index) => {
        const redNumbers = third.red || [];
        const blackNumbers = third.black || [];
        const result = { red: [], black: [] };

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

        // If red has less than 3, borrow from black
        if (result.red.length < 3 && blackNumbers.length > 3) {
            const needed = 3 - result.red.length;
            const remainingBlack = blackNumbers.filter(n => !result.black.includes(n));
            const shuffledRemaining = [...remainingBlack].sort(() => Math.random() - 0.5);
            result.red = result.red.concat(shuffledRemaining.slice(0, needed));
        }

        // If black has less than 3, borrow from red
        if (result.black.length < 3 && redNumbers.length > 3) {
            const needed = 3 - result.black.length;
            const remainingRed = redNumbers.filter(n => !result.red.includes(n));
            const shuffledRemaining = [...remainingRed].sort(() => Math.random() - 0.5);
            result.black = result.black.concat(shuffledRemaining.slice(0, needed));
        }

        // Check if total numbers is less than 5
        const totalNumbers = result.red.length + result.black.length;
        if (totalNumbers < 5) {
            // Get all numbers from other thirds that haven't been picked
            const otherThirdsNumbers = allNumbers.reduce((acc, curr, i) => {
                if (i !== index) {
                    const redNums = curr.red || [];
                    const blackNums = curr.black || [];
                    return [...acc, ...redNums, ...blackNums];
                }
                return acc;
            }, []);

            // Filter out numbers that are already in result
            const availableNumbers = otherThirdsNumbers.filter(n => 
                !result.red.includes(n) && !result.black.includes(n)
            );

            // Randomly select needed numbers
            const needed = 5 - totalNumbers;
            const shuffledAvailable = [...availableNumbers].sort(() => Math.random() - 0.5);
            const borrowedNumbers = shuffledAvailable.slice(0, needed);

            // Add borrowed numbers to red or black based on their original color
            borrowedNumbers.forEach(num => {
                const color = rolletteNumbers[num].color;
                if (color === 'red') {
                    result.red.push(num);
                } else if (color === 'black') {
                    result.black.push(num);
                }
            });
        }

        // Sort the arrays before returning
        result.red.sort((a, b) => a - b);
        result.black.sort((a, b) => a - b);

        return result;
    });

    return result;
}
