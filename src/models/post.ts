import { Detail } from "./detail";

export class Post {
  constructor(
    public title: string,
    public description: string,
    public details: Detail[]) {}
}
