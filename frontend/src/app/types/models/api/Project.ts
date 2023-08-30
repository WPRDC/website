import { IMedia } from "../builtins/Media";
import { ITag } from "./Tag";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IProject<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      subtitle: string | null;
      url: string | null;
      githubURL: string | null;
      thumbnail?: { data: IMedia | null };
      screenshots?: { data: IMedia[] };
      order: number | null;
      tags?: { data: ITag<ExtractNested<Populate, "tags">>[] };
      slug: string | null;
      description: string | null;
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
