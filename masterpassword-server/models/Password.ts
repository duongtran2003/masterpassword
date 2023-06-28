import { Schema, Types, model } from "mongoose";

interface IPassword {
    site: string,
    email: string,
    password: string
}

let password = new Schema<IPassword>({
    site: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

const Password = model<IPassword> ("Password", password);

export {
    Password
}