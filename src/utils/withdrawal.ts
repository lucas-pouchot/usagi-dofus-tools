export function probaWithdraw(total: number, current: number, withdrawal: number, dodge: number): number
{
    // source: https://www.dofuspourlesnoobs.com/retrait-et-esquive.html
    let res = 50*(withdrawal/dodge)*(current/total);
    if (res < 10) {
        res = 10;
    }
    else if (res > 90) {
        res = 90;
    }

    return res / 100;
}
