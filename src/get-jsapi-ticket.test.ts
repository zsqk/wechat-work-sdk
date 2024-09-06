import { assertEquals } from "@std/assert";
import { getAccessToken } from "./get-access-token.ts";
import { getAgentJsapiTicket, getCorpJsapiTicket } from "./get-jsapi-ticket.ts";

const corpID = Deno.env.get("QY_WECHAT_CORPID")!;
const agentID = Deno.env.get("QY_WECHAT_QRLOGIN_AGENTID")!;
const agentSecret = Deno.env.get("QY_WECHAT_QRLOGIN_SECRET")!;
const proxy = Deno.env.get("FIXEDIP_PROXY");

const { access_token } = await getAccessToken(corpID, agentSecret);

Deno.test("getCorpJsapiTicket", async () => {
  const res = await getCorpJsapiTicket(access_token!, { proxy });
  // console.log("res", res);
  assertEquals(res.errcode, 0);
  assertEquals(typeof res.ticket, "string");
});

Deno.test("getAgentJsapiTicket", async () => {
  const res = await getAgentJsapiTicket(access_token!, { proxy });
  // console.log("res", res);
  assertEquals(res.errcode, 0);
  assertEquals(typeof res.ticket, "string");
});
