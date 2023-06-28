import { Request, Response } from "express";

class PasswordController {
    index(req: Request, res: Response): void {
        res.send("return all current password");
    }
}

module.exports = new PasswordController();