import { IElementsTile } from "../elements/Tile";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IHomePageTiles<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "home-page.tiles";
      tiles?: IElementsTile[];
    },
    ExtractFlat<Populate>
  >;
