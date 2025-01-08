import * as scriptApi from '../../../api/builder/script.js';
import * as contentApi from '../../../api/builder/email_contents.js';
import * as templateApi from '../../../api/builder/templates.js';
import { initBlock, filterBlockProperties } from './builderScript.js';
import { getToken } from '../../../api/API.js';

export function setCurrentTemplateId(template_id) {
  localStorage.setItem('current_template_id', template_id);
}

export function setEditorType(type) {
  localStorage.setItem('editor_type', type);
}

export async function getEditorType() {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    return (await templateApi.get_template(access_token, template_id)).data.editor_type;
  } else {
    return 'builder';
  }
}

export async function getName() {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    return (await templateApi.get_template(access_token, template_id)).data.name;
  } else {
    return `Campaign ${new Date().toLocaleString()}`;
  }
}

export async function loadScript() {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    return initBlock((await scriptApi.get_script(access_token, template_id)).data);
  } else {
    return [];
  }
}

export async function loadContent(content_id = '00000000-0000-0000-0000-000000000000') {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    return (await contentApi.get_content(access_token, template_id, content_id)).data;
  } else {
    return {
      subject: '',
      content: '',
      sender_name: '',
    };
  }
}

export async function setName(name) {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    return await templateApi.update_template(access_token, template_id, { name });
  } else {
    const editor_type = localStorage.getItem('editor_type') || 'builder';
    const template = (await templateApi.create_template(access_token, name, editor_type)).data;
    localStorage.setItem('current_template_id', template.id);
  }
}

export async function saveScript(rootBlocks) {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  const script = filterBlockProperties(rootBlocks);
  if (template_id) {
    await scriptApi.set_script(access_token, template_id, script);
  } else {
    const editor_type = localStorage.getItem('editor_type') || 'builder';
    const template = (
      await templateApi.create_template(
        access_token,
        `Campaign ${new Date().toLocaleDateString()}`,
        editor_type,
      )
    ).data;
    localStorage.setItem('current_template_id', template.id);
    await scriptApi.set_script(access_token, template.id, rootBlocks);
  }
}

export async function saveContent(newContent, content_id = '00000000-0000-0000-0000-000000000000') {
  const access_token = getToken('accessToken');
  const template_id = localStorage.getItem('current_template_id');
  if (template_id) {
    const content = {
      ...(await contentApi.get_content(access_token, template_id, content_id)).data,
      ...newContent,
    };
    const res = await contentApi.set_content(access_token, template_id, content_id, content);
    return res.status === 200;
  } else {
    const editor_type = localStorage.getItem('editor_type') || 'builder';
    const template = (
      await templateApi.create_template(
        access_token,
        `Campaign ${new Date().toLocaleDateString()}`,
        editor_type,
      )
    ).data;
    localStorage.setItem('current_template_id', template.id);
    const res = await contentApi.set_content(access_token, template.id, content_id, newContent);
    return res.status === 200;
  }
}
