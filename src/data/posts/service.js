import axios from 'axios';

export async function writePost(token, contents) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  const payload = {
    contents,
  };

  const { data: result } = await axios.post('/api/post', payload, { headers });
  return result;
}

export async function fetchPosts(token, offset = 0, limit = 5) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  const params = {
    offset,
    limit,
  };

  const { data: result } = await axios.get(`/api/post`, { headers, params });
  return result;
}

export async function fetchUserPosts(userId, token, offset = 0, limit = 5) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };
  const params = {
    offset,
    limit,
  };

  const { data: result } = await axios.get(`/api/post/of/${userId}`, { headers, params });
  return result;
}

export async function likePost(token, postId) {
  const headers = {
    Authorization: 'Bearer ' + token,
  };

  const { data: result } = await axios.patch(`/api/post/${postId}/like`, null, {
    headers,
  });
  return result;
}
