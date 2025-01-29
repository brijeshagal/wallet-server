import { Request, Response } from "express";
import NotificationService from "../notification/NotificationService";
import { RequestActionNotification } from "../types/actions/request";

export default class ActionsController {
  constructor() {}

  public requestAction = async (req: Request, res: Response) => {
    const reqActionData = req.body;
    const { body, data, title } = reqActionData;
    const { recipient } = data as RequestActionNotification;

    const isTwitterHandle = recipient.startsWith("@");

    const expoPushToken = "ExponentPushToken[wJbAA6LwCdjqg0cKhTJJye]";
    if (expoPushToken) {
      await NotificationService.sendPushNotification({
        body,
        title,
        data,
        expoPushToken,
      });
    } else {
      if (isTwitterHandle) {
        // if twitter given then dm
      } else {
        // @TODO define what to do in this case.
      }
    }
    res.json({ message: "Notification Sent!" });
  };
}
