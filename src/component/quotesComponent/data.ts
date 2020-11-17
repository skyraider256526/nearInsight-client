export interface Quote {
  _id: number;
  quote: string;
  cite: string;
}

const quotes: Quote[] = [
  {
    _id: 1,
    quote: "“Not all those who wander are lost.”",
    cite: "J.R.R. Tolkien, The Fellowship of the Ring",
  },
  {
    _id: 2,
    quote:
      "“The world is a book and those who do not travel read only one page.”",
    cite: "St. Augustine",
  },
  {
    _id: 3,
    quote:
      "“Why do you go away? So that you can come back. So that you can see the place you came from with new eyes and extra colors. And the people there see you differently, too. Coming back to where you started is not the same as never leaving.”",
    cite: "Terry Pratchett, A Hat Full of Sky",
  },
];

export default quotes;
