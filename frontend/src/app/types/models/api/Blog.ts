import { IAuthor } from "./Author";
import { ITag } from "./Tag";
import { ICategory } from "./Category";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IBlog<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      author?: { data: IAuthor<ExtractNested<Populate, "author">> | null };
      tags?: { data: ITag<ExtractNested<Populate, "tags">>[] };
      category?: {
        data: ICategory<ExtractNested<Populate, "category">> | null;
      };
      slug: string | null;
      subtitle: string | null;
      excerpt: string | null;
      article: string | null;
      publishDate: string | null;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      createdBy?: {
        data: IAdminuser<ExtractNested<Populate, "createdBy">> | null;
      };
      updatedBy?: {
        data: IAdminuser<ExtractNested<Populate, "updatedBy">> | null;
      };
    },
    ExtractFlat<Populate>
  >;
}
