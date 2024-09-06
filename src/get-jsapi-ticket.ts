import { QywechatRes } from "./basetypes.ts";

/**
 * 获取企业的 jsapi_ticket
 * {@link https://developer.work.weixin.qq.com/document/path/90506 doc}
 *
 * 一小时内，一个企业最多可获取400次，且单个应用不能超过100次,
 * 开发者必须在自己的服务全局缓存jsapi_ticket.
 * 
 * @param accessToken 企业微信的 access_token
 * @returns
 */
export async function getCorpJsapiTicket(
  accessToken: string,
  { proxy }: { proxy?: string }
): Promise<
  QywechatRes<{
    /** 生成签名所需的jsapi_ticket，最长为512字节 */
    ticket: string;
    /** 凭证的有效时间（秒） */
    expires_in: number;
  }>
> {
  const res = await fetch(
    `https://${
      proxy ?? ""
    }qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`
  );
  const data = await res.json();
  return data;
}

/**
 * 获取应用的 jsapi_ticket
 * {@link https://developer.work.weixin.qq.com/document/path/90506 doc}
 *
 * 一小时内，每个应用不能超过100次,
 * 开发者必须在自己的服务全局缓存应用的jsapi_ticket
 * 
 * @param accessToken 应用的调用接口凭证
 * @returns
 */
export async function getAgentJsapiTicket(
  accessToken: string,
  { proxy }: { proxy?: string }
): Promise<
  QywechatRes<{
    /** 生成签名所需的jsapi_ticket，最长为512字节 */
    ticket: string;
    /** 凭证的有效时间（秒） */
    expires_in: number;
  }>
> {
  const res = await fetch(
    `https://${
      proxy ?? ""
    }qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=${accessToken}&type=agent_config`
  );
  const data = await res.json();
  return data;
}
