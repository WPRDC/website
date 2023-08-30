import { IHomePageSearchSection } from "./home-page/SearchSection";
import { IHomePageTiles } from "./home-page/Tiles";
import { IHomePageCollaborators } from "./home-page/Collaborators";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IHome<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      searchSection?: IHomePageSearchSection<
        ExtractNested<Populate, "searchSection">
      > | null;
      blurbs?: IHomePageTiles<ExtractNested<Populate, "blurbs">> | null;
      publishers?: IHomePageCollaborators<
        ExtractNested<Populate, "publishers">
      > | null;
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
