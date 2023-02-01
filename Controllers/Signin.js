export const Signin = (db, bcrypt, req, res) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json(`Incorrect form submission...`)
    }
    async function verifySignIn() {
        try {
            const userEmailInDB = await db.returning('email').select('*').from('login').where({ 'email': email });
            const verifyPassword = bcrypt.compareSync(password, userEmailInDB[0].hash);
            const userInfoOnLogin = await db.select('*').from('users').where({ 'email': userEmailInDB[0].email });
            if (verifyPassword) {
                res.json(userInfoOnLogin);
            } else {
                res.status(404).json('Wrong credentials...')
            }
        }
        catch (error) {
            res.status(404).json('Wrong credentials...')
        }
    }
    return verifySignIn();
};