import { IElementsLink } from "./elements/Link";
import { INavbarSubMenuItem } from "./navbar/SubMenuItem";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface INavMenuItem<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      primaryLink?: IElementsLink | null;
      subMenu?: INavbarSubMenuItem<ExtractNested<Populate, "subMenu">>[];
      defaultDescription: string | null;
      order: number | null;
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
