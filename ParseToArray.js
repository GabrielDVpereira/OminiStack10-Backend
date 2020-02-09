module.exports = function parseToArray(data){
        const array = data.split(',').map(item => item.trim()); 
        return array;
}