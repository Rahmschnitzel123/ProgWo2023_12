const app = express()
import { router as routername } from './pathToRouter.js'

all.use('./api/routername', routername)



app.listen(3001, async () =>{
    console.log("port 3001")
});