import { isVerbose, setVerbose } from '../constants.ts';
import { getAccessToken } from '../get-access-token.ts';
import { debug } from '../log.ts';
import { getFields } from './get-fields.ts';

let accessToken = '';
const proxy = Deno.env.get('FIXEDIP_PROXY');

Deno.test.beforeAll(async () => {
  setVerbose(true);
  const corpID = Deno.env.get('QY_WECHAT_CORPID')!;
  const agentSecret = Deno.env.get('QY_WECHAT_QRLOGIN_SECRET')!;
  accessToken = (await getAccessToken(corpID, agentSecret)).access_token!;
});

Deno.test('getFields', async () => {
  const res = await getFields({ accessToken, proxy });
  debug('getFields res:', res);
});
