import * as resourcesApi from '../../../api/builder/resources';
import { getToken } from '../../../api/API';

export function findActiveResources(block, resources = []) {
  if (block instanceof Array) {
    for (const child of block) {
      findActiveResources(child, resources);
    }
    return resources;
  }
  if (block?.type?.startsWith('layout')) {
    for (const child of block?.params?.child) {
      findActiveResources(child?.children, resources);
    }
  } else if (block?.params && 'child' in block?.params) {
    findActiveResources(block?.params?.child, resources);
  } else {
    if (block?.params?.resource_id) {
      if (!resources.includes(block?.params?.resource_id)) {
        resources.push(block?.params?.resource_id);
      }
    }
  }
  return resources;
}

export function findOutdatedResources(block, resources) {
  const activeResources = findActiveResources(block);
  return resources.filter((resource) => !activeResources.includes(resource.id));
}

export function isUpdatedResources(block, oldResources) {
  if (oldResources === null) {
    return [];
  }
  const newResources = findActiveResources(block);
  if (
    newResources.length !== oldResources.length ||
    oldResources.filter((resource) => !newResources.includes(resource)).length > 0
  ) {
    return newResources;
  } else {
    return null;
  }
}

export async function uploadResource(file, cid) {
  const access_token = getToken('accessToken');
  const templateId = localStorage.getItem('current_template_id');
  const form_data = new FormData();
  form_data.append('data', file);
  const res = await resourcesApi.add_resource(access_token, templateId, form_data, cid);
  return res.data;
}

export async function updateResources(block) {
  const access_token = getToken('accessToken');
  const templateId = localStorage.getItem('current_template_id');
  const resources = (await resourcesApi.get_resources(access_token, templateId)).data;
  const outdatedResources = findOutdatedResources(block, resources);
  for (const resource of outdatedResources) {
    await resourcesApi.delete_resource(access_token, templateId, resource.id);
  }
}

export async function removeResource(resource_id) {
  const access_token = getToken('accessToken');
  const templateId = localStorage.getItem('current_template_id');
  await resourcesApi.delete_resource(access_token, templateId, resource_id);
}

export async function getResourceTempURL(resource_id) {
  const access_token = getToken('accessToken');
  const templateId = localStorage.getItem('current_template_id');
  return (await resourcesApi.get_resource(access_token, templateId, resource_id)).data.url;
}
