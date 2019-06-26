import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { PlayerStatusDTO } from "../../models/playerstats.dto";
import { PlayerAccountInfoDTO } from "../../models/data.dto";


@Injectable()
export class PlayerService{

    constructor(public http: HttpClient){
    }

    findPlayer(uuid: String) : Observable<PlayerStatusDTO> {
        return this.http.get<PlayerStatusDTO>(`${API_CONFIG.baseUrl}/users/public/br_stats?user_id=${uuid}&platform=pc`) .catch((error:any) => {
            console.error(error)
            return Observable.throw(JSON.stringify(error)  )
        });
    }

    findUuidByName(name: String) : Observable<PlayerAccountInfoDTO>{
        if(name.length>=3){

          return this.http.get<PlayerAccountInfoDTO>(`${API_CONFIG.baseUrl}/users/id?username=${name}`)
                    .catch((error:any) => {
                        console.error(JSON.stringify(error)  )
                        return Observable.throw(new Error(error));
                    });
        }
        
    }           

}