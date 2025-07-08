import { replaceSensitiveText } from '../string/tools';

// 错误消息映射表
const ERROR_MESSAGE_MAP: Record<string, string> = {
  'Connection error.': 'error.connection_error',
  'Connection error': 'error.connection_error',
  'Network Error': 'error.network_error',
  'Request timeout': 'error.request_timeout',
  'Request failed': 'error.request_failed',
  'Internal server error': 'error.internal_server_error',
  'Service unavailable': 'error.service_unavailable',
  'Gateway timeout': 'error.gateway_timeout',
  'Bad gateway': 'error.bad_gateway',
  'Too many requests': 'error.too_many_requests',
  Unauthorized: 'error.unauthorized',
  Forbidden: 'error.forbidden',
  'Not found': 'error.not_found',
  'Method not allowed': 'error.method_not_allowed',
  'Unprocessable entity': 'error.unprocessable_entity',
  'Validation failed': 'error.validation_failed',
  'Invalid parameters': 'error.invalid_parameters',
  'Missing parameters': 'error.missing_parameters',
  'File not found': 'error.file_not_found',
  'Permission denied': 'error.permission_denied',
  'Access denied': 'error.access_denied',
  'Authentication failed': 'error.authentication_failed',
  'Token expired': 'error.token_expired',
  'Invalid token': 'error.invalid_token',
  'Rate limit exceeded': 'error.rate_limit_exceeded',
  'Quota exceeded': 'error.quota_exceeded',
  'Resource not found': 'error.resource_not_found',
  'Resource already exists': 'error.resource_already_exists',
  'Operation failed': 'error.operation_failed',
  'Operation not supported': 'error.operation_not_supported',
  'Database error': 'error.database_error',
  'Cache error': 'error.cache_error',
  'External service error': 'error.external_service_error',
  'API error': 'error.api_error',
  'Configuration error': 'error.configuration_error',
  'System error': 'error.system_error',
  'Unknown error': 'error.unknown_error'
};

/**
 * 获取错误消息的国际化键
 * @param errorMessage 原始错误消息
 * @returns 国际化键或原始消息
 */
export const getErrorMessageKey = (errorMessage: string): string => {
  if (!errorMessage) return '';

  // 尝试直接匹配
  if (ERROR_MESSAGE_MAP[errorMessage]) {
    return ERROR_MESSAGE_MAP[errorMessage];
  }

  // 尝试忽略大小写匹配
  const lowerErrorMessage = errorMessage.toLowerCase();
  for (const [key, value] of Object.entries(ERROR_MESSAGE_MAP)) {
    if (key.toLowerCase() === lowerErrorMessage) {
      return value;
    }
  }

  // 尝试部分匹配（包含关系）
  for (const [key, value] of Object.entries(ERROR_MESSAGE_MAP)) {
    if (
      lowerErrorMessage.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lowerErrorMessage)
    ) {
      return value;
    }
  }

  // 如果没有找到匹配，返回原始消息
  return errorMessage;
};

export const getErrText = (err: any, def = ''): any => {
  const msg: string =
    typeof err === 'string'
      ? err
      : err?.response?.data?.message ||
        err?.response?.message ||
        err?.message ||
        err?.response?.data?.msg ||
        err?.response?.msg ||
        err?.msg ||
        err?.error ||
        def;

  // 获取错误消息键
  const errorKey = getErrorMessageKey(msg);

  // msg && console.log('error =>', msg);
  return replaceSensitiveText(errorKey);
};
