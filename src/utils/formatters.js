import highPriorityIcon from '../img/alarm-high.svg';
import mediumPriorityIcon from '../img/alarm-medium.svg';
import lowPriorityIcon from '../img/alarm-low.svg';

export const formatDateTime = (dateTimeString) =>
{
    try
    {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
    } catch (error)
    {
        console.error('Error formatting date:', error);
        return dateTimeString;
    }
};

export const getPriorityText = (priority) =>
{
    switch (priority)
    {
        case 1: return 'High';
        case 2: return 'Medium';
        case 3: return 'Low';
        default: return 'Unknown';
    }
};

export const getPriorityIcon = (priority) =>
{
    switch (priority)
    {
        case 1: return highPriorityIcon;
        case 2: return mediumPriorityIcon;
        case 3: return lowPriorityIcon;
        default: return null;
    }
};
