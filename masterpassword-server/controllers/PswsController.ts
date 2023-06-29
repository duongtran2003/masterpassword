import { Request, Response } from "express";
import { Password } from "../models/Password";

interface IPasswordJSON {
    site: string,
    email: string,
    password?: string,
}

class PasswordController {
    index(req: Request, res: Response) {
        Password.find({})
        .then((passwords) => {
            res.statusCode = 200;
            let newPasswords: IPasswordJSON[] = [];
            for (let password of passwords) {
                newPasswords.push({
                    site: password.site,
                    email: password.email,
                    password: password.password,
                })
            }
            return res.json(newPasswords);
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json([
                {
                    site: "",
                    email: "",
                    password: "",
                }
            ]);
        });
    }
    create(req: Request, res: Response): void {
        const {site, email, password} = req.body as IPasswordJSON;
        let newPassword: {
            site: string,
            email: string,
            password: string | undefined,
        } = {
            site,
            email,
            password,
        };
        Password.find({
            site, 
            email
        }).
        then((passwords) => {
            if (!passwords.length) {
                //not found => create new record
                //handle blank password later
                Password.create(newPassword)
                .then((created) => {
                    res.statusCode = 200;
                    return res.json({
                        site,
                        email,
                        password,
                    }); 
                })
                .catch((error) => {
                    res.statusCode = 500;
                    return res.json({
                        site: "",
                        email: "",
                        password: "",
                    });
                })
            }
            else {
                //found duplicated => just return
                res.statusCode = 409;
                return res.json({
                    site: "",
                    email: "",
                    password: "",
                });
            }
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json({
                site: "",
                email: "",
                password: "",
            });
        });
    }
    edit(req: Request, res: Response) {
        //at this point, only allow client to edit password
        //handle blank password later
        const {site, email, password} = req.body as IPasswordJSON;
        let filter: {
            site: string,
            email: string,
        } = {
            site,
            email,
        }
        let update: {
            password: string | undefined,
        } = {
            password
        }
        Password.findOneAndUpdate(filter, update)
        .then((updated) => {
            //handle non-existing record in frontend; 
            res.statusCode = 200;
            return res.json({
                site,
                email,
                password,
            });
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json({
                site: "",
                email: "",
                password: "",
            });
        });
    }
    delete(req: Request, res: Response) {
        const {site, email, password} = req.body as IPasswordJSON;
        let filter: {
            site: string,
            email: string
        } = {
            site,
            email,
        }
        Password.findOneAndDelete(filter)
        .then((deleted) => {
            res.statusCode = 200;
            return res.json({
                site, 
                email,
                password,
            });
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json({
                site: "",
                email: "",
                password: "",
            });
        });
    }
}

module.exports = new PasswordController();