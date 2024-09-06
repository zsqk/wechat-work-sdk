/**
 * 企业微信 API 返回值类型
 *
 * 当前 TS 判断不足, 导致无法直接通过 errcode 判断是否成功,
 * 所以将类型额外新增了 Record<keyof T, undefined> 来避免做不必要的类型判断.
 */
export type QywechatRes<T extends object> =
  | ({
      /** 出错返回码，为0表示成功 */
      errcode: 0;
      /** 返回码提示语 */
      errmsg: "ok";
    } & T)
  | ({
      /** 出错返回码，非0表示调用失败 */
      errcode: Exclude<number, 0>;
      /** 返回码提示语 */
      errmsg: Exclude<string, "ok">;
    } & Record<keyof T, undefined>);
