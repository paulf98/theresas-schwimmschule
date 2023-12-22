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
	css: ['~/assets/css/main.css'],
});
