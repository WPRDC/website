import { IMedia } from "../builtins/Media";
import { ITag } from "./Tag";
import { IElementsLink } from "./elements/Link";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface ITool<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      subtitle: string | null;
      thumbnail?: { data: IMedia | null };
      description: string | null;
      url: string | null;
      slug: string | null;
      tags?: { data: ITag<ExtractNested<Populate, "tags">>[] };
      order: number | null;
      docURL: string | null;
      screenshots?: { data: IMedia[] };
      githubURL: string | null;
      relatedPages?: IElementsLink[];
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
