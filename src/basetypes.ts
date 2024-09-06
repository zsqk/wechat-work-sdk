export type QywechatRes<T extends object> =
  | ({
      /** 出错返回码，为0表示成功 */
      errcode: 0;
      /** 返回码提示语 */
      errmsg: "ok";
    } & T)
  | {
      /** 出错返回码，非0表示调用失败 */
      errcode: Exclude<number, 0>;
      /** 返回码提示语 */
      errmsg: Exclude<string, "ok">;
    };
