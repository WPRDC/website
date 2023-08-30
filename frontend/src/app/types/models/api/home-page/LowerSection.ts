import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IHomePageLowerSection<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "home-page.lower-section";
      header: string | null;
      description: string | null;
      sideImage?: { data: IMedia | null };
    },
    ExtractFlat<Populate>
  >;
