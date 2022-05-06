import {Item} from "./types";

const MOCK: Item[] = [
  {
    id: 1,
    text: "Chocolate ice cream",
  },
  {
    id: 2,
    text: "Sandwich",
  },
  {
    id: 3,
    text: "Sushi",
  },
];

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
