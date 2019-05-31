import { TimeSuggestion } from "../availability/timesuggestion";

export class Mapp {
nv: string;
ts: TimeSuggestion[];
constructor(nv: string , ts: TimeSuggestion[])
{
    this.nv = nv;
    this.ts = ts;
}
}
