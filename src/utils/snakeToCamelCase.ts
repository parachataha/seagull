/**
 * 
 * Converts a snake_case word to camelCase
 * 
 * Example usage:
 * snakeToCamelCase("hello_world") --> helloWorld
 * snakeToCamelCase("word") --> word
 * snakeToCamelCase("first_name") --> firstName
 * 
 */

import capitalize from "./capitalize";

export default function snakeToCamelCase(text : string) : string {

    const textArray = text.split("_");
    let newText = textArray[0]

    textArray.forEach((word : string, index : number) => {
        if (index !== 0) {
            newText = newText + capitalize(word)
        }
    })

    return newText

}