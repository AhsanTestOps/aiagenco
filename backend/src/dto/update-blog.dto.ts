export class UpdateBlogDto {
  slug?: string;
  title?: string;
  description?: string;
  content?: string;
  image?: string;
  imageLink?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  author?: string;
}
