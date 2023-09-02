import { IElementsLink } from "../elements/Link";
import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type INavbarSubMenuItem<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "navbar.sub-menu-item";
      link?: IElementsLink | null;
      deatailLine: string | null;
      description: string | null;
      icon?: { data: IMedia | null };
      subItems?: IElementsLink[];
    },
    ExtractFlat<Populate>
  >;
