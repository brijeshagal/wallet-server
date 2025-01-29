import { Actions } from "../../enums/actions";
import { CompleteFormToken } from "../token/quote";

export type RequestActionNotification = {
  backRoute: string; // The route to navigate back to
  screenRoute: string; // The deep link route (can be a URL)
  toToken: CompleteFormToken; // The recipient's push token (Expo push token or FCM token)
  type: Actions; // Type of the notification
  recipient: string;
};
