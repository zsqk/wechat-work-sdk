// 获取员工字段配置
// https://developer.work.weixin.qq.com/document/path/99131
// GET https://qyapi.weixin.qq.com/cgi-bin/hr/get_fields?access_token=ACCESS_TOKEN
import type { SDKOptions } from "../basetypes.ts";
import { debug as defaultDebug } from '../log.ts';

// TODO: 完善返回类型
export async function getFields({
  accessToken,
  proxy,
  debug = defaultDebug,
}: SDKOptions): Promise<any> {
  const res = await fetch(
    `https://${
      proxy ?? ""
    }qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`
  );
  const data = await res.json();
  debug("getFields response:", data);
  return data;
}
