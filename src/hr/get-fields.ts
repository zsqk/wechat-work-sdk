// 获取员工字段配置
// https://developer.work.weixin.qq.com/document/path/99131
// GET https://qyapi.weixin.qq.com/cgi-bin/hr/get_fields?access_token=ACCESS_TOKEN
import type { QywechatRes, SDKOptions } from '../basetypes.ts';
import { debug as defaultDebug } from '../log.ts';

/**
 * 获取员工字段配置
 * @returns
 */
export async function getFields({
  accessToken,
  proxy,
  debug = defaultDebug,
}: SDKOptions): Promise<QywechatRes<{ group_list: FieldGroup[] }>> {
  const domain = 'qyapi.weixin.qq.com';
  const path = '/cgi-bin/hr/get_fields';
  const url = new URL(`https://${proxy ?? ''}${domain}${path}`);
  url.searchParams.set('access_token', accessToken);
  debug('getFields url:', url);
  const res = await fetch(url);
  const data = await res.json();
  debug('getFields response:', data);
  return data;
}

export type FieldGroup = {
  /**
   * 字段组的id
   */
  group_id: number;
  /**
   * 字段组的名称
   */
  group_name: string;
  /**
   * 	字段组所包含的所有字段信息
   */
  field_list: FieldDefinition[];
};

export type FieldDefinition = {
  fieldid: number;
  field_name: string;
  field_type: FieldType;
  is_must: boolean;
  value_type: number;
  option_list: Array<{
    id: number;
    value: string;
  }>;
};

/**
 * 字段类型
 */
export enum FieldType {
  TEXT = 1, // 文本
  SELECT = 2, // 选项
  TIME = 3, // 时间
  IMAGE = 4, // 图片
  FILE_SINGLE = 5, // 单个文件
  FILE_MULTI = 6, // 多个文件
}
