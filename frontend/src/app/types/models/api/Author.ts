import { IBlog } from "./Blog";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IAuthor<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      name: string | null;
      email: string | null;
      blogs?: { data: IBlog<ExtractNested<Populate, "blogs">>[] };
      slug: string | null;
      bio: string | null;
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
