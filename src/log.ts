import { isVerbose } from "./constants.ts"

/**
 * Lightweight logging helpers.
 *
 * - `debug` logs only when `VERBOSE` is true.
 * - `info`, `warn`, `error` always log (wrap console methods).
 */
export const debug = (...args: unknown[]) => {
  if (isVerbose()) {
    console.log(...args)
    Deno.writeTextFileSync(
      `${import.meta.dirname}/get-fields.response.json`,
      JSON.stringify(args, null, 2),
    );
  }
}

export const info = (...args: unknown[]) => {
  // TODO: 通知到开发者
  console.info(...args)
}

export const warn = (...args: unknown[]) => {
  // TODO: 通知到开发者
  console.warn(...args)
}

export const error = (...args: unknown[]) => {
  // TODO: 通知到开发者
  console.error(...args)
}
