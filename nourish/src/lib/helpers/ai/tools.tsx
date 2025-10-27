import { SchemaType, Tool } from "@google/generative-ai";

const AI_TOOLS : Tool[] = [
  {
    functionDeclarations: [
      {
        name: "getAllTags",
        description: "Gets all recipe tags used in the website. It does not return any recipes, just the tags. Only call when asked about what tags there are.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
      {
        name: "getAllRecipes",
        description: "Gets all recipes used in the website",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
      {
        name: "getFavoriteRecipes",
        description: "Gets all favorite recipes used in the website",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
      {
        name: "getFilteredRecipesByTags",
        description:
          "Gets all recipes that match ALL of the given tags (returns recipes that have all the tags specified)",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "tags" : {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                },
            }
          },
          description: "Array of tags to filter recipes by",
          required: ["tags"],
        },
      },
      {
        name: "getFilteredRecipesByIngredients",
        description:
          "Gets all recipes that match ALL of the given ingredients (returns recipes that have all the ingredients specified)",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "ingredients" : {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                },
            }
          },
          description: "Array of ingredients to filter recipes by",
          required: ["ingredients"],
        },
      },
      {
        name: "getFilteredRecipeById",
        description:
          "Gets the recipe with the specified ID",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeId" : {
                type: SchemaType.INTEGER,
            }
          },
          required: ["recipeId"],
        },
      },
      {
        name: "getFilteredRecipeByName",
        description:
          "Gets the recipe with the specified name",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeName" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeName"],
        },
      },
      {
        name: "getRecipeIngredients",
        description:
          "Gets the ingredients for the recipe with the specified name",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeName" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeName"],
        },
      },
      {
        name: "getRecipeTags",
        description:
          "Gets the tags for the recipe with the specified name",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeName" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeName"],
        },
      },
      {
        name: "getRecipeInstructions",
        description:
          "Gets the instructions for the recipe with the specified name",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeName" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeName"],
        },
      },
      {
        name: "getRecipeDescription",
        description:
          "Gets the description for the recipe with the specified name",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeName" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeName"],
        },
      },
      {
        name: "navigateToRecipe",
        description:
          "Navigates to the recipe page with the specified name.",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            "recipeNameToNavigate" : {
                type: SchemaType.STRING,
            }
          },
          required: ["recipeNameToNavigate"],
        },
      },
    ],
  },
];

export { AI_TOOLS };
