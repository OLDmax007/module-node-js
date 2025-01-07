import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailCombinedPayloadType } from "./email.combined-payload.type";
import { PickRequired } from "./pick-required.type";

export type EmailTypeToPayloadType = {
  [EmailTypeEnum.WELCOME]: PickRequired<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
  [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailCombinedPayloadType,
    "name" | "token" | "frontUrl"
  >;
  [EmailTypeEnum.OLD_VISIT]: PickRequired<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
};
