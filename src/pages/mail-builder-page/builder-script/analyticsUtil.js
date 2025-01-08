import { v4 as uuidv4 } from 'uuid';
import * as analyticsApi from '../../../api/builder/analytics.js';
import { getToken } from '../../../api/API.js';

async function initOpenTag(html, access_token, template_id) {
  const id = uuidv4();
  const open_url = (await analyticsApi.set_open_tag(access_token, template_id, id)).data.url;
  const openTag = document.createElement('img');
  openTag.setAttribute('id', id);
  openTag.setAttribute('src', open_url);
  openTag.setAttribute('style', 'display:none;');
  openTag.setAttribute('width', '1');
  openTag.setAttribute('height', '1');
  const head = html.getElementsByTagName('head')[0];
  head.appendChild(openTag);
}

async function initLinks(html, access_token, template_id, skip_links) {
  const links = html.getElementsByTagName('a');
  for (const link of links) {
    if (skip_links.includes(link.getAttribute('id'))) {
      continue;
    }
    const old_url = link.getAttribute('href');
    if (old_url) {
      const id = uuidv4();
      const url = (await analyticsApi.add_link(access_token, template_id, id, old_url)).data.url;
      link.setAttribute('id', id);
      link.setAttribute('href', url);
    }
  }
}

async function initSpamButton(html, access_token, template_id, spam_id) {
  const id = uuidv4();
  const url = (await analyticsApi.set_spam_btn(access_token, template_id, id)).data.url;
  const spamButton = html.getElementById(spam_id);
  if (spamButton) {
    spamButton.setAttribute('id', id);
    spamButton.setAttribute('href', url);
  }
}

async function initSubscribeButton(html, access_token, template_id, subscribe_id) {
  const id = uuidv4();
  const url = (await analyticsApi.set_subscribe_btn(access_token, template_id, id)).data.url;
  const subscribeButton = html.getElementById(subscribe_id);
  if (subscribeButton) {
    subscribeButton.setAttribute('id', id);
    subscribeButton.setAttribute('href', url);
  }
}

async function initUnsubscribeButton(html, access_token, template_id, unsubscribe_id) {
  const id = uuidv4();
  const url = (await analyticsApi.set_unsubscribe_btn(access_token, template_id, id)).data.url;
  const unsubscribeButton = html.getElementById(unsubscribe_id);
  if (unsubscribeButton) {
    unsubscribeButton.setAttribute('id', id);
    unsubscribeButton.setAttribute('href', url);
  }
}

async function removeAnalytics(access_token, template_id) {
  const analytics = (await analyticsApi.get_analytics(access_token, template_id)).data;
  const ids = [];
  analytics.links && ids.push(...Object.keys(analytics.links));
  analytics.open_tag_id && ids.push(analytics.open_tag_id);
  analytics.spam_btn_id && ids.push(analytics.spam_btn_id);
  analytics.subscribe_btn_id && ids.push(analytics.subscribe_btn_id);
  analytics.unsubscribe_btn_id && ids.push(analytics.unsubscribe_btn_id);
  analytics.survey_answers && ids.push(...Object.keys(analytics.survey_answers));
  for (const id of ids) {
    await analyticsApi.delete_analytics(access_token, template_id, id);
  }
}

export async function initAnalytics(textHtml, buttons = {}) {
  const parser = new DOMParser();
  const html = parser.parseFromString(textHtml, 'text/html');
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  await removeAnalytics(access_token, template_id);
  const skip_links = [];
  if (buttons.spam_id) {
    skip_links.push(buttons.spam_id);
    await initSpamButton(html, access_token, template_id, buttons.spam_id);
  }
  if (buttons.subscribe_id) {
    skip_links.push(buttons.subscribe_id);
    await initSubscribeButton(html, access_token, template_id, buttons.subscribe_id);
  }
  if (buttons.unsubscribe_id) {
    skip_links.push(buttons.unsubscribe_id);
    await initUnsubscribeButton(html, access_token, template_id, buttons.unsubscribe_id);
  }
  await initOpenTag(html, access_token, template_id);
  await initLinks(html, access_token, template_id, skip_links);
  return html.documentElement.outerHTML;
}
