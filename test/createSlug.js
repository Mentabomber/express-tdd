
module.exports =  function (str, array){

    if (typeof str !== "string") {
        throw new Error("input must be a string");
    }
        
    let slug = str;

    // to kebab-case

    let kebabCaseSlug = slug.replace(/ /g, "-");

    // if true create new unique slug
    for (let index = 0; index < array.length; index++) {
        //creo nuovo slug
        let nuovoSlug = kebabCaseSlug + (index === 0 ?  "" : `-${index}`);  
        // controllo se il nuovo slug esiste
        const slugExists = array.some(existingSlug => existingSlug.slug === nuovoSlug);
        // se si return
        if (!slugExists) {
            return (index === 0 ? kebabCaseSlug : nuovoSlug).toLowerCase(); 
        }
    }


}
