import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type INavbarNavbarLogo<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "navbar.navbar-logo";
      lightImage?: { data: IMedia | null };
      darkImage?: { data: IMedia | null };
      homeURL: string | null;
      altText: string | null;
    },
    ExtractFlat<Populate>
  >;
