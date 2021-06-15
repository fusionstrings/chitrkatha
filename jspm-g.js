import { Generator } from 'https://esm.sh/@jspm/generator';

const generator = new Generator({
  /*
   * Default: process.cwd() + '/'
   * 
   * The URL of the import map itself
   * 
   * This is used in order to output relative URLs for modules located on the same
   * host as the import map.
   * (Eg for `file:///path/to/project/map.importmap`, installing local file packages will
   * be output as relative URLs to the import map location supporting any host)
   */  
  mapUrl: import.meta.url,

  /*
   * Default: 'jspm'
   * Supported: 'jspm', 'jspm.system', 'skypack', 'jsdelivr', 'unpkg'.
   */
  defaultProvider: 'jspm',

  /*
   * Default: ['development', 'browser']
   * 
   * The conditional environment resolutions to apply.
   * 
   * See https://nodejs.org/dist/latest-v16.x/docs/api/packages.html#packages_conditional_exports
   * for more info
   */
  env: ['production', 'browser']
});

// Install a new package into the import map
await generator.install('react');

// Install a package version and subpath into the import map (installs lit/decorators.js)
await generator.install('lit@2/decorators.js');

// Install a package version to a custom alias
await generator.install({ alias: 'react16', target: 'react@16' });

// Install a specific subpath of a package
await generator.install({ target: 'lit@2', subpath: './html.js' });

// Install an export from a locally located package folder into the map
// The package.json is used to determine the exports and dependencies.
//await generator.install({ alias: 'mypkg', target: './packages/local-pkg', subpath: './feature' });

console.log(JSON.stringify(generator.getMap(), null, 2));