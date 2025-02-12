/**
 * 
 * Basic utility to capitalize the first letter
 * 
 * @param text - uncapitalized text
 * @returns string - capitalized text
 * 
 */

export default function capitalize(text : string) : string {

    return String(text).charAt(0).toUpperCase() + String(text).slice(1);

}