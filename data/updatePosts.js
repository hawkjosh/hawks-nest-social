const fs = require('fs')
const path = require('path')
const {
	randUuid,
	randBetweenDate,
	randQuote,
	randUser
} = require('@ngneat/falso')

const users = [
	{
		id: '436f8e67-4e82-424c-a4dd-60ac7e6aa463',
		username: 'Akira.Cherinsuk',
		email: 'nikitavasileva310@mac.io'
	},
	{
		id: '9a391a3e-2640-446a-8d21-5159f34f4296',
		username: 'Susan_Shemesh',
		email: 'helgi.dudek@mac.info'
	},
	{
		id: 'bd59547e-7bbe-4bbe-a33e-a50c8701d628',
		username: 'Bin.Cortes',
		email: 'denis.yaakv707@home.com'
	},
	{
		id: '2edc6cd7-d5f6-4117-99a0-ca088cc49e19',
		username: 'Qing.Marek',
		email: 'kirill_majewski@optonline.org'
	},
	{
		id: '6b3b7e8b-87f0-4f29-a79e-0bb07f98b5c9',
		username: 'Prasoet_Njuguna64',
		email: 'kenneth-wood443@blueyonder.biz'
	},
	{
		id: '16e50a0e-54cc-4920-b215-772e1333802d',
		username: 'Takako.Gonzales',
		email: 'gita_jia@skynet.biz'
	},
	{
		id: 'bce94364-c5d1-4d13-9e3a-d57af1c57bb2',
		username: 'Karen.Rathod',
		email: 'ping.wagner67@aim.org'
	},
	{
		id: '6331523b-eab1-464a-827b-c74af6caa6e4',
		username: 'Gunnar.Richardson',
		email: 'xiaoyan_guerrero103@rocketmail.biz'
	},
	{
		id: 'f111f8c4-3141-438b-8687-f0f7e5d4d00f',
		username: 'Koji.Suleiman88',
		email: 'blessingbauer@verizon.com'
	},
	{
		id: 'd46a9d6c-a95f-458d-8bea-10fe46e89021',
		username: 'Martin.Nakamura',
		email: 'steinunnwalters@blueyonder.biz'
	}
]

const getRandomUser = (users) => {
	const randomIndex = Math.floor(Math.random() * users.length)
	const randomUser = users[randomIndex]
	return randomUser
}

function updatePosts(action, count) {
	const posts = []

	for (let i = 0; i < count; i++) {
		const randomId = randUuid()
		const randomDate = randBetweenDate({
			from: new Date('01/01/2020'),
			to: new Date()
		})
		const randomContent = randQuote()
		const randomUser = getRandomUser(users)

		const randomPost = {
			id: randomId,
			date: randomDate,
			content: randomContent,
			user: {
				id: randomUser.id,
				username: randomUser.username,
				email: randomUser.email
			}
		}

		posts.push(randomPost)
	}

	const dbPath = path.join(__dirname, 'db.json')

	let existingData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

	existingData.posts = existingData.posts.concat(posts)

	const message = {
		clear: `The data in db.json has been cleared.`,
		new: `The data in db.json has been updated with ${count} new ${
			count > 1 ? 'posts' : 'post'
		}.`
	}

	const handleAction = (data, msg) => {
		fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8')
		console.log(msg)
	}

	action === 'clear'
		? handleAction({ posts: [] }, message.clear)
		: handleAction(existingData, message.new)
}

const args = process.argv.slice(2)
const action = args[0]
const count = parseInt(args[1]) || 1

updatePosts(action, count)
