export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/ui',
		'@nuxt/image',
		[
			'nuxt-mail',
			{
				message: {
					to: process.env.EMAIL_APP_EMAIL,
				},
				smtp: {
					host: process.env.EMAIL_APP_HOST,
					port: 587,
					auth: {
						user: process.env.EMAIL_APP_EMAIL,
						pass: process.env.EMAIL_APP_PASSWORD,
					},
				},
			},
		],
	],
	colorMode: {
		preference: 'light',
	},
	ui: {
		// @ts-expect-error Somehow the typing for this is wrong
		notifications: {
			// Show toasts at the top right of the screen
			position: 'top-0 bottom-auto',
		},
	},
	css: ['~/assets/css/main.css'],
});
