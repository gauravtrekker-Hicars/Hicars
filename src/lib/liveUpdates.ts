type LiveUpdateConfig = {
  eventName: string;
  storageKey: string;
  channelName?: string;
};

const DEFAULT_CHANNEL_NAME = 'hicars-live-updates';

export function publishLiveUpdate(config: LiveUpdateConfig) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(config.eventName));

  if (typeof window.BroadcastChannel === 'function') {
    const channel = new BroadcastChannel(config.channelName || DEFAULT_CHANNEL_NAME);
    channel.postMessage(config.eventName);
    channel.close();
  }
}

export function subscribeLiveUpdate(config: LiveUpdateConfig, handler: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const onEvent = () => handler();
  const onStorage = (event: StorageEvent) => {
    if (event.key === config.storageKey) {
      handler();
    }
  };

  let channel: BroadcastChannel | null = null;
  const onMessage = (event: MessageEvent<string>) => {
    if (event.data === config.eventName) {
      handler();
    }
  };

  window.addEventListener(config.eventName, onEvent);
  window.addEventListener('storage', onStorage);

  if (typeof window.BroadcastChannel === 'function') {
    channel = new BroadcastChannel(config.channelName || DEFAULT_CHANNEL_NAME);
    channel.addEventListener('message', onMessage);
  }

  return () => {
    window.removeEventListener(config.eventName, onEvent);
    window.removeEventListener('storage', onStorage);
    channel?.removeEventListener('message', onMessage);
    channel?.close();
  };
}