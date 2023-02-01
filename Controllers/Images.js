import fetch from "node-fetch";

export const ImageApiCall = (req, res) => {
    //help me => user_id can be found in multiple ways, one way is in https://portal.clarifai.com/settings/profile 
    const USER_ID = "oxycontin";

        // Change these to whatever model and image input you want to use
    // help me => https://help.clarifai.com/hc/en-us/articles/1500007677141-Where-to-find-your-Model-IDs-and-Model-Version-IDs
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";


    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    // help me => PAT can be found in https://portal.clarifai.com/settings/authentication (create one if necessary!)
    const PAT = "96c915d49c734f289c6c4ae8f86cda13";


    // help me => App Id is just the name of your app on the portal. 
    const APP_ID = "sbrain";


    const IMAGE_URL = req.body.link;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });

    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: "Key " + PAT,
        },
        body: raw,
    };

    fetch(
        "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
        requestOptions
    ).then(response => response.json()).then(data=> res.json(data))
    .catch(error => console.log(error))
}

export const Entries = (db, req, res) => {
    const { id } = req.body;

    async function increaseEntriesOnDetect() {
        try {
            const increaseUserEntry = await db.select('*').from('users')
                .increment('entries', 1).where({ id });
            const user = await db.select('*').from('users').where({ id });
            if (increaseUserEntry) {
                res.json(user[0]);
            }
        } catch (error) {
            res.status(404).json('unable to add entry...');
        }
    }
    increaseEntriesOnDetect();
};