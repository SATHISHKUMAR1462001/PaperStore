import cryto from 'crypto';


export const bcrypt = () => {
    return cryto.randomBytes(20).toString("hex");

}   
