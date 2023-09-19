module.exports = (html,data) =>{
    return Object.keys(data).reduce((result, prop) =>{
        result = result.replaceAll(`{{${prop}}}`, data[prop]);
        return result;
    },html)
}