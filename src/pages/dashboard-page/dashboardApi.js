import * as statisticsApi from '../../api/analytics/statistics.js';
import * as groupsApi from '../../api/subscribes/groups.js';
import * as taskApi from '../../api/task/tasks.js';
import { getToken } from '../../api/API.js';

export async function getBasicStatistics(period) {
  const access_token = getToken('accessToken');
  const to_time = Math.round(Date.now() / 1000);
  const from_time = Math.round(to_time - period / 1000);

  const total_subscribers = (await groupsApi.get_subscribers_count(access_token)).data.count;

  const tasks = (await taskApi.list(access_token)).data;
  const total_campaigns = tasks.length;
  const total_emails = tasks.reduce((acc, task) => acc + task.recipients, 0);

  const total_send_emails = (
    await statisticsApi.get_emails_statistics(access_token, {
      from_time,
      to_time,
    })
  ).data[0];

  const sent_rate = (
    await statisticsApi.get_emails_statistics(access_token, {
      from_time,
      to_time,
      status: {
        Equal: 'Sent',
      },
    })
  ).data[0];

  const baunce_rate = (
    await statisticsApi.get_emails_statistics(access_token, {
      from_time,
      to_time,
      status: {
        NotEqual: 'Sent',
      },
    })
  ).data[0];

  const open_rate = (
    await statisticsApi.get_events_statistics(access_token, {
      from_time,
      to_time,
      event: {
        In: ['Opened', 'Shared'],
      },
    })
  ).data[0];

  const unsubscribe_rate = (
    await statisticsApi.get_emails_statistics(access_token, {
      from_time,
      to_time,
      is_unsubscribed: true,
    })
  ).data[0];

  const click_rate = (
    await statisticsApi.get_emails_statistics(access_token, {
      from_time,
      to_time,
      is_clicked: true,
    })
  ).data[0];

  return {
    open_rate: {
      rate: open_rate / sent_rate || 0,
      value: open_rate,
    },
    click_rate: {
      rate: click_rate / sent_rate || 0,
      value: click_rate,
    },
    unsubscribe_rate: {
      rate: unsubscribe_rate / sent_rate || 0,
      value: unsubscribe_rate,
    },
    baunce_rate: {
      rate: baunce_rate / sent_rate || 0,
      value: baunce_rate,
    },
    delivery_rate: {
      rate: sent_rate / total_send_emails || 0,
      value: sent_rate,
    },
    campaigns: {
      value: total_campaigns,
      emails: total_emails,
    },
    total_subscribers: {
      value: total_subscribers,
    },
  };
}

export async function getSubscriptionsStatistics(period) {
  const access_token = getToken('accessToken');
  const to_time = Math.round(Date.now() / 1000);
  const from_time = Math.round(to_time - period / 1000);

  const subscriptions = (
    await statisticsApi.get_subscriptions_statistics(access_token, {
      from_time,
      to_time,
      action: 'Subscription',
    })
  ).data[0];

  const unsubscriptions = (
    await statisticsApi.get_subscriptions_statistics(access_token, {
      from_time,
      to_time,
      action: 'Unsubscription',
    })
  ).data[0];

  return {
    subscriptions: subscriptions,
    unsubscriptions: unsubscriptions,
  };
}

export async function getAudienceListGrowth(period) {
  const access_token = getToken('accessToken');
  const to_time = Math.round(Date.now() / 1000);
  const from_time = Math.round(to_time - period / 1000);

  const subscriptions = (
    await statisticsApi.get_subscriptions_statistics(access_token, {
      from_time,
      to_time,
      action: 'Subscription',
      parts_count: 10,
    })
  ).data;

  const unsubscriptions = (
    await statisticsApi.get_subscriptions_statistics(access_token, {
      from_time,
      to_time,
      action: 'Unsubscription',
      parts_count: 10,
    })
  ).data;

  const audience_growth = [];
  for (let i = 0; i < 10; i++) {
    audience_growth.push(subscriptions[i] - unsubscriptions[i]);
  }

  return audience_growth;
}

export async function getDailyOpenStatistics(day) {
  const access_token = getToken('accessToken');
  const from_time = Math.round(day / 1000);
  const to_time = from_time + 24 * 60 * 60;

  const opens = (
    await statisticsApi.get_events_statistics(access_token, {
      from_time,
      to_time,
      event: {
        In: ['Opened', 'Shared'],
      },
      parts_count: 24,
    })
  ).data;

  return opens;
}

export async function getDailyClickStatistics(day) {
  const access_token = getToken('accessToken');
  const from_time = Math.round(day / 1000);
  const to_time = from_time + 24 * 60 * 60;

  const clicks = (
    await statisticsApi.get_clicks_statistics(access_token, {
      from_time,
      to_time,
      parts_count: 24,
    })
  ).data;

  return clicks;
}

/*
result example: {
    "total_users": 100,
    "incognito_mail_clients": 10,
    "incognito_devices": 10,
    "incognito_langs": 10,
    "incognito_time_zones": 10,
    "mail_clients": {
        "gmail": 10,
        "yahoo": 10,
        "mailru": 10
    },
    "devices": {
        "mobile": 10,
        "desktop": 10
    },
    "langs": {
        "en-US": 10,
        "ru-RU": 10
    },
    "time_zones": {
        "3": 10,
        "4": 10
    }
}
*/
export async function getUsersStatistics() {
  const access_token = getToken('accessToken');
  const statistics = (await statisticsApi.get_users_statistics(access_token)).data;

  return {
    total_users: statistics.total_users,
    incognito_mail_clients: {
      rate: statistics.incognito_mail_clients / statistics.total_users || 0,
      value: statistics.incognito_mail_clients,
    },
    incognito_devices: {
      rate: statistics.incognito_devices / statistics.total_users || 0,
      value: statistics.incognito_devices,
    },
    incognito_langs: {
      rate: statistics.incognito_langs / statistics.total_users || 0,
      value: statistics.incognito_langs,
    },
    incognito_time_zones: {
      rate: statistics.incognito_time_zones / statistics.total_users || 0,
      value: statistics.incognito_time_zones,
    },
    mail_clients: statistics.mail_clients.length
      ? Object.entries(statistics.mail_clients).reduce((map, [key, value]) => {
          map.set(key, {
            rate: value / statistics.total_users || 0,
            value: value,
          });
          return map;
        }, new Map())
      : new Map(),
    devices: statistics.devices.length
      ? Object.entries(statistics.devices).reduce((map, [key, value]) => {
          map.set(key, {
            rate: value / statistics.total_users || 0,
            value: value,
          });
          return map;
        })
      : new Map(),
    langs: statistics.langs.length
      ? Object.entries(statistics.langs).reduce((map, [key, value]) => {
          map.set(key, {
            rate: value / statistics.total_users || 0,
            value: value,
          });
          return map;
        })
      : new Map(),
    time_zones: statistics.time_zones.length
      ? Object.entries(statistics.time_zones).reduce((map, [key, value]) => {
          map.set(key, {
            rate: value / statistics.total_users || 0,
            value: value,
          });
          return map;
        })
      : new Map(),
  };
}
