import * as groupsApi from '../api/subscribes/groups';

export async function get_core_lists(access_token) {
  const root_group = (await groupsApi.get_root(access_token)).data;
  return (await groupsApi.get_subgroups(access_token, root_group.id)).data;
}

export async function get_segments(access_token, core_list_id) {
  return (await groupsApi.get_subgroups(access_token, core_list_id)).data;
}

export async function create_core_list(access_token, icon, name, description) {
  const root_group = (await groupsApi.get_root(access_token)).data;
  return (await groupsApi.create(access_token, root_group.id, icon, name, description)).data;
}

export async function create_segment(access_token, core_list_id, icon, name, description) {
  return (await groupsApi.create(access_token, core_list_id, icon, name, description)).data;
}
