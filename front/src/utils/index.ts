/**
 * Capitalizes a string input.
 * @param {string} str - The string to be capitalized.
 */
 export const capitalize = (str: string) => {
  if (typeof (str) !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const slugify = (str: string) => {
    if(!str || str === '') return
  
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    const from = 'ãàáäâáº½èéëêìíïîõòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeeiiiiooooouuuunc------';
    for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
  
    return str;
};

export const getNextMonth = (months = 1) => {
    const date = new Date();
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    
    if (date.getDate() !== d) {
        date.setDate(0);
    }
    return date;
};