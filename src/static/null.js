

/**
 * the isNull function checks if an element is null, undefined or empty
 * @param {Object} el - element
 * @return {boolean} - return True if null, otherwise false
 */
const isNull = (el)=>{
    if(el === undefined ||
        el === null ){
            return true;
    }
    return false;
};


export {isNull};