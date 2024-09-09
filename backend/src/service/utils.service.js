export const shuffle = (array) => {
    array.sort( () => .5 - Math.random() );
    return array;
}