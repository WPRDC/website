import { IMedia } from "../builtins/Media";
import { IElementsLink } from "./elements/Link";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IArtifact<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      title: string | null;
      subtitle: string | null;
      primaryImage?: { data: IMedia | null };
      images?: { data: IMedia[] };
      slug: string | null;
      publicationDate: string | null;
      links?: IElementsLink[];
      category: "presentation" | "report" | null;
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
