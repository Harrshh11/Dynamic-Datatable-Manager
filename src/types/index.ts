export interface TableRow {
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: string | number;
}
