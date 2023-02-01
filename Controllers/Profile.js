export const Profile = (db, req, res) => {
    const { id } = req.params;
    async function checkProfileRoute() {
        try {
            const profileID = await db.select('*').from('users').where({ id });
            profileID.length ? res.json(profileID) : res.status(400).json('User not found...');
        } catch (error) {
            res.status(404).json(error);
        }
    }
    checkProfileRoute();
};