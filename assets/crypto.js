const enc=new TextEncoder(),dec=new TextDecoder();
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
export const norm=a=>a.toLowerCase().replace(/[^a-z0-9]/g,'');
export async function key(answer,salt,iter){
  const m=await crypto.subtle.importKey('raw',enc.encode(norm(answer)),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:iter,hash:'SHA-256'},m,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function decrypt(answer,p){
  try{const k=await key(answer,b64(p.salt),p.iter);
    return dec.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:b64(p.iv)},k,b64(p.ct)));
  }catch{return null}
}
