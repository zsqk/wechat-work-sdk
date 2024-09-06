/**
 * 获取企业微信的 access_token
 *
 * {@link https://developer.work.weixin.qq.com/document/path/91039 doc}
 * @param corpId - 企业微信的 corpId
 * @param corpSecret - 企业微信的 corpSecret, 实际可传入 agentSecret
 * @returns - 获取到的 access_token
 */
export async function getAccessToken(
  corpId: string,
  corpSecret: string
): Promise<{
  /** 出错返回码，为0表示成功，非0表示调用失败 */
  errcode: number;
  /** 返回码提示语 */
  errmsg: string;
  /** 获取到的凭证，最长为512字节 */
  access_token: string;
  /** 凭证的有效时间（秒） */
  expires_in: number;
}> {
  const res = await fetch(
    `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpId}&corpsecret=${corpSecret}`
  );
  const data = await res.json().catch((err) => {
    console.error(err);
    return null;
  });
  if (typeof data !== "object" || data === null) {
    throw new Error("Failed to get access token");
  }
  return data;
}
