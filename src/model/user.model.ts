import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config';

export interface UserDocument extends mongoose.Document{
    firstname: string,
    lastname: string,
    nickname: string,
    phone: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string):Promise<Boolean>
}


const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: true, unique: false},
    lastname: {type: String, required: true, unique: false},
    nickname: {type: String, required: true, unique: false},
    phone: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: false}
},{timestamps: true});

UserSchema.pre("save",async function (next){
    const user = this as UserDocument;
    if(!user.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(config.get<number>('SALT'));
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string):Promise<Boolean>{
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(e=>false);
}

const UserModel = mongoose.model<UserDocument>("User",UserSchema);

export default UserModel;