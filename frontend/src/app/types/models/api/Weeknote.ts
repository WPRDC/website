import { IAuthor } from "./Author";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IWeeknote<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      article: string | null;
      author?: { data: IAuthor<ExtractNested<Populate, "author">> | null };
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
