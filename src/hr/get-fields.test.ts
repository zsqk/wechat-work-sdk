import { assertEquals } from '@std/assert/equals';
import { isVerbose, setVerbose } from '../constants.ts';
import { getAccessToken } from '../get-access-token.ts';
import { debug } from '../log.ts';
import { getFields } from './get-fields.ts';
import { assert } from '@std/assert';

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
  assertEquals(res.errcode, 0);
  assert(res.group_list)
  assert(res.group_list.length > 0);
  const group = res.group_list[0];
  assert(group.group_id);
  assert(group.group_name);
  assert(group.field_list);
  assert(group.field_list.length > 0);
  const field = group.field_list[0];
  assert(field.fieldid);
  assert(field.field_name);
  assert(field.field_type);
  assert(field.is_must !== undefined);
  assert(field.value_type !== undefined);
});
