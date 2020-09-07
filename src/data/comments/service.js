import axios from 'axios';

export async function writeComment(token, postId, contents) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  const payload = {
    contents,
  };

  const { data: result } = await axios.post(`/api/post/${postId}/comment`, payload, { headers });
  return result;
}

export async function fetchComments(token, postId) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };

  const { data: result } = await axios.get(`/api/post/${postId}/comment`, { headers });
  return result;
}
