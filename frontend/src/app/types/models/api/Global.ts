import { IElementsLogo } from "./elements/Logo";
import { IElementsLink } from "./elements/Link";
import { ISharedSeo } from "./shared/Seo";
import { ISharedMetadata } from "./shared/Metadata";
import { IMedia } from "../builtins/Media";
import { IAdminuser } from "../admin/User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IGlobal<Populate extends string | never = never> {
  id: number;
  attributes: RequiredBy<
    {
      navbarLogo?: IElementsLogo<ExtractNested<Populate, "navbarLogo">> | null;
      navbarLinks?: IElementsLink[];
      footerLogo?: IElementsLogo<ExtractNested<Populate, "footerLogo">> | null;
      affiliateLogos?: IElementsLogo<
        ExtractNested<Populate, "affiliateLogos">
      >[];
      footerLinks?: IElementsLink[];
      seo?: ISharedSeo<ExtractNested<Populate, "seo">> | null;
      metadata?: ISharedMetadata | null;
      favicon?: { data: IMedia | null };
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      createdBy?: {
        data: IAdminuser<ExtractNested<Populate, "createdBy">> | null;
      };
      updatedBy?: {
        data: IAdminuser<ExtractNested<Populate, "updatedBy">> | null;
      };
    },
    ExtractFlat<Populate>
  >;
}
