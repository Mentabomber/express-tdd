const slugs = [
    
    {
        "title": "slug mario",
        "slug": "slug-mario"          
    },
    {
        "title": "slug mario 1",
        "slug": "slug-mario-1"          
    },
    {
        "title": "slug marione",
        "slug": "slug-marione"          
    }

];


module.exports =  function (str){

    if (typeof str !== "string") {
        throw new Error("input must be a string");
    }
        
    let slug = str;

    let i = 1;

    do {
        // Generate a new slug by replacing spaces with "-", adding the counter, and converting to lowercase
        const newSlug = slug.replace(/ /g, "-") + (i > 1 ? `-${i}` : "");

        // Check if the newly generated slug or modified slug with the counter already exists in the slugs array
        const slugExists = slugs.some(existingSlug => existingSlug.slug === slug || existingSlug.slug === newSlug);

        // If the slug exists, increment the counter; otherwise, use the current counter value
        i = slugExists ? i + 1 : i;

        // Update the slug with the modified counter
        slug = slug.replace(/ /g, "-") + (i > 1 ? `-${i}` : "");

    } while (slugs.some(existingSlug => existingSlug.slug === slug));

    return slug.toLowerCase();
  
    // slug.split("").map((char) => {
    //     if (char === " "){
    //         return "-";
    //     }
    // return char;
    // }).join("").toLowerCase();

}
