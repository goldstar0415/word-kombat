const shuffle = require("../../util/shuffle");

describe("Shuffle function", () => {

  it("should return an array", () => {
    expect(Array.isArray(shuffle("word"))).toBeTruthy();
  });

  it("should shuffle letters in word", () => {
    expect(shuffle("word").length).toEqual("word".length);
    expect(shuffle("word")).not.toEqual("word");
  });

  it("should work with random tests", () => {
    for(let i = 0; i < 100; i++) {
      let word = "";
      for(let j = 0; j < Math.random() * 20 + 2; j++) {
        word += String.fromCharCode(Math.random() * 26 + 62);
      }
      expect(shuffle(word).length).toEqual(word.length);
      expect(shuffle(word)).not.toEqual(word);
    }
  });

  it("should handle empty words", () => {
    expect(shuffle("")).toEqual([]);
  });

  it("should handle null values", () => {
    expect(shuffle(null)).toEqual([]);
  });

});