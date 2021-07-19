import {FetchStatus} from 'typescript/types';

export const API_METHODS = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

export const FETCH_RESULT_FORMAT = {
  json: 'json',
  xml: 'xml',
};

export const HTTP_SERVICE_NAMES = {
  flickr: 'FLICKR_HTTP_SERVICE',
};

export const FETCH_STATUSES = {
  pending: <FetchStatus>'pending',
  done: <FetchStatus>'done',
  error: <FetchStatus>'error',
};
