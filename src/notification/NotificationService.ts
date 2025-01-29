

interface NotificationData {
  [key: string]: any;
}

interface PushMessage {
  to: string;
  sound: string;
  title: string;
  body: string;
  data: NotificationData;
}

class NotificationService {
  private static instance: NotificationService;
  private constructor() {
    // Private constructor to prevent direct construction calls with 'new'
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async sendPushNotification({
    body,
    data = {},
    expoPushToken,
    title,
  }: {
    expoPushToken: string;
    title: string;
    body: string;
    data?: NotificationData;
  }): Promise<void> {
    if (!expoPushToken) return;

    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data,
    };

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      console.log({ response });
    } catch (e) {
      console.log({ e });
    }
  }
}

// Usage example:
export default NotificationService.getInstance();
