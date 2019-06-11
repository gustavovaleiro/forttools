import { Stats } from "./stats.dto";
import { Totals } from "./total.dto";

export interface PlayerStatusDTO {
    cached: boolean;
    uid: string;
    username: string;
    platform: string;
    timestamp: number;
    window: string;
    response: number;
    stats: Stats;
    totals: Totals;
}
