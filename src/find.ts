import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings"

class Search{
    static CHARSp = 'abcdefghijklmnopqrstuvwxysABCDEFGHIJKLMNOPQRSTUVWXYS$_'.split('');
    static CHARS = '0123456789abcdefghijklmnopqrstuvwxysABCDEFGHIJKLMNOPQRSTUVWXYS$_'.split('');
    public static search(args:string,zeronum:number){
        let topname:string=""
        let toprank=0
        let ark=""
        let mp=new Map<string,boolean>()
        console.log("start")
        for(let o=0;o!=this.CHARSp.length;o++){
            mp.set(this.CHARSp[o],true)
        }
                
        const a:number=0
        let tmp=new Map<string,boolean>(mp)
        let counter=mp.size
        while(toprank!=zeronum){
        for(let k of tmp.keys()){
            counter--
            for(let i=0;i<this.CHARS.length;i++){
                const name=k+this.CHARS[i]
                let r=this.rank(this.calsig(name+args))
                if(r>toprank){
                    toprank=r
                    topname=name
                }
                mp.set(name,true)
                if(toprank==zeronum){
                    break
                }
            }
            if(toprank==zeronum){
                break
            }
            mp.delete(k)
            if(counter==a){
                tmp=new Map<string,boolean>(mp)
                counter=tmp.size
            }
        }}
        console.log(topname+args)
    }

    public static calsig(sig:string){
        const si= keccak256(toUtf8Bytes(sig))
        const res=si.slice(2,10)
        return res
    }

    public static rank(sig:string){
        let rank=0
        const zero="0"
        for(let i=0;i!=sig.length;i++){
            if(sig[i].match(zero)!=null){
                rank+=1
            }
            else{
                break
            }
        }
        return rank
    }
}
Search.search("(uint256)",5)