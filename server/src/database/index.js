import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import databaseConfig from '../configs/database'

import User from '../app/models/User'
import File from '../app/models/File'
import AclRole from '../app/models/AclRole'
import Company from '../app/models/Company'
import Fleet from '../app/models/Fleet'

// Insert new models here
const models = [User, File, AclRole, Company, Fleet]

class Database {
	constructor() {
		this.init()
		this.mongo()
	}

	init() {
		this.connection = new Sequelize(databaseConfig)

		models.map((model) => model.init(this.connection))
		models.map(
			(model) => model.associate && model.associate(this.connection.models)
		)
	}

	mongo() {
		this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
		})
	}
}

export default new Database()
