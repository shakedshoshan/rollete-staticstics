export const saveNumbers = (numbers) => {
  try {
    localStorage.setItem('numbers', JSON.stringify(numbers));
  } catch (error) {
    console.error('Error saving numbers to localStorage:', error);
  }
};

export const getNumbers = () => {
  try {
    const numbers = localStorage.getItem('numbers');
    return numbers ? JSON.parse(numbers) : [];
  } catch (error) {
    console.error('Error getting numbers from localStorage:', error);
    return [];
  }
};
