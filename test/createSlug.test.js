const {test, expect} = require("@jest/globals");

const createSlug = require("./createSlug");

test("createSlug dovrebbe ritornare una stringa", () => {
    const testo = "questa è una stringa";
    const result = createSlug(testo);

    expect(typeof result).toBe("string");
})

test("createSlug dovrebbe ritornare un testo tutto in lowercase", () => {
    const testo = "TeStO";
    const result = createSlug(testo);

    expect(result).toBe("testo");
})

test("createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -", () => {
    const testo = "questo è un testo"
    const result = createSlug(testo);

    expect(result).toBe("questo-è-un-testo");
})

test("createSlug dovrebbe incrementare di 1 lo slug quando esiste già", () => {
    const testo = "slug mario";
    const result = createSlug(testo);

    expect(result).toBe("slug-mario-2");
})
