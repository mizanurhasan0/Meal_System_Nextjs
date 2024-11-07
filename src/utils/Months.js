
const GetMonth = (num = 0, name = "month") => {
    const date = new Date(num);
    return name === 'month' ? date.toLocaleString('default', { month: 'long' }) : String(date.getDate()).padStart(2, 0);
};
export default GetMonth; 
