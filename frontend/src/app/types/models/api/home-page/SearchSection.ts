import { IElementsButton } from "../elements/Button";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IHomePageSearchSection<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "home-page.search-section";
      title: string | null;
      description: string | null;
      belowSearchText: string | null;
      buttons?: IElementsButton[];
    },
    ExtractFlat<Populate>
  >;
