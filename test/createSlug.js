module.exports =  function (str){
    if (typeof str === "string") {
        let slug = str;
        return slug;
    }
    else{
        throw new Error("input must be a string");
    }
}
