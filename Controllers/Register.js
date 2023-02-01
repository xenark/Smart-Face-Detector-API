export const Register = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json(`Incorrect form submission...`)
    }
    const hash = () => {
        return password === undefined ? null : bcrypt.hashSync(password, 10);
    };

    db.transaction(async transact => {
        try {
            const registeredEmail = await
                transact.insert({
                    hash: hash(),
                    email: email
                }).into('login').returning('email');

            const addUsers = await transact('users').returning('*')
                .insert({
                    name: name,
                    email: registeredEmail[0].email,
                    joined: new Date().toDateString(),
                });
            if (addUsers) {
                await transact.commit(); res.json(addUsers[0]);
            }
        } catch (error) {
            await transact.rollback();
            res.status(404).json('Sorry');
        }
        console.log(transact.isCompleted())
    })
};