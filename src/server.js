import {serverHttp} from './http.js'
import './webSocket.js'



serverHttp.listen(3001, ()=> console.log("Rodou"));