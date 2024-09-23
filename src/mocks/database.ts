import { factory, primaryKey, oneOf } from '@mswjs/data'

const generatePrimaryKey = () => Math.floor((Math.random() + 1) * 1000)

const db = factory({
	level: {
		id: primaryKey(generatePrimaryKey),
		name: String,
	},
	module: {
		id: primaryKey(generatePrimaryKey),
		name: String,
	},
	tech: {
		id: primaryKey(generatePrimaryKey),
		name: String,
		level: oneOf('level'),
	},
})

export default db
