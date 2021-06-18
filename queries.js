const Pool = require('pg').Pool
// const pool = new Pool({
//     user: 'njgijvpigqacqo',
//     host: 'ec2-34-232-191-133.compute-1.amazonaws.com',
//     database: 'd2tid44ml7c40f',
//     password: '5d412e5c0ab1f50fab0ed89c6b2029fe058c874cf348668f261886ff7b818ff0',
//     port: 5432,
// });

const pool = new Pool({
    connectionString: "postgres://njgijvpigqacqo:5d412e5c0ab1f50fab0ed89c6b2029fe058c874cf348668f261886ff7b818ff0@ec2-34-232-191-133.compute-1.amazonaws.com:5432/d2tid44ml7c40f",
    ssl: {
        rejectUnauthorized: false
    }
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results}`)
    })
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};