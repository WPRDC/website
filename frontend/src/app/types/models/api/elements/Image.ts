import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IElementsImage<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "elements.image";
      image?: { data: IMedia[] };
      altText: string | null;
      caption: string | null;
    },
    ExtractFlat<Populate>
  >;
