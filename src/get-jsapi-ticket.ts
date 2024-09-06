/**
 * 获取企业的 jsapi_ticket
 * @param accessToken 企业微信的 access_token
 * @returns
 */
export async function getCorpJsapiTicket(accessToken: string): Promise<{
  errcode: number;
  errmsg: string;
  /** 生成签名所需的jsapi_ticket，最长为512字节 */
  ticket: string;
  /** 凭证的有效时间（秒） */
  expires_in: number;
}> {
  const res = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${accessToken}`
  );
  const data = await res.json();
  return data;
}

/**
 * 获取应用的 jsapi_ticket
 * @param accessToken 应用的调用接口凭证
 * @returns
 */
export async function getAgentJsapiTicket(accessToken: string): Promise<{
  errcode: number;
  errmsg: string;
  /** 生成签名所需的jsapi_ticket，最长为512字节 */
  ticket: string;
  /** 凭证的有效时间（秒） */
  expires_in: number;
}> {
  const res = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=${accessToken}&type=agent_config`
  );
  const data = await res.json();
  return data;
}
