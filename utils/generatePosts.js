const { randUser, randBetweenDate, randQuote } = require('@ngneat/falso')
const fs = require('fs')
const path = require('path')

function generatePosts(count, clearFile) {
	const posts = []

	for (let i = 0; i < count; i++) {
		const user = randUser()
		const randomId = user.id
		const randomUsername = user.username
		const randomEmail = user.email
		const randomDate = randBetweenDate({
			from: new Date('01/01/2020'),
			to: new Date(),
		})
		const randomContent = randQuote()

		const randomPost = {
			id: randomId,
			date: randomDate.toLocaleString(),
			content: randomContent,
			username: randomUsername,
			email: randomEmail,
		}

		posts.push(randomPost)
	}

	const dbJsonPath = path.join(__dirname, '..', 'data', 'db.json')

	let existingData = { posts: [] }
	try {
		const jsonData = fs.readFileSync(dbJsonPath, 'utf-8')
		if (jsonData) {
			existingData = JSON.parse(jsonData)
		}
	} catch (error) {
		console.error('Error reading existing data:', error)
	}

	if (!Array.isArray(existingData.posts)) {
		existingData.posts = []
	}

	existingData.posts = existingData.posts.concat(posts)

	fs.writeFileSync(dbJsonPath, JSON.stringify(existingData, null, 2), 'utf-8')

	if (count === null) {
		if (clearFile === 'clear') {
			fs.writeFileSync(
				dbJsonPath,
				JSON.stringify({ posts: [] }, null, 2),
				'utf-8'
			)
			console.log(`The data in db.json has been cleared.`)
			return
		} else {
			console.log(
				`Please include a number of posts to generate before the 'overwrite' or 'append' action tag, or use 'null followed by the action tag 'clear' to remove all existing data in db.json.`
			)
			return
		}
	} else {
		if (clearFile === 'clear') {
			console.log(
				`If including a number of posts to generate, please use either 'overwrite' or 'append' as the action tag.`
			)
			return
		} else if (clearFile === 'overwrite') {
			console.log(
				`The data in db.json has been overwritten with ${count} new ${
					count > 1 ? 'posts' : 'post'
				}.`
			)
			return
		} else if (clearFile === 'append') {
			console.log(
				`The db.json file has been appended with ${count} new ${
					count > 1 ? 'posts' : 'post'
				}.`
			)
		} else {
			console.log(
				`Hmmm, something has gone wrong. Please double check your command (see action tag options below) and try again.\nACTION TAG OPTIONS:\n1) use 'node generatePosts.js null clear' to remove all existing data in db.json.\n2) use 'node generatePosts.js <num> overwrite' to overwrite existing data in db.json with num new posts.\n3) use 'node generatePosts.js <num> append' to add num new posts to existing data in db.json.`
			)
		}
	}
}

const args = process.argv.slice(2)
const count = parseInt(args[0]) || null
const clearFile = args[1]

generatePosts(count, clearFile)
