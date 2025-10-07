import { ALL_TAGS } from "@/lib/tags";
import { Ingredient } from "@/lib/types";
import { askGemini } from "../aifun";

export async function suggestTags(recipeName: string, ingredients: Ingredient[]) {
    // const prompt = `For the following recipe known as ${recipeName}, which contains the following ingredients
    //  ${JSON.stringify(ingredients)}, suggest me 10-15 tags I could use from the following list: ${ALL_TAGS}. Give me
    //  the solution in JSON format only`

    const prompt = `For the following recipe known as ${recipeName}, which contains the following ingredients
     ${JSON.stringify(ingredients)}, suggest me 10-15 recipe tags I could assign here (from the ones available on the website). Give me
     the solution in a comma separated string.`
    

     const response = await askGemini(prompt);
     return response;
}