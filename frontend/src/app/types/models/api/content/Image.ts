import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IContentImage<Populate extends string | never = never> = RequiredBy<
  {
    id: number;
    __component: "content.image";
    images?: { data: IMedia[] };
  },
  ExtractFlat<Populate>
>;
