export function getLastMondayDate(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // Calculate how many days to subtract to get the last Monday
    const daysToSubtract = (dayOfWeek === 0) ? 6 : (dayOfWeek - 1);
    // Subtract those days from today's date
    today.setDate(today.getDate() - daysToSubtract);
    
    // Format the date as dd-MM-yyyy
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    
    return `${day}-${month}-${year}`;
}