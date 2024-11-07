
const GetMonth = (num = 0, name = "month") => {
    const date = new Date();
    date.getMonth(num);
    if (name === 'month') return date.toLocaleDateString('default', { month: 'long' });
    else {
        const d = date.getDate();
        return d < 10 ? `0${d}` : d;
    }
};
export default GetMonth; 
