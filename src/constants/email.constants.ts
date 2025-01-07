import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailConstants = {
  [EmailTypeEnum.WELCOME]: {
    subject: "Welcome",
    template: "welcome",
  },
  [EmailTypeEnum.FORGOT_PASSWORD]: {
    subject: "Reset your password",
    template: "password-reset",
  },
  [EmailTypeEnum.OLD_VISIT]: {
    subject: "Reset your password",
    template: "password-reset",
  },
};
