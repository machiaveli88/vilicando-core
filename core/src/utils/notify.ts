import Push, { PushNotification, PushNotificationParams } from 'push.js';

export default (
  title: string,
  options?: PushNotificationParams
): Promise<PushNotification> =>
  typeof window === 'undefined'
    ? new Promise(() => {})
    : Push.create(title, options);
