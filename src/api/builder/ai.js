import axios from 'axios';

export async function ai_write(access_token, template_id, description) {
  return await axios.post(
    `/api/builder/${template_id}/ai/write`,
    {
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function ai_insert(access_token, template_id, description, top_text, bottom_text) {
  return await axios.post(
    `/api/builder/${template_id}/ai/insert`,
    {
      description: description,
      top_text: top_text,
      bottom_text: bottom_text,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}

export async function ai_transform(
  access_token,
  template_id,
  description,
  top_text,
  inner_text,
  bottom_text,
) {
  return await axios.post(
    `/api/builder/${template_id}/ai/transform`,
    {
      description: description,
      top_text: top_text,
      inner_text: inner_text,
      bottom_text: bottom_text,
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
}
