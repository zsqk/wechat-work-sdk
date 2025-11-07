/**
 * parseBool
 *
 * Convert a string-like environment value into a boolean.
 *
 * Truthy values: '1', 'true', 'yes', 'on' (case-insensitive).
 * Any other input, including `undefined` or empty string,
 * yields `false`.
 */
const parseBool = (v: string | null | undefined): boolean => {
  if (!v) return false
  const s = v.trim().toLowerCase()
  return s === "1" || s === "true" || s === "yes" || s === "on"
}

/**
 * VERBOSE
 *
 * Global flag to enable verbose / debug output. Defaults to
 * `false` when the environment variable is not set or when
 * the runtime environment does not expose `Deno.env`.
 *
 * To enable, set the `VERBOSE` env var to one of the truthy
 * values listed in `parseBool` (for example: '1' or 'true').
 */
export const VERBOSE: boolean = (() => {
  try {
    // Read environment variable when running under Deno. Guard
    // against contexts where `Deno` or `Deno.env` is unavailable.
    // @ts-ignore runtime guard
    const v =
      typeof Deno !== "undefined" && Deno.env
        ? Deno.env.get("VERBOSE")
        : undefined
    return parseBool(v)
  } catch (_e) {
    // On error reading environment, fall back to disabled.
    return false
  }
})()

export default {
  VERBOSE,
}
