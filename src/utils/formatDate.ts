import { Dayjs } from 'dayjs';

const formatDate = (timestamp: Dayjs): string => timestamp.format('YYYY-MM-DD, h:mm A');

export default formatDate;
