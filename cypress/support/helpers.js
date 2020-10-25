export const caseInsensitive = (str) => {
    // escape special characters
    const input = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(`${input}`, 'i');
};
