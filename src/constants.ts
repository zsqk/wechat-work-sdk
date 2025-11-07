/**
 * parseBool
 *
 * Convert a string-like environment value into a boolean.
 *
 * Truthy values: '1', 'true', 'yes', 'on' (case-insensitive).
 * Any other input, including `undefined` or empty string,
 * yields `false`.
 */
const parseBool = (v: string | boolean | undefined): boolean => {
  if (typeof v === "boolean") return v;
  if (!v) return false;
  const s = v.trim().toLowerCase();
  return s === "1" || s === "true" || s === "yes" || s === "on";
};

let _VERBOSE = false;

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
// Initialize internal verbose flag from environment when possible.
_VERBOSE = (() => {
  try {
    const v = typeof Deno !== "undefined" && Deno.env.get("VERBOSE");
    return parseBool(v);
  } catch (_e) {
    return false;
  }
})();

/**
 * isVerbose
 *
 * Read-only accessor for the current verbose flag. Consumers should call
 * `isVerbose()` rather than reading or mutating an exported variable so the
 * implementation can control how the value is sourced (environment, runtime,
 * or overridden via `setVerbose`).
 */
export function isVerbose(): boolean {
  return _VERBOSE;
}

/**
 * 设置
 * @param value
 */
export function setVerbose(value: boolean) {
  _VERBOSE = value;
}
