import ArticleType from "./article";

export default interface TagType {
  name: string;
  description: string;

  id: string;
  articles: ArticleType[];
}
