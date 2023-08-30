import { IAdmintransferToken } from "./TransferToken";
import { IAdminuser } from "./User";
import { ExtractNested } from "../builtins/ExtractNested";
import { ExtractFlat } from "../builtins/ExtractFlat";
import { RequiredBy } from "../builtins/RequiredBy";
export interface IAdmintransferTokenPermission<
  Populate extends string | never = never
> {
  id: number;
  attributes: RequiredBy<
    {
      action: string | null;
      token?: {
        data: IAdmintransferToken<ExtractNested<Populate, "token">> | null;
      };
      createdAt: string | null;
      updatedAt: string | null;
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
