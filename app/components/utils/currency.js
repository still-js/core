export function convertToAkzCurrency(value) {
    const formatter = new Intl.NumberFormat('ao-AO',
        {
            style: 'currency', currency: 'AKZ',
            maximumFractionDigits: 2, minimumFractionDigits: 2
        }
    );

    return formatter.format(value);
}


/**
 * Move this to Utility class of function
 */


/**
 * @param { Date } date
 */
export function convertDateToEuStr(date) {
    return date.toLocaleString();
}

export function cleanCurrencyValue(val) {
    return val
        .replace('AKZ', '')
        .replace('.', '')
        .replace(',', '.')
        .trim()
}

export function cleanMoedaValue(val) {
    return val
        .replace("AKZ", "")
        .replace(",", ".")
        .replace(/\s/g, "")
        .trim()
}

export function cleanHorasValue(val) {
    return val
        .replace('Hrs', '')
        .trim()
}


window.convertToAkzCurrency = convertToAkzCurrency;
window.convertDateToEuStr = convertDateToEuStr;
window.cleanCurrencyValue = cleanCurrencyValue;
window.cleanMoedaValue = cleanMoedaValue;
window.cleanHorasValue = cleanHorasValue;