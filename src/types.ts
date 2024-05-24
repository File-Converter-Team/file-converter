export type Converters = {
  [key: string]: {
    parser: (data: string) => any;
    error: string;
  };
};
