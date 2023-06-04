export type QueryResponse = {
  answer: string;
  images: QueryImage[];
};

type QueryImage = {
  title: string;
  image: string;
};
