import { IElementsPartner } from "../elements/Partner";
import { IElementsButton } from "../elements/Button";
import { ExtractNested } from "../../builtins/ExtractNested";
import { ExtractFlat } from "../../builtins/ExtractFlat";
import { RequiredBy } from "../../builtins/RequiredBy";
export type IHomePageCollaborators<Populate extends string | never = never> =
  RequiredBy<
    {
      id: number;
      __component: "home-page.collaborators";
      partners?: IElementsPartner<ExtractNested<Populate, "partners">>[];
      publishers?: IElementsPartner<ExtractNested<Populate, "publishers">>[];
      header: string | null;
      description: string | null;
      callToActionText: string | null;
      button?: IElementsButton | null;
    },
    ExtractFlat<Populate>
  >;
