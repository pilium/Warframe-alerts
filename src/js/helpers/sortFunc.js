export function compareTierNum(a, b) {
    if(a.tierNum == b.tierNum) {
        if(a.tierNum == b.tierNum) return 0;
        else if(a.tierNum < b.tierNum) return -1;
        else return 1;
    }
    else if (a.tierNum > b.tierNum) { 
        if (b.tierNum != 0 ) return 1;
        else return -1 
    }
    else  {
        if (a.tierNum != 0 ) return -1;
        else return 1;
    }
}