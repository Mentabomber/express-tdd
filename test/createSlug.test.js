const {test, expect} = require("@jest/globals");

const createSlug = require("./createSlug");

test("createSlug dovrebbe ritornare una stringa", () => {
    const testo = "questa è una stringa";
    const result = createSlug(testo);

    expect(typeof result).toBe("string");
})
