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
            return res.json(passwords);
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json({
                message: error,
            })
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
                res.statusCode = 200;
                Password.create(newPassword);
                return res.json({
                    ...newPassword,
                    message: "success",
                });
            }
            else {
                //found duplicated => just return
                res.statusCode = 409;
                return res.json({
                    site: "",
                    email: "",
                    password: "",
                    message: "Duplicated",
                });
            }
        })
        .catch((error) => {
            res.statusCode = 500;
            return res.json({
                site: "",
                email: "",
                password: "",
                message: error,
            });
        });
    }
}

module.exports = new PasswordController();