
import wasmInit from "../pkg/rapier_wasm2d";

/**
 * Initializes RAPIER.
 * Has to be called and awaited before using any library methods.
 */
export async function init(wasmBinary:Uint8Array|string) {
    await wasmInit(wasmBinary);
}
