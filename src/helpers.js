export const getFullName = ({ first_name, last_name }) => `${first_name} ${last_name}`
export const getDate = (timeStamp) => new Date(timeStamp).toDateString().slice(4)