import { SchemaType } from "@google/generative-ai";

const AI_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "getAllTags",
        description: "Gets all recipe tags used in the website",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
    ],
  },
  {
    functionDeclarations: [
      {
        name: "getAllRecipes",
        description: "Gets all recipes used in the website",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
    ],
  },
];

export { AI_TOOLS };
