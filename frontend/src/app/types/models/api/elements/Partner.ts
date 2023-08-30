import { IMedia } from "../../builtins/Media";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IElementsPartner<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "elements.partner";
      partnerURL: string | null;
      partnerName: string | null;
      partnerLogo?: { data: IMedia | null };
    },
    ExtractFlat<Populate>
  >;
