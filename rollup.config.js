import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import workbox from 'rollup-plugin-workbox-inject';

const production = !process.env.ROLLUP_WATCH;
const OUTPUT_DIR = production ? 'public' : 'dist';

export default [{
	input: ['src/chitrkatha.js', 'src/xkcd.js'],
	output: {
		sourcemap: true,
		format: 'esm',
		dir: `${OUTPUT_DIR}/scripts`
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				hydratable: true
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},
{
	input: ["src/service-worker.js"],
	output: {
		sourcemap: true,
		format: 'esm',
		dir: `${OUTPUT_DIR}`
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.ROLLUP_WATCH ? 'development' : 'production'),
		}),
		workbox({
			globDirectory: 'public',
			globPatterns: [
				'**/*.*'
			],
			// ...any other options here...
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		// !production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		// !production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
}];
