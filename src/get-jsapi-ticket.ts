/**
 * @module
 *
 * 这个模块包含获取企业微信的 jsapi_ticket 的函数.
 *
 * 包含两个 API 和一个离线工具:
 *
 * 1. API: getCorpJsapiTicket
 * 2. API: getAgentJsapiTicket
 * 3. 离线工具: genSignature
 *
 * @example
 * ```ts
 * import { getCorpJsapiTicket } from "@zsqk/wecom-sdk";
 *
 * const res = await getCorpJsapiTicket(accessToken, { proxy });
 * ```
 */

import type { QywechatRes } from "./basetypes.ts";
import { hashString } from "@zsqk/somefn/js/hash";

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

/**
 * 生成 JS-SDK 签名
 * {@link https://developer.work.weixin.qq.com/document/path/90506 doc}
 * {@link https://developer.work.weixin.qq.com/devtool/signature 校验工具}
 *
 * @param jsapi_ticket
 * @param url
 * @returns
 */
export async function genSignature(
  jsapi_ticket: string,
  url: string
): Promise<{
  timestamp: number;
  nonceStr: string;
  signature: string;
}> {
  const timestamp = Math.floor(Date.now() / 1000);
  const nonceStr = Math.random().toString(36).substring(2, 15);
  const signature = await hashString(
    "SHA-1",
    `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  );
  return { timestamp, nonceStr, signature };
}
