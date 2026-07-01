import assert from "node:assert/strict";
import { getToolManifest } from "../src/mcp/tool-manifest.js";

const manifest = getToolManifest();
assert.ok(Array.isArray(manifest), "manifest should be an array");
assert.ok(manifest.length > 0, "manifest should include registered tools");
assert.ok(manifest.some((entry) => entry.name === "compare_channels"), "manifest should include compare_channels");
assert.ok(manifest.some((entry) => entry.name === "list_connectors"), "manifest should include list_connectors");
console.log(`tool manifest contains ${manifest.length} entries`);
