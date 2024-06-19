
import prisma from "../config/db.config.js";

class UserController {

    static async getUser(req, res){
        const { id } = req?.params;
        const user = await prisma.user.findUnique({
            where:{
                id: id
            },
            select:{
                id: true,
                name: true,
                email:true
            }
        });
        if(!!user){
            return res.json({ user: user});
        }
        return res.json({ message: "user does not exist"});
    }
    static async getUsers(req, res){
        const { userIds } = req?.body;
        const users = await prisma.user.findMany({
            where:{
                id: {
                    in: userIds
                }
            },
            select:{
                id: true,
                name: true,
                email:true
            }
        });
        if(!!users){
            return res.json({ users: users});
        }
        return res.json({ message: "users does not exist"});
    }
};

export default UserController;