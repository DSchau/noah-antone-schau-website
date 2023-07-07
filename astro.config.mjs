import { defineConfig } from 'astro/config';

import image from "@astrojs/image";
import netlify from "@astrojs/netlify/edge-functions";

const IS_EDGE = process.env.IS_EDGE === 'true'

const EDGE_CONFIG = {
  output: "server",
  adapter: netlify()
}

// https://astro.build/config
export default defineConfig(Object.assign({}, {
  integrations: [image()],
}, IS_EDGE ? EDGE_CONFIG : {}));
