import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IElementsLogo<Populate extends string | never = never> = RequiredBy<
  {
    id: number;
    __component: "elements.logo";
    image?: { data: IMedia | null };
    darkImage?: { data: IMedia | null };
    altText: string | null;
  },
  ExtractFlat<Populate>
>;
