const {test, expect} = require("@jest/globals");

const createSlug = require("./createSlug");

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
        "title": "slug mario 2",
        "slug": "slug-mario-2"          
    },
    {
        "title": "slug marione",
        "slug": "slug-marione"          
    }

];

test("createSlug dovrebbe ritornare una stringa", () => {
    const testo = "questa è una stringa";
    const result = createSlug(testo, slugs);

    expect(typeof result).toBe("string");
})

test("createSlug dovrebbe ritornare un testo tutto in lowercase", () => {
    const testo = "TeStO";
    const result = createSlug(testo, slugs);

    expect(result).toBe("testo");
})

test("createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -", () => {
    const testo = "questo è un testo"
    const result = createSlug(testo, slugs);

    expect(result).toBe("questo-è-un-testo");
})

test("createSlug dovrebbe incrementare di 1 lo slug quando esiste già", () => {
    const testo = "slug mario";
    console.log(slugs);
    const result = createSlug(testo, slugs);

    expect(result).toBe("slug-mario-3");
})


test("createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato", () => {
    
    expect(() => {
        createSlug(undefined, slugs);
      }).toThrow();

    
})

  
test("createSlug dovrebbe lanciare un errore se manca l’array dei post", () => {
    const testo = "ciao"
    expect(() => {
        createSlug(testo, undefined);
      }).toThrow();

})