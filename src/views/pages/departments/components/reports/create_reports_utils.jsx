export const formatDateForDatabase = (inputDate) => {
    const dateParts = inputDate.split('-');
    const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
    return formattedDate;
};

export const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return dd + '.' + mm + '.' + yyyy;
};

export const isClientExist = (clientId, clientdata) => {
    return clientdata.some(client => {
        return (
            client.clients.toLowerCase().replace(/\s/g, '') === clientId.clients.toLowerCase().replace(/\s/g, '') &&
            client.buyer_logist === clientId.buyer_logist
        );
    });
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    return new Date(year, month - 1, day);
};

export const isClientExisValue = (clientId, clientdata) => {
    return clientdata.some(client => {
        return (
            client.clients.toLowerCase().replace(/\s/g, '') === clientId.clients.toLowerCase().replace(/\s/g, '') &&
            client.buyer_logist === clientId.buyer_logist &&
            parseFloat(client.summa) <= 50000 &&
            parseFloat(client.order_count) <= 10 &&
            parseDate(client.date_go) > parseDate(getCurrentDate())
        );
    });
};