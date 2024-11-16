export interface HomeNewsPost {
  postId: number;
  content: string;
  author: string;
  creationDate: Date;
  image: Uint8Array;
  mainArticleId: number;
}
