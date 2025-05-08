export const generateDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const year = String(today.getFullYear());

    return `${day}/${month}/${year}`
  }