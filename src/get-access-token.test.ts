import { assertEquals } from "@std/assert";
import { getAccessToken } from "./get-access-token.ts";

const corpID = Deno.env.get("QY_WECHAT_CORPID")!;
const agentID = Deno.env.get("QY_WECHAT_QRLOGIN_AGENTID")!;
const agentSecret = Deno.env.get("QY_WECHAT_QRLOGIN_SECRET")!;

Deno.test("getAccessToken", async () => {
  const res = await getAccessToken(corpID, agentSecret);
  assertEquals(res.errcode, 0);
  if ("access_token" in res) {
    assertEquals(typeof res.access_token, "string");
  }
  // console.log(res);
});
